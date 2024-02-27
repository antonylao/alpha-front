import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Typography,
} from "@material-tailwind/react";
// import { RatingVolunteerProfile } from "../Rating/RatingVolunteerProfile";
import { RatingDone } from "./RatingDone";
import { RatingByTask } from "./RatingByTask";
 
export function PopOverRating() {
  const [openPopover, setOpenPopover] = React.useState(false);
 
  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };
 
  //for component Rating
  const rating=4

  //for content of popover
  const ratings = [
    {name:'Tâche 1', value: '1', count: '3'},
    {name:'Tâche 2', value: '2', count: '12'},
    {name:'Tâche 3', value: '3', count: '16'},
    {name:'Tâche 4', value: '4', count: '2'},
    {name:'Tâche 5', value: '5', count: '111'},
  ]

  return (
    <Popover open={openPopover} handler={setOpenPopover}>
      <PopoverHandler {...triggers}>
        {/* doesn't work, I have to copy paste the content of the component */}
        {/* <RatingVolunteerProfile /> */}
        
        {/*RatingVolunteerProfile component */}
        <div className="flex items-center gap-2 font-bold text-blue-gray-500">
          {rating}
          <RatingDone value={rating}/>
          <Typography color="blue-gray" className="font-medium text-blue-gray-500">
            (13)
          </Typography>
        </div>
        {/*end RatingVolunteerProfile component */}

      </PopoverHandler>
      <PopoverContent {...triggers} className="grid grid-cols-2 gap-3">
        {ratings.map((obj:any, index ) => (
          <div key={index}>
            {/* {obj.name} <RatingDone value={Number(obj.value)} />({obj.count}) */}
            <RatingByTask task={obj.name} rating={Number(obj.value)} count={obj.count} />
          </div>
        ))}
      </PopoverContent>
    </Popover>
  );
}