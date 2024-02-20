import { Rating, Typography } from "@material-tailwind/react";
import { RatingDone } from "./RatingDone";

export function RatingVolunteerProfile(props: any) {
  const { rating, count } = props

  const ratingRounded = Math.round(rating);
  console.log("in rating volunteer profile")
  console.log(ratingRounded)

  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      {rating}

      {/* doesn't work */}
      {/* <RatingDone value={ratingRounded} /> */}
      <Rating value={ratingRounded} readonly />

      <Typography color="blue-gray" className="font-medium text-blue-gray-500">
        ({count})
      </Typography>
    </div>
  );
}