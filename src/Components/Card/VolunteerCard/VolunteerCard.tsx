import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
// import { BanButton } from "../../Buttons/Ban/Ban";
// import { PastEventsButton } from "../../Buttons/PastEvents/PastEvents";
// import { WarningButton } from "../../Buttons/Warning/Warning";
// import { RatingVolunteerProfile } from "../../Rating/RatingVolunteerProfile";
import { BanConfirmation } from "../../Modales/BanConfirmation/BanConfirmation";
import { WarningConfirmation } from "../../Modales/WarningConfirmation/WarningConfirmation";
import { useEffect, useState } from "react";
import { RatingDetails } from "../../PopUp/RatingDetails";
import { PastEventsModal } from "../../Modales/PastEvents/PastEvents";
import { fakerVolunteers } from "../../../Pages/VolunteerPage/fakerVolunteers";
import { useQuery } from "@tanstack/react-query";
// import { getVolunteerById } from "../../../services/api/volunteers";

export function VolunteerCard(props: any) {
  const { id } = props

  const [volunteer, setVolunteer] = useState<any>({})
  const [warning, setWarning] = useState<boolean>(false)
  const [ban, setBan] = useState<boolean>(false)
  const [borderColor, setBorderColor] = useState<string>("border-transparent")

  //minor issue: data is fetched again (already fetched the complete list on the volunteer page)
  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`volunteer_${id}`],
    // queryFn: getVolunteerById(id),
    queryFn: () => { return fakerVolunteers.datas.filter((obj) => obj.id === id)[0] },
  })

  useEffect(() => {
    if (isSuccess) {
      setVolunteer(data)
      if (data["ban"] === 'true') {
        handleBan()
      } else if (data["warning"] === 'true') {
        handleWarning()
      }
    }
  }, [isSuccess])

  const handleBan = () => {
    //modify BDD: ban value of volunteer by its id: set to true
    // updateVolunteerBan(volunteerId, newWarning);

    fakerVolunteers.datas.filter((obj) => obj.id === id)[0].ban = "true"

    setBan(!ban)
    setBorderColor("border-red-700")
  }

  const handleWarning = () => {
    //modify BDD: warning value of volunteer by its id: set to true
    // updateVolunteerWarning(volunteerId, newWarning);

    fakerVolunteers.datas.filter((obj) => obj.id === id)[0].warning = "true"

    setWarning(!warning)
    setBorderColor("border-yellow-400")
  }
  const receiveWarningData = () => {
    handleWarning()
  }

  const receiveBanData = () => {
    handleBan()
  }
  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération du bénévole {id}</div>;

  return (
    <Card className={`w-full max-w-[26rem] shadow-lg border-2 ${borderColor} `}>
      <CardHeader floated={false} color="blue-gray">
        <img
          src={volunteer.picture}
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
      </CardHeader>
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
          <RatingDetails id={id} />
        </div>
        <p>warning: {String(warning)}, ban: {String(ban)}</p>
      </CardBody>
      <CardFooter className="group mt-8 inline-flex flex-row-reverse flex-wrap items-center gap-3">
        {/* buttons are inside the modal components */}
        {/* <BanButton /> */}
        {/* <WarningButton /> */}
        {/* <PastEventsButton /> */}
        <BanConfirmation banValue={ban} sendToVolunteerCard={receiveBanData} />
        <WarningConfirmation warningValue={warning} banValue={ban} sendToVolunteerCard={receiveWarningData} />
        <PastEventsModal id={id} />
      </CardFooter>
    </Card>
  );
};
