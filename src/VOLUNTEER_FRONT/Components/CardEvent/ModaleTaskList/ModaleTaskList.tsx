import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
  Typography,
} from "@material-tailwind/react";
import { ApplyButton } from "../ApplyButton/ApplyButton";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const TABLE_HEAD = ["Tâche", "Requis/Validés", "Statut", ""];

export function ModaleTaskList() {

  const [open, setOpen] = React.useState(false);
  // const [eventTasks, setEventTasks] = useState<Array<any>>([])
  const eventTasks = [
    {
      task_name: "Task 1",
      volunteer_assignment_count_validated: 3, event_task_nb_volunteers_required: 4, volunteer_assignment_status: undefined,
    },
    {
      task_name: "Task 2",
      volunteer_assignment_count_validated: 3, event_task_nb_volunteers_required: 4, volunteer_assignment_status: 'validated',
    },
    {
      task_name: "Task 3",
      volunteer_assignment_count_validated: 3, event_task_nb_volunteers_required: 4, volunteer_assignment_status: 'pending',
    },
    {
      task_name: "Task 4",
      volunteer_assignment_count_validated: 3, event_task_nb_volunteers_required: 4, volunteer_assignment_status: undefined,
    },
  ]

  const queryClient = useQueryClient();


  //IN PROGRESS: change querykey with onSuccess & onError, maybe change ids key accessed on mutationFn
  // const updateTaskStatus = useMutation({
  //   mutationFn: ({ ids, data }) => {
  //     return axios.post(`https://jsonplaceholder.typicode.com/posts/patch/${ids.event_id}`, data)
  //   },
  //   // doesn't return the correct post value with a faker
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: [`eventsAssignedListVolunteer${id}`], refetchType: 'all' })
  //   },
  //   onError: () => {
  //     console.log("error branch")
  //     queryClient.invalidateQueries({ queryKey: [`eventsAssignedListVolunteer${id}`], refetchType: 'all' })
  //   }
  // })



  const handleOpen = () => {
    setOpen(!open);
  }

  const handleValidate = () => {
    setOpen(!open);
  }
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
                {eventTasks.map(({ task_name, volunteer_assignment_count_validated, event_task_nb_volunteers_required, volunteer_assignment_status }, index: number) => {
                  const isLast = index === eventTasks.length - 1;
                  const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={task_name}>
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
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {`${volunteer_assignment_count_validated}/${event_task_nb_volunteers_required}`}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {volunteer_assignment_status ? volunteer_assignment_status : ''}
                        </Typography>
                      </td>
                      <td className={classes}>
                        {
                          !volunteer_assignment_status ? <Button>Postuler</Button> : <Button>Annuler</Button>
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