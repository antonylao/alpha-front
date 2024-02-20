import React, { useEffect, useState } from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
import { RatingVolunteerProfile } from "../Rating/RatingVolunteerProfile";
import { RatingDone } from "../Rating/RatingDone";
import { RatingByTask } from "../Rating/RatingByTask";
import { getEventsAssignedByVolunteerId } from "../../services/api/volunteer_assignments";
import { useQuery } from "@tanstack/react-query";
import { taskNameValid } from "../../services/api/tasks";

export function RatingDetails(props: any) {
  const { id } = props

  const [eventsAssigned, setEventsAssigned] = useState<any>([])
  const [rating, setRating] = useState<number>(0)


  // console.log(rating)
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`eventsAssignedList_volunteer_${id}`],
    queryFn: () => getEventsAssignedByVolunteerId(id),
  })

  useEffect(() => {
    if (isSuccess) {
      console.log("useEffect called for id " + id)
      setEventsAssigned(data)


      const mean = meanRatings(data)
      // setRating(mean)

      if (mean) { setRating(mean) };
    }
  }, [isSuccess])

  const meanRatings = (listRatings: Array<any>) => {
    // const taskNameVerification = await taskNameValid(taskName);
    // if (taskName.length > 0 && taskNameVerification) {
    //   console.log("condition valid")
    // }
    listRatings =
      listRatings.map((obj) => { return obj.volunteer_assignment_rating })
        .filter((obj) => { return obj })
        .map((obj) => { return Number(obj) })
    console.log(listRatings)

    if (listRatings?.length === 0) {
      return undefined;
    }

    const sumRatings = listRatings?.reduce((acc: number, currentValue: number) => {
      return acc + currentValue
    })
    const meanRatings = sumRatings / listRatings?.length
    console.log(meanRatings)

    return meanRatings
  }





  const [openPopover, setOpenPopover] = React.useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };



  //for content of popover
  const ratings = [
    { name: 'Tâche 1', value: '1', count: '3' },
    { name: 'Tâche 2', value: '2', count: '12' },
    { name: 'Tâche 3', value: '3', count: '16' },
    { name: 'Tâche 4', value: '4', count: '2' },
    { name: 'Tâche 5', value: '5', count: '111' },
  ]

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération des events assignés au bénévole {id}</div>;

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        {/* I have to enclose the component in a div : but still doesn't work because the value doesn't disply properly in the rating component*/}
        <div>
          <RatingVolunteerProfile rating={rating} count={eventsAssigned.filter((obj: any) => obj.volunteer_assignment_rating).length} />
        </div>

        {/* copy of RatingVolunteerProfile */}
        {/* <div className="flex items-center gap-2 font-bold text-blue-gray-500">
          {rating}
          <RatingDone value={Math.round(rating)} />
          <Typography color="blue-gray" className="font-medium text-blue-gray-500">
            ({eventsAssigned.filter((obj: any) => obj.volunteer_assignment_rating).length})
          </Typography>
        </div> */}
        {/* end copy of RatingVolunteerProfile */}

      </PopoverHandler>
      <PopoverContent {...triggers} className="grid grid-cols-2 gap-3">
        {ratings.map((obj: any, index) => (
          <div key={index}>
            {/* {obj.name} <RatingDone value={Number(obj.value)} />({obj.count}) */}
            <RatingByTask task={obj.name} rating={Number(obj.value)} count={obj.count} />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}

