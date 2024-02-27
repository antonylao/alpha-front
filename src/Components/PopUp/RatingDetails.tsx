//Parent: VolunteerCard

import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { RatingVolunteerProfile } from "../Rating/RatingVolunteerProfile";
import { RatingByTask } from "../Rating/RatingByTask";
import { getEventsAssignedByVolunteerId } from "../../services/api/volunteer_assignments";
import { useQuery } from "@tanstack/react-query";
import { getTasks } from "../../services/api/tasks";
import { roundToFloat } from "../../services/utils/Utils";

export function RatingDetails(props: any) {
  const { id, countRatingApplied } = props

  const [eventsAssigned, setEventsAssigned] = useState<any>([])
  const [rating, setRating] = useState<number>(0)
  const [meanRatingsForPopover, setMeanRatingsForPopover] = useState<any>([])
  const [openPopover, setOpenPopover] = useState(false);
  // console.log(eventsAssigned)

  const count = eventsAssigned?.filter((obj: any) => obj.volunteer_assignment_rating).length

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  const { data, isSuccess, isLoading, isError, refetch } = useQuery({
    queryKey: [`eventsAssignedListVolunteer${id}`],
    queryFn: () => getEventsAssignedByVolunteerId(id),
  })

  const { data: taskList, isSuccess: taskListSuccess, isLoading: taskListLoading, isError: taskListError } = useQuery({
    queryKey: [`taskList`],
    queryFn: getTasks,

  })

  //set new state for remounting with the correct values for the props of RatingVolunteerProfile and RatingByTask
  const handleRefetch = async () => {
    try {
      const res = await refetch();
      const mean = meanRatings(res.data)
      if (mean) { setRating(mean) };
      const newMeanRatingsForPopover = meanRatingsByTask(res.data)
      setMeanRatingsForPopover(newMeanRatingsForPopover)


    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    console.log("useEffect called in RatingDetails for id " + id)
    console.log(JSON.stringify([isSuccess, taskListSuccess, countRatingApplied]))
    if (isSuccess) { setEventsAssigned(data) }
    if (taskListSuccess && isSuccess) {
      //issue: fetch on first mount of component
      handleRefetch()
    }
  }, [isSuccess, taskListSuccess, countRatingApplied])

  const meanRatings = (listRatings: Array<any>) => {
    listRatings =
      listRatings.map((obj) => { return obj.volunteer_assignment_rating })
        .filter((obj) => { return obj })
        .map((obj) => { return Number(obj) })

    if (listRatings.length === 0) {
      return 0;
    }

    const sumRatings = listRatings.reduce((acc: number, currentValue: number) => {
      return acc + currentValue
    })
    let meanRatingsNum = sumRatings / listRatings.length

    meanRatingsNum = roundToFloat(meanRatingsNum, 2)

    return meanRatingsNum
  }

  const meanRatingsByTask = (listRatings: Array<any>) => {
    try {
      const taskNameList = taskList

      const returnArr: Array<any> = []

      taskNameList?.every((task) => {
        const listRatingsByTask = listRatings.filter((obj) => obj.task_name === task.name && obj.volunteer_assignment_rating)

        let newItem = {}
        if (listRatingsByTask.length === 0) {
          newItem = { id: task.id, name: task.name, rating: 0, count: 0 }
        } else {
          newItem = { id: task.id, name: task.name, rating: meanRatings(listRatingsByTask), count: listRatingsByTask.length }
        }

        returnArr.push(newItem)
        return true
      })

      //FOR DISPLAY: sort returnArr by id

      return returnArr;
    } catch (err) {
      console.log(err)
    }
  }


  if (isLoading || taskListLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération des events assignés au bénévole {id}</div>;
  if (taskListError) return <div>Erreur lors de la récupération des tâches</div>;

  return (
    <div>
      <Popover open={openPopover} handler={setOpenPopover}>
        <PopoverHandler {...triggers}>
          {/* I have to enclose the component in a div : but still doesn't work because the value doesn't disply properly in the rating component*/}
          <div>
            <RatingVolunteerProfile volunteerId={id} rating={rating} count={count} />
            {/* <RatingVolunteerProfile volunteerId={id} rating={rating} count={0} /> */}
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
    </div>
  );
}

