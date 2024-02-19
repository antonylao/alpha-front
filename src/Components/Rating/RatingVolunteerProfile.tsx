import { Typography } from "@material-tailwind/react";
import { RatingDone } from "./RatingDone";
 
export function RatingVolunteerProfile() {
  const rating=4
  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      {rating}
      <RatingDone value={rating}/>
      <Typography color="blue-gray" className="font-medium text-blue-gray-500">
        (13)
      </Typography>
    </div>
  );
}