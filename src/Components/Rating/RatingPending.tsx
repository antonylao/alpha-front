//Parent: PastEvents

import { Rating } from "@material-tailwind/react";
import { useState } from "react";

export function RatingPending(props: any) {
  const { volunteerId, taskId, eventId, sendToParent } = props

  // const [value, setValue] = useState<any>(0)

  const handleChange = (value: number) => {
    // setValue(value)
    sendToParent({ volunteer_id: volunteerId, task_id: taskId, event_id: eventId, rating_value: value })
  }
  return (
    <Rating onChange={handleChange} />
  )
}