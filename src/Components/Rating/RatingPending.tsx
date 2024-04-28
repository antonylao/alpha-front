//Parent: PastEvents

import { Rating } from "@material-tailwind/react";
import { useState } from "react";

export function RatingPending(props: any) {
  const { volunteerId, taskId, eventId, sendToParent } = props

  // const [value, setValue] = useState<any>(0)

  const handleChange = (value: number) => {
    // setValue(value)
    sendToParent({ volunteerId: volunteerId, taskId: taskId, eventId: eventId, rating: value })
  }
  return (
    <Rating onChange={handleChange} />
  )
}