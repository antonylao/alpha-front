//Parent: VolunteerCard

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
  Rating,
} from "@material-tailwind/react";
import { RatingVolunteerProfile } from "../Rating/RatingVolunteerProfile";
import { RatingByTask } from "../Rating/RatingByTask";
import { getEventsAssignedByVolunteerId } from "../../services/api/volunteer_assignments";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/api/tasks";
import { roundToFloat } from "../../services/utils/Utils";

export function RatingDetails(props: any) {
  const { id } = props

  const [eventsAssigned, setEventsAssigned] = useState<any>([])
  const [rating, setRating] = useState<number>(0)
  const [meanRatingsForPopover, setMeanRatingsForPopover] = useState<any>([])
  const [openPopover, setOpenPopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  console.log(`id: ${id}`)

  // console.log(meanRatingsForPopover)
  const count = eventsAssigned?.filter((obj: any) => obj.volunteer_assignment_rating).length

  // console.log(rating)
  const { data, isSuccess, isLoading, isError, fetchStatus } = useQuery({
    queryKey: [`eventsAssignedListVolunteer${id}`],
    queryFn: () => getEventsAssignedByVolunteerId(id),
  })

  const { data: taskList, isSuccess: taskListSuccess, isLoading: taskListLoading, isError: taskListError } = useQuery({
    queryKey: [`taskList`],
    queryFn: getTasks,
    // refetchInterval: 1000
  })

  useEffect(() => {
    console.log("useEffect called in RatingDetails for id " + id)
    console.log(JSON.stringify([isSuccess, taskListSuccess]))

    if (isSuccess) {
      console.log("useEffect called for isSuccess: for id " + id)
      console.log(data)
      setEventsAssigned(data)

      const mean = meanRatings(data)
      // setRating(mean)

      if (mean) { console.log('rating val changed'); setRating(mean) };
    }

    if (taskListSuccess && isSuccess) {
      // console.log("useEffect called for taskListSuccess & isSuccess: for id " + id)
      // console.log("taskList ")
      // console.log(JSON.stringify(taskList))

      const newMeanRatingsForPopover = meanRatingsByTask(data)
      setMeanRatingsForPopover(newMeanRatingsForPopover)

      //HACK: to update data displayed
      setInterval(() => {
        //data is updated without a refetch interval in the useQuery, don't know why
        const mean = meanRatings(data)
        if (mean) { setRating(mean) };
        const newMeanRatingsForPopover = meanRatingsByTask(data)
        setMeanRatingsForPopover(newMeanRatingsForPopover)
      }, 1000);
    }
  }, [isSuccess, taskListSuccess, openPopover])

  const meanRatings = (listRatings: Array<any>) => {
    // console.log(`meanRatings called for id ${id} `)
    // const taskNameVerification = await taskNameValid(taskName);
    // if (taskName.length > 0 && taskNameVerification) {
    //   console.log("condition valid")
    // }
    listRatings =
      listRatings.map((obj) => { return obj.volunteer_assignment_rating })
        .filter((obj) => { return obj })
        .map((obj) => { return Number(obj) })

    // console.log('from meanRatings (rating details comp)')
    // console.log(listRatings)

    if (listRatings.length === 0) {
      return 0;
    }

    const sumRatings = listRatings.reduce((acc: number, currentValue: number) => {
      return acc + currentValue
    })
    let meanRatingsNum = sumRatings / listRatings.length

    meanRatingsNum = roundToFloat(meanRatingsNum, 2)

    // console.log(meanRatingsNum)

    return meanRatingsNum
  }

  const meanRatingsByTask = (listRatings: Array<any>) => {
    // console.log("in meanRatingsByTask fn")
    try {
      const taskNameList = taskList

      const returnArr: Array<any> = []

      taskNameList?.every((task) => {
        const listRatingsByTask = listRatings.filter((obj) => obj.task_name === task.name && obj.volunteer_assignment_rating)
        // console.log("in loop: task " + task.name)
        // console.log("listRatingsByTask")
        // console.log(listRatingsByTask)
        let newItem = {}
        if (listRatingsByTask.length === 0) {
          newItem = { id: task.id, name: task.name, rating: 0, count: 0 }
        } else {
          // newItem = { id: task.id, name: task.name, rating: meanRatings(listRatingsByTask), count: listRatingsByTask.length }
          newItem = { id: task.id, name: task.name, rating: meanRatings(listRatingsByTask), count: listRatingsByTask.length }
        }
        // console.log("in loop: object pushed")
        // console.log(JSON.stringify({ id: task.id, name: task.name, rating: meanRatings(listRatingsByTask), count: listRatingsByTask.length }))
        //issue with rating value??
        returnArr.push(newItem)
        return true
      })

      //sort returnArr by id

      // console.log("meanRatingsByTask return")
      // console.log(returnArr)

      return returnArr;
    } catch (err) {
      console.log(err)
    }
  }

  // console.log("mean ratings by task")
  // console.log(meanRatingsByTask)



  if (isLoading || taskListLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération des events assignés au bénévole {id}</div>;
  if (taskListError) return <div>Erreur lors de la récupération des tâches</div>;

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        {/* I have to enclose the component in a div : but still doesn't work because the value doesn't disply properly in the rating component*/}
        <div>
          <RatingVolunteerProfile volunteerId={id} rating={rating} count={count} />
        </div>

      </PopoverHandler>
      <PopoverContent {...triggers} className="grid grid-cols-2 gap-3">
        {isSuccess && taskListSuccess && JSON.stringify(meanRatingsForPopover)}

        {meanRatingsForPopover.length > 0 &&
          meanRatingsForPopover.map((obj: any) => (
            <div key={obj.id}>
              <RatingByTask task={obj.name} rating={obj.rating} count={obj.count} />
            </div>
          ))}
        {/* {meanRatingsForPopover[0] &&
          <RatingByTask task={meanRatingsForPopover[0].name} rating={meanRatingsForPopover[0].rating} count={meanRatingsForPopover[0].count} />} */}
      </PopoverContent>
    </Popover>
  );
}

