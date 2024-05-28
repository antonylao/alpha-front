//Parent: RatingDetails

import { Typography } from "@material-tailwind/react";
import { RatingDone } from "./RatingDone";
import { useState } from "react";

export function RatingByTask(props: any) {
  const { task, rating, count } = props

  return (
    <div className="flex items-center gap-2 font-bold text-blue-gray-500">
      <p>{task}: {rating}</p>
      <RatingDone rating={Math.round(rating)} />
      <Typography color="blue-gray" className="font-medium text-blue-gray-500">
        ({count})
      </Typography>
    </div>
  );
}