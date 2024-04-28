//Parent: VolunteerCard

import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  Typography
} from "@material-tailwind/react";
import { RatingDone } from "../../Rating/RatingDone";
import { RatingPending } from "../../Rating/RatingPending";
import { PastEventsButton } from "../../Buttons/PastEvents/PastEvents";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getEventsAssignedByVolunteerId, updateVolunteerAssignmentRating } from "../../../services/api/volunteer_assignments";
import axios from "axios";
import clone from 'just-clone';
import { DateTimeUtils } from "../../../services/utils/DateTimeUtils";

const TABLE_HEAD = ["Titre", "Date et heure", "Tâche", "Note", ""];

export function PastEventsModal(props: any) {
  const { volunteerId, newRatingApplied } = props

  const [open, setOpen] = React.useState(false);
  const [eventsAssigned, setEventsAssigned] = useState<any>([])
  const [newRatings, setNewRatings] = useState<any>([])

  const queryClient = useQueryClient();
  const updateRating = useMutation({
    mutationFn: ({ ids, newVal }) => { return updateVolunteerAssignmentRating({ ids, newVal }) },
    onSuccess: () => {
      // newRatingApplied()
      queryClient.invalidateQueries({ queryKey: [`eventsAssignedListVolunteer${volunteerId}`], refetchType: 'all' })
    },
    onError: () => {
      console.log("error branch")
    }
  })

  // console.log("test")
  // console.log(updateVolunteerAssignmentRating({ ids: { volunteer_id: 1, event_id: 1, task_id: 1 }, newVal: 3 }))

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`eventsAssignedListVolunteer${volunteerId}`],
    queryFn: () => getEventsAssignedByVolunteerId(volunteerId),
  })

  useEffect(() => {
    if (isSuccess) {
      const dataCopy = clone(data)
      console.log("🚀 ~ useEffect ~ dataCopy:", dataCopy)
      setEventsAssigned(dataCopy)
    }
  }, [isSuccess])


  const handleOpen = () => {
    if (open) {
      setNewRatings([])
    }
    setOpen(!open);
  }

  //* NEW RATING APPLIED ON RatingPending COMPONENT
  const receiveRatingValue = (obj: any) => {
    let indexNewRating = NaN;

    console.log("🚀 ~ receiveRatingValue ~ obj:", obj)


    //if there is already a rating for this event and task, replace the value of the rating by the new one
    newRatings.every((elt: any, index: number) => {
      if (elt.eventId === obj.eventId && elt.taskId === obj.taskId) {
        indexNewRating = index;
        return false;
      }

      return true;
    });


    if (isNaN(indexNewRating)) {
      setNewRatings([...newRatings, { volunteerId: obj.volunteerId, eventId: obj.eventId, taskId: obj.taskId, value: obj.rating }])
    } else {
      const newRatingsCopy = newRatings.toSpliced(indexNewRating, 1)
      setNewRatings([...newRatingsCopy, { volunteerId: obj.volunteerId, eventId: obj.eventId, taskId: obj.taskId, value: obj.rating }])
    }

  }

  //* UPDATES RATING IN DB AND SEND DATA TO PARENT TO REFETCH DATA IN CARD
  const handleClick = async (ids: any, newVal: number) => {
    const eventsAssignedCopy = clone(eventsAssigned)

    if (!newVal) {
      console.log("No rating to apply. Possible to use react hook form for display?")
      return;
    }

    const index = eventsAssignedCopy.findIndex((obj: any) => obj.eventId === ids.eventId && obj.taskId === ids.taskId)
    eventsAssignedCopy[index].organiserRating = newVal

    setEventsAssigned(eventsAssignedCopy)

    //* with useMutation: newRatingApplied() is called on the onSuccess
    updateRating.mutate({ ids, newVal })
  }

  const ratingChanged = (eventId: number, taskId: number) => {
    return (
      newRatings.filter((obj: any) => obj.eventId === eventId && obj.taskId === taskId)
        .length > 0
    )
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération des events assignés au bénévole {volunteerId}</div>;

  return (
    <>
      <PastEventsButton onClick={handleOpen} />

      <Dialog
        open={open}
        size="xl"
        handler={handleOpen}
      >
        <DialogHeader>Events passés pour le bénévole</DialogHeader>
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
                {eventsAssigned.map(({ eventId, taskId, eventTitle, startOn, taskName, organiserRating }: any, index: number) => {
                  const isLast = index === eventsAssigned.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={`${eventId}-${taskId}-${eventTitle}`}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {eventTitle}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {DateTimeUtils.formatDateTimeForTable(startOn)}
                        </Typography>
                      </td>
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
                        {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        > */}
                        {organiserRating ? <RatingDone rating={Number(organiserRating)} /> : <RatingPending volunteerId={volunteerId} taskId={taskId} eventId={eventId} sendToParent={receiveRatingValue} />}
                        {/* </Typography> */}
                      </td>
                      <td className={classes}>
                        {
                          organiserRating ? undefined : <Button
                            onClick={() => handleClick(
                              {
                                volunteerId: volunteerId,
                                taskId: taskId,
                                eventId: eventId,
                              },
                              (ratingChanged(eventId, taskId) ? newRatings.filter((obj: any) => obj.eventId === eventId && obj.taskId === taskId)[0].value : undefined))
                            }
                          >Appliquer</Button>
                        }
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
        </DialogBody>
      </Dialog >
    </>
  );
}