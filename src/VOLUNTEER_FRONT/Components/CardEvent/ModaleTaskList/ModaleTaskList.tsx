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
import { createVolunteerAssignment, getTasksInfoForVolunteerEventIndexPage } from "../../../../services/api/volunteer_assignments";
import { TaskApplyCancelConfirmation } from "./ConfirmationCancel/ConfirmationCancel";
import axios from "axios";
import { VolunteerAssignmentStatus } from "../../../../services/utils/BddEnums";

const TABLE_HEAD = ["Tâche", "Nb Requis/Validés", "Statut", ""];


export function ModaleTaskList(props: any) {

  const { eventId, sendAssignmentsData } = props;

  //get volunteer id via the URL ? 
  // const {volunteerId} = useParams()
  //* fix for now: 
  const volunteerId = 1;

  const [open, setOpen] = React.useState(false);
  const [tasksForEventInfo, setTasksForEventInfo] = useState<Array<any>>([])

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`TasksForEvent${eventId}AndAssignmentInfos`],
    queryFn: () => getTasksInfoForVolunteerEventIndexPage(eventId),
  })

  useEffect(() => {
    if (isSuccess) {
      setTasksForEventInfo(data)
      sendAssignmentsData(data)
    }
  }, [isSuccess])

  const queryClient = useQueryClient();
  const updateAssignmentStatus = useMutation({
    mutationFn: ({ ids, data }) => {
      return axios.post(`https://jsonplaceholder.typicode.com/posts/patch/${ids.eventId}`, data)
    },
    // doesn't return the correct value with a faker
    // mutationFn: ({ ids, action }) => {
    //   switch (action) {
    //     //! replace by enum values
    //     case "cancel":
    //       return updateVolunteerAssignmentStatus({ ids, newVal: 'cancel' })
    //       break;
    //     case "apply":
    //       return createVolunteerAssignment({ ids, status: VolunteerAssignmentStatus.PENDING })
    //       break;
    //   }
    // },
    onSuccess: () => {
      console.log("success branch")
      queryClient.invalidateQueries({ queryKey: [`TasksForEvent${eventId}AndAssignmentInfos`], refetchType: 'all' })
    },
    onError: () => {
      console.log("error branch")
    }
  })

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleClick = (ids, action) => {
    console.log("handle click")
    console.log(ids)
    console.log(action)
    const tasksForEventInfoCopy = [...tasksForEventInfo]
    console.log(tasksForEventInfoCopy)

    const index = tasksForEventInfoCopy.findIndex(obj => obj.volunteer_id === ids.volunteerId && obj.event_id === ids.eventId && obj.task_id === ids.taskId)
    console.log(index)

    switch (action) {
      case "cancel":
        tasksForEventInfoCopy[index].volunteer_assignment_status = 'undefined'
        setTasksForEventInfo(tasksForEventInfoCopy)
        sendAssignmentsData(data)
        // updateAssignmentStatus.mutate({ ids, action })
        break;
      case "apply":
        tasksForEventInfoCopy[index].volunteer_assignment_status = 'pending'
        setTasksForEventInfo(tasksForEventInfoCopy)
        sendAssignmentsData(data)
        // updateAssignmentStatus.mutate({ ids, action })
        break;
    }
    console.log("after change")
    console.log(tasksForEventInfoCopy)

  }

  const receiveValidationCancel = (ids) => {
    handleClick(ids, 'cancel')
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération de la liste des tâches liées à l'événement</div>;
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
                {data?.map(({ userId, eventId, taskId, taskName, countValidatedAssignment, nbVolunteersRequired, volunteerAssignmentStatus }, index: number) => {
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
                          {volunteerAssignmentStatus ? volunteerAssignmentStatus : ''}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {
                          (volunteerAssignmentStatus === 'pending') ?
                            <Button onClick={() => handleClick({ volunteerId: volunteerId, eventId: eventId, taskId: taskId }, 'cancel')}>Annuler</Button> :
                            (volunteerAssignmentStatus === 'validated') ? <TaskApplyCancelConfirmation ids={{ volunteerId: volunteerId, eventId: eventId, taskId: taskId }} validated={receiveValidationCancel} /> :
                              <Button onClick={() => handleClick({ volunteerId: volunteerId, eventId: eventId, taskId: taskId }, 'apply')}>Postuler</Button>
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
