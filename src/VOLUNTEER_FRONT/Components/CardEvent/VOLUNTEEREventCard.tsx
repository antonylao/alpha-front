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
import { ModaleTaskList } from "./ModaleTaskList/ModaleTaskList";
import { eventTypeBackgroundColor } from "../../../services/utils/Utils";

export function VolunteerEventCard({ data }: any) {
  console.log(data.id)

  return (
    <>
      <Card className="w-full max-w-[26rem] shadow-lg">
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

          <Typography color="gray">{format(parse(data.start_on, "YYYY-MM-DD HH:MM:SS"), { date: "full", time: "short" }, "fr")}</Typography>
        </CardBody>
        <CardFooter>
          <div className="flex items-center">
            <div>{`Durée: ${format(parse(data.duration, "HH:mm:ss"), { time: "short" }, "fr")}`}</div>
            <div className="flex items-center ml-auto space-x-1">
              <div className="">
                <ModaleTaskList />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

