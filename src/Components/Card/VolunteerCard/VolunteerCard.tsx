import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { BanConfirmation } from "../../Modales/BanConfirmation/BanConfirmation";
import { WarningConfirmation } from "../../Modales/WarningConfirmation/WarningConfirmation";
import { useEffect, useState } from "react";
import { RatingDetails } from "../../PopUp/RatingDetails";
import { PastEventsModal } from "../../Modales/PastEvents/PastEvents";
import { fakerVolunteers } from "../../../Pages/VolunteerPage/fakerVolunteers";
import { useQuery } from "@tanstack/react-query";
import { updateVolunteerBan, updateVolunteerWarning } from "../../../services/api/volunteers";
import { cardBorderColor } from "../../../services/utils/Utils";

export function VolunteerCard(props: any) {
  const { data } = props

  const id = data.id

  const [volunteer, setVolunteer] = useState<any>(data)
  const [warning, setWarning] = useState<boolean>(data.warning)
  const [ban, setBan] = useState<boolean>(data.ban)
  const [borderColor, setBorderColor] = useState<string>(cardBorderColor(''))
  const [refetchAndRemountRatingDetails, setRefetchAndRemountRatingDetails] = useState<number>(0)

  useEffect(() => {
    if (ban === true) {
      setBorderColor(cardBorderColor("ban"))
    } else if (warning === true) {
      setBorderColor(cardBorderColor("warning"))
    }
  }, [])

  const handleBan = () => {
    const newBan = true
    updateVolunteerBan(id, newBan);

    setBan(newBan)
    setBorderColor(cardBorderColor("ban"))
  }

  const handleWarning = () => {
    const newWarning = true
    updateVolunteerWarning(id, newWarning);

    setWarning(newWarning)
    setBorderColor(cardBorderColor("warning"))
  }


  //functions from props: reverse data flow
  const receiveWarningData = () => { handleWarning() }
  const receiveBanData = () => { handleBan() }
  const newRatingToApplyInRatingDetails = () => {
    setRefetchAndRemountRatingDetails(refetchAndRemountRatingDetails + 1)
    console.log("🚀 ~ newRatingToApplyInRatingDetails ~ ")
    //NB: then pass to props refetchAndRemountRatingDetails
  }

  return (
    <Card className={`w-full max-w-[26rem] shadow-lg border-2 break-words h-full ${borderColor} `}>
      <div className="flex justify-center mt-3">
        <img
          src={volunteer.profilePicture}
          className="rounded-full object-cover aspect-square p-4"
          alt="ui/ux review check"
        />
      </div>
      <CardBody>
        <Typography
          variant="h5"
          color="blue-gray"
          className="font-medium"
        >
          {`${volunteer.firstname} ${volunteer.lastname}`}
        </Typography>

        <Typography color="gray">
          {volunteer.email}
        </Typography>
        <Typography color="gray">
          {volunteer.phone}
        </Typography>
        <div className="flex justify-center">
          {/* Rating Component is inside the popover component */}
          {/* <RatingVolunteerProfile /> */}
          <RatingDetails id={id} countRatingApplied={refetchAndRemountRatingDetails} />
        </div>
        {/* <p>warning: {String(warning)}, ban: {String(ban)}</p> */}
      </CardBody>
      <CardFooter className="group flex place-content-end mt-auto gap-3">
        <PastEventsModal volunteerId={id} newRatingApplied={newRatingToApplyInRatingDetails} />
        <WarningConfirmation warningValue={warning} banValue={ban} sendToVolunteerCard={receiveWarningData} />
        <BanConfirmation banValue={ban} sendToVolunteerCard={receiveBanData} />
      </CardFooter>
    </Card>
  );
};


