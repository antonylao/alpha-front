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

const TABLE_HEAD = ["Titre", "Date et heure", "Tâche", "Note", ""];

export function PastEventsModal(props: any) {
  const { id, newRatingApplied } = props

  const [open, setOpen] = React.useState(false);
  const [eventsAssigned, setEventsAssigned] = useState<any>([])
  const [newRatings, setNewRatings] = useState<any>([])

  const queryClient = useQueryClient();
  const updateRating = useMutation({
    mutationFn: ({ ids, data }) => {
      return axios.post(`https://jsonplaceholder.typicode.com/posts/patch/${ids.volunteer_id}`, data)
    },
    // doesn't return the correct value with a faker
    // mutationFn: ({ ids, newVal }) => { return updateVolunteerAssignmentRating({ ids, newVal }) },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`eventsAssignedListVolunteer${id}`], refetchType: 'all' })
    },
    onError: () => {
      console.log("error branch")
      // queryClient.invalidateQueries({ queryKey: [`eventsAssignedListVolunteer${id}`], refetchType: 'all' })
      // queryClient.refetchQueries({ queryKey: [`eventsAssignedListVolunteer${id}`], type: 'active' })
      queryClient.refetchQueries({ stale: true })
    }
  })

  // console.log("test")
  // console.log(updateVolunteerAssignmentRating({ ids: { volunteer_id: 1, event_id: 1, task_id: 1 }, newVal: 3 }))

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`eventsAssignedListVolunteer${id}`],
    queryFn: () => getEventsAssignedByVolunteerId(id),
  })

  useEffect(() => {
    if (isSuccess) {
      const dataCopy = clone(data)
      setEventsAssigned(dataCopy)
    }
  }, [isSuccess])


  const handleOpen = () => {
    if (open) {
      setNewRatings([])
    }
    setOpen(!open);
  }

  const receiveRatingValue = (obj: any) => {
    let indexNewRating = NaN;

    //if there is already a rating for this event and task, replace the value of the rating by the new one
    newRatings.every((elt, index) => {
      if (elt.event_id === obj.event_id && elt.task_id === obj.task_id) {
        indexNewRating = index;
        return false;
      }

      return true;
    });


    if (isNaN(indexNewRating)) {
      setNewRatings([...newRatings, { volunteer_id: obj.volunteer_id, event_id: obj.event_id, task_id: obj.task_id, value: obj.rating_value }])
    } else {
      const newRatingsCopy = newRatings.toSpliced(indexNewRating, 1)
      setNewRatings([...newRatingsCopy, { volunteer_id: obj.volunteer_id, event_id: obj.event_id, task_id: obj.task_id, value: obj.rating_value }])
    }

  }

  const handleClick = (ids, newVal) => {
    const eventsAssignedCopy = clone(eventsAssigned)

    if (!newVal) {
      console.log("No rating to apply. Possible to use react hook form for display?")
      return;
    }
    // eventsAssignedCopy.filter((obj) => obj.event_id === event_id && obj.task_id === task_id)[0]
    // const eltToChange = eventsAssignedCopy.filter((obj) => obj.event_id === ids.event_id && obj.task_id === ids.task_id)[0]

    // console.log(eltToChange)
    // eltToChange.volunteer_assignment_rating = newVal

    const index = eventsAssignedCopy.findIndex(obj => obj.event_id === ids.event_id && obj.task_id === ids.task_id)
    eventsAssignedCopy[index].volunteer_assignment_rating = newVal

    setEventsAssigned(eventsAssignedCopy)
    // updateRating.mutate({ ids, newVal })
    //mutationFn called directly because we can't use it yet 
    updateVolunteerAssignmentRating({ ids, newVal })
    newRatingApplied()
  }

  const ratingChanged = (eventId, taskId) => {
    return !!(newRatings.filter((obj) => obj.event_id === eventId && obj.task_id === taskId)[0])
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération des events assignés au bénévole {id}</div>;

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
                {eventsAssigned.map(({ event_id, task_id, event_title, event_start_on, task_name, volunteer_assignment_rating }, index: number) => {
                  const isLast = index === eventsAssigned.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={event_title}>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {event_title}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {event_start_on}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {task_name}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {/* <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-medium"
                        > */}
                        {volunteer_assignment_rating ? <RatingDone rating={Number(volunteer_assignment_rating)} /> : <RatingPending volunteerId={id} taskId={task_id} eventId={event_id} sendToParent={receiveRatingValue} />}
                        {/* </Typography> */}
                      </td>
                      <td className={classes}>
                        {
                          volunteer_assignment_rating ? undefined : <Button
                            onClick={() => handleClick(
                              {
                                volunteer_id: id,
                                task_id: task_id,
                                event_id: event_id,
                              },
                              (ratingChanged(event_id, task_id) ? newRatings.filter((obj: any) => obj.event_id === event_id && obj.task_id === task_id)[0].value : undefined))
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