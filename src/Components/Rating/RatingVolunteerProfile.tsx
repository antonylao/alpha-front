//Parent: RatingVolunteerProfile

import { Rating, Typography } from "@material-tailwind/react";
import { RatingDone } from "./RatingDone";
import { useEffect, useState } from "react";
import React from "react";


interface RatingVolunteerProfileProps {
  volunteerId: number,
  rating: number,
  count: number
}
export function RatingVolunteerProfile(props: RatingVolunteerProfileProps) {
  const { volunteerId, rating, count } = props

  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      <p>{rating}</p>
      <RatingDone rating={Math.round(rating)} />
      <Typography color="blue-gray" className="font-medium text-blue-gray-500">
        ({count})
      </Typography>
    </div>
  );
}