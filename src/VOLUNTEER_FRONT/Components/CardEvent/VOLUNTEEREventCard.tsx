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
import { cardBorderColor, eventTypeBackgroundColor } from "../../../services/utils/Utils";
import { VolunteerAssignmentStatus } from "../../../services/utils/BackendEnums";
import { DateTimeUtils } from "../../../services/utils/DateTimeUtils";

export function VolunteerEventCard({ data }: any) {
  const logs = false
  if (logs) { console.log(`🚀 ~ VolunteerEventCard ~ data (eventid ${data.id}):`, data) }

  const [borderColor, setBorderColor] = useState<string>(cardBorderColor(''))

  //set card border color upon receiving assignments data from ModaleTaskList
  const receiveAssignmentsData = (data: any) => {
    if (logs) { console.log(`🚀 ~ receiveAssignmentsData ~ data (eventid ${data.id}):`, data) }
    if (data.filter((obj) => +obj.volunteerAssignmentStatus === +VolunteerAssignmentStatus.ACCEPTED).length > 0) {
      if (logs) { console.log('validated') }
      setBorderColor(cardBorderColor('validated'))
    } else if (data.filter((obj) => +obj.volunteerAssignmentStatus === +VolunteerAssignmentStatus.PENDING).length > 0) {
      if (logs) { console.log('pending') }
      setBorderColor(cardBorderColor('pending'))
    } else if (data.filter((obj) => +obj.volunteerAssignmentStatus === +VolunteerAssignmentStatus.REFUSED || obj.volunteerAssignmentStatus === VolunteerAssignmentStatus.CANCELED).length > 0) {
      if (logs) { console.log('refused') }
      setBorderColor(cardBorderColor('refused'))
    } else {
      setBorderColor(cardBorderColor(''))
    }
  }

  return (
    <>
      <Card className={`w-full max-w-[26rem] shadow-lg border-2 ${borderColor} h-full `}>
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
              {data.title.slice(0, 15)}

            </Typography>
            <Chip value={data.room.name}
              className={`border border-black rounded-full ${eventTypeBackgroundColor(data.type)}`} />
          </div>
          <Typography color="gray" className="mb-5">{data.description.slice(0, 100)}</Typography>

          {/*DEMO change*/}
          <Typography color="gray">{data.startOn}</Typography>
          {/*original*/}
          {/*<Typography color="gray">{DateTimeUtils.formatDateTimeForCard(data.startOn)}</Typography>*/}
        </CardBody>
        <CardFooter>
          <div className="flex items-center">
            <div>{`Durée: ${DateTimeUtils.formatTime(data.duration)}`}</div>
            <div className="flex items-center ml-auto space-x-1">
              <div className="">
                <ModaleTaskList eventId={data.id} sendAssignmentsData={receiveAssignmentsData} />
              </div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}

