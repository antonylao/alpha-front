// Parents: 
// - In VolunteerPage: RatingByTask, RatingVolunteerProfile, PastEvents

import { Rating } from "@material-tailwind/react";
import { useEffect, useState } from "react";
interface RatingDoneProps {
  rating: number
}


export function RatingDone(props: RatingDoneProps) {
  const { rating } = props

  let rating2 = 0
  if (typeof rating === 'number') {
    rating2 = Math.round(rating)
  } else if (typeof rating === 'string') {
    rating2 = parseInt(rating, 10)
  }

  return (
    <div key={rating2}>
      <Rating value={rating2} readonly />
    </div>
  );
}