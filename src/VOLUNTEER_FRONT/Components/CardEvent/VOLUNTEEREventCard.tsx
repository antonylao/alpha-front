import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { BanButton } from "../../../Components/Buttons/Ban/Ban";
import { WarningButton } from "../../../Components/Buttons/Warning/Warning";
import { PastEventsButton } from "../../../Components/Buttons/PastEvents/PastEvents";
import { format, parse } from "@formkit/tempo";
import { ApplyButton } from "./ApplyButton/ApplyButton";
import { ModaleTaskList } from "./ModaleTaskList/ModaleTaskList";

export function VolunteerEventCard({ data }: any) {
  console.log(data)

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
            <div
              className={`border border-black rounded-full ${data.type === "concert"
                ? "bg-blue-500"
                : data.type === "theatre"
                  ? "bg-orange-500"
                  : data.type === "one_man_show"
                    ? "bg-red-500"
                    : ""
                }`}
            >
              {data.type}
            </div>
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

