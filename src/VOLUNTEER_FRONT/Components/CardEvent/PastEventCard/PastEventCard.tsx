import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Chip,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { format, parse } from "@formkit/tempo";
import { ModaleTaskList } from "../ModaleTaskList/ModaleTaskList";
import { cardBorderColor, eventTypeBackgroundColor } from "../../../../services/utils/Utils";
import { ModalComment } from "./CommentButton/ModalComment";
import { DateTimeUtils } from "../../../../services/utils/DateTimeUtils";

const logs = false

export function PastEventCard({ data }: any) {

  const onMountBorderColor = data.volunteerComment ? cardBorderColor('commented') : cardBorderColor('not_commented')

  const [borderColor, setBorderColor] = useState<string>('')

  useEffect(() => {
    setBorderColor(onMountBorderColor)
  }, [onMountBorderColor])

  const receiveCommentAppliedData = () => {
    setBorderColor(cardBorderColor('commented'))
  }

  return (
    <>
      <Card className={`w-full max-w-[26rem] shadow-lg border-2 ${borderColor} `}>
        <CardHeader floated={false} color="blue-gray">
          <img
            src={data.picture}
            alt="event picture"
          />
          <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        </CardHeader>
        <CardBody>
          <div className="mb-3 flex justify-center items-center flex-wrap">
            <Typography
              variant="h5"
              color="blue-gray"
              className="font-medium mr-5"
            >
              {data.title}
            </Typography>
            <Chip value={data.roomName}
              className={`border border-black rounded-full ${eventTypeBackgroundColor(data.type)}`} />
          </div>
          <Typography color="gray" className="mb-5">{data.description}</Typography>
          <Typography color="gray" className="mb-5">{DateTimeUtils.formatDateTimeForCard(data.startOn)}</Typography>
          <Typography color="gray" >{data.taskName}</Typography>
        </CardBody>
        <CardFooter>
          <div className="flex items-center">
            <div>{`Durée: ${DateTimeUtils.formatTime(data.duration)}`}</div>
            <div className="flex items-center ml-auto space-x-1">
              <div className="">
                <ModalComment ids={{ volunteerId: data.volunteerId, eventId: data.eventId, taskId: data.taskId }} comment={data.volunteerComment} commentApplied={receiveCommentAppliedData} />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

