/* TESTS: 
0 verify that the list of event task is correct: DONE
1 apply when data already in DB (status is refused or cancelled): dont add a data but modify it: DONE
2: change status number to its key: DONE
3: change button when status is pending or accepted: DONE
4 cancel: modify data status to cancelled: DONE
5 : card color is not modified upon change: NOT SURE BUT LOOKS RIGHT
6: when volunteer accepted for an event, buttons for other events should disappear
  - on first load: modify useEffect: DONE
  - on change to validated: NO NEED (doesnt happen because change is from organiser, not volunteer)
  - on change from validated to canceled: change on the onClick event: DONE
*/

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  Typography,
} from "@material-tailwind/react";
import { ApplyButton } from "../ApplyButton/ApplyButton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createPendingVolunteerAssignment, updateVolunteerAssignmentStatus } from "../../../../services/api/volunteer_assignments";
import { TaskApplyCancelConfirmation } from "./ConfirmationCancel/ConfirmationCancel";
import axios from "axios";
import { ErrorName, VolunteerAssignmentStatus } from "../../../../services/utils/BackendEnums";
import { getConnectedUserId } from "../../../../services/utils/JWTUtils";
import { getTasksInfoForVolunteerEventIndexPage } from "../../../../services/api/event_tasks";
import { EnumUtils } from "../../../../services/utils/EnumUtils";

const TABLE_HEAD = ["Tâche", "Nb Requis/Validés", "Statut", ""];


export function ModaleTaskList(props: any) {
  const logs = false

  const { eventId, sendAssignmentsData } = props;
  if (logs) { console.log(String.fromCodePoint(0x1F516) + " ModaleTaskList.tsx ~ eventId: ") }
  if (logs) { console.log(eventId) }

  const [open, setOpen] = React.useState(false);
  const [validatedForEvent, setValidatedForEvent] = useState<boolean>(false)
  const [tasksForEventInfo, setTasksForEventInfo] = useState<Array<any>>([])
  if (logs) { console.log(`🚀 ~ ModaleTaskList ~ tasksForEventInfo (event ${eventId}):`, tasksForEventInfo) }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`TasksForEvent${eventId}AndAssignmentInfos`],
    // DEMO change
    queryFn: () => getTasksInfoForVolunteerEventIndexPage(1),
    // original
    //queryFn: () => getTasksInfoForVolunteerEventIndexPage(eventId),
  })

  useEffect(() => {
    if (isSuccess) {
      setTasksForEventInfo(data)

      if (logs) { console.log("🚀 ~ useEffect ~ data:", data) }
      //if there is an event for which the volunteer is accepted, change state of validatedForEvent
      if (!data.every(obj => +obj.volunteerAssignmentStatus !== +VolunteerAssignmentStatus.ACCEPTED)) {
        setValidatedForEvent(true)
      }
      sendAssignmentsData(data)
    }
  }, [isSuccess])

  const queryClient = useQueryClient();
  const updateAssignmentStatus = useMutation({
    // mutationFn: ({ ids, data }) => {
    //   return axios.post(`https://jsonplaceholder.typicode.com/posts/patch/${ids.eventId}`, data)
    // },
    // doesn't return the correct value with a faker
    mutationFn: async ({ ids, action }) => {
      switch (action) {
        case "cancel":
          return await updateVolunteerAssignmentStatus({ ids, newVal: VolunteerAssignmentStatus.CANCELED })
          break;
        case "apply":
          return await createPendingVolunteerAssignment({ ids })
          break;
      }
    },
    onSuccess: () => {
      if (logs) { console.log("success branch") }
      queryClient.invalidateQueries({ queryKey: [`TasksForEvent${eventId}AndAssignmentInfos`], refetchType: 'all' })
    },
    onError: () => {
      if (logs) { console.log("error branch") }
    }
  })

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleClick = async (ids, action) => {
    if (logs) { console.log("handle click") }
    if (logs) { console.log(ids) }
    if (logs) { console.log(action) }
    const tasksForEventInfoCopy = [...tasksForEventInfo]

    const index = tasksForEventInfoCopy.findIndex(obj => obj.eventId === ids.eventId && obj.taskId === ids.taskId)

    switch (action) {
      case "cancel":

        // if the status is validated, change validatedForEvent to false
        const initialVolunteerAssignmentStatus = tasksForEventInfoCopy[index].volunteerAssignmentStatus
        if (initialVolunteerAssignmentStatus === String(VolunteerAssignmentStatus.ACCEPTED)) {
          setValidatedForEvent(false)
        }

        tasksForEventInfoCopy[index].volunteerAssignmentStatus = String(VolunteerAssignmentStatus.CANCELED)
        setTasksForEventInfo(tasksForEventInfoCopy)
        sendAssignmentsData(data)
        updateAssignmentStatus.mutate({ ids, action })
        break;
      case "apply":
        tasksForEventInfoCopy[index].volunteerAssignmentStatus = String(VolunteerAssignmentStatus.PENDING)
        setTasksForEventInfo(tasksForEventInfoCopy)
        sendAssignmentsData(data)
        //* version with mutation
        await updateAssignmentStatus.mutate({ ids, action })
        break;
    }


    if (logs) { console.log("after change") }
    if (logs) { console.log(tasksForEventInfoCopy) }

  }

  const receiveValidationCancel = (ids) => {
    handleClick(ids, 'cancel')
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération de la liste des tâches liées à l'événement</div>;
  if (logs) { console.log(String.fromCodePoint(0x1F516) + " ModaleTaskList.tsx ~ data: ") }
  if (logs) { console.log(data) }
  return (
    <>
      <ApplyButton onClick={handleOpen} />
      <Dialog
        open={open}
        size="xl"
        handler={handleOpen}
      >
        <DialogHeader>Liste des tâches</DialogHeader>
        <DialogBody>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* DEMO change*/}
                {tasksForEventInfo.map(({ userId, eventId, taskId, taskName, countValidatedAssignment, nbVolunteersRequired, volunteerAssignmentStatus }, index: number) => {
                  {/*original*/ }
                  {/*{data?.map(({ userId, eventId, taskId, taskName, countValidatedAssignment, nbVolunteersRequired, volunteerAssignmentStatus }, index: number) => { */ }

                  const isLast = index === data.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={taskName}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {taskName}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {`${countValidatedAssignment}/${nbVolunteersRequired}`}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {/*DEMO change */}
                          {volunteerAssignmentStatus || 'NOT CREATED IN DB'}
                          {/*original*/}
                          {/* ! NOT APPLIED doesnt work */}

                          {/*{EnumUtils.getKey(VolunteerAssignmentStatus, +volunteerAssignmentStatus) || 'NOT CREATED IN DB'}*/}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {/* 
                        cases:
                        validated for an event: no button
                        when pending: bouton annuler
                        when accepted: bouton annuler + modal
                        when no status, or any other status: bouton postuler
                         */}
                        {
                          (+volunteerAssignmentStatus === VolunteerAssignmentStatus.ACCEPTED) ? <TaskApplyCancelConfirmation ids={{ volunteerId: getConnectedUserId(), eventId: eventId, taskId: taskId }} validated={receiveValidationCancel} /> :
                            (validatedForEvent) ? '' :
                              (+volunteerAssignmentStatus === VolunteerAssignmentStatus.PENDING) ?
                                <Button onClick={() => handleClick({ volunteerId: getConnectedUserId(), eventId: eventId, taskId: taskId }, 'cancel')}>Annuler</Button> :
                                <Button onClick={() => handleClick({ volunteerId: getConnectedUserId(), eventId: eventId, taskId: taskId }, 'apply')}>Postuler</Button>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </DialogBody>
      </Dialog>
    </>
  );
}
