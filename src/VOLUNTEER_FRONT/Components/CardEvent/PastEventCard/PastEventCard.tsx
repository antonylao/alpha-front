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

export function PastEventCard({ data }: any) {

  const onMountBorderColor = data.comment ? cardBorderColor('commented') : cardBorderColor('not_commented')

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
            <Chip value={data.room}
              className={`border border-black rounded-full ${eventTypeBackgroundColor(data.type)}`} />
          </div>
          <Typography color="gray" className="mb-5">{data.description}</Typography>

          <Typography color="gray" className="mb-5">{format(parse(data.start_on, "YYYY-MM-DD HH:MM:SS"), { date: "full", time: "short" }, "fr")}</Typography>
          <Typography color="gray" >{data.task_name}</Typography>
        </CardBody>
        <CardFooter>
          <div className="flex items-center">
            <div>{`Durée: ${format(parse(data.duration, "HH:mm:ss"), { time: "short" }, "fr")}`}</div>
            <div className="flex items-center ml-auto space-x-1">
              <div className="">
                <ModalComment ids={{ volunteerId: data.volunteer_id, eventId: data.event_id, taskId: data.task_id }} comment={data.comment} commentApplied={receiveCommentAppliedData} />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

