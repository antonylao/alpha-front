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
  const { id } = props

  const [volunteer, setVolunteer] = useState<any>({})
  const [warning, setWarning] = useState<boolean>(false)
  const [ban, setBan] = useState<boolean>(false)
  const [borderColor, setBorderColor] = useState<string>(cardBorderColor(''))
  const [refetchAndRemountRatingDetails, setRefetchAndRemountRatingDetails] = useState<number>(0)

  //performance issue: data is fetched again (already fetched the complete list on the volunteer page)
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

  const receiveWarningData = () => {
    handleWarning()
  }

  const receiveBanData = () => {
    handleBan()
  }

  const newRatingToApplyInRatingDetails = () => {
    setRefetchAndRemountRatingDetails(refetchAndRemountRatingDetails + 1)
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération du bénévole {id}</div>;

  return (
    <Card className={`w-full max-w-[26rem] shadow-lg border-2 ${borderColor} `}>
      <div className="flex justify-center mt-3">
        <img
          src={volunteer.picture}
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
        <p>warning: {String(warning)}, ban: {String(ban)}</p>
      </CardBody>
      <CardFooter className="group mt-8 inline-flex flex-row-reverse flex-wrap items-center gap-3">
        {/* buttons are inside the modal components */}
        {/* <BanButton />
        <WarningButton />
        <PastEventsButton /> */}
        <BanConfirmation banValue={ban} sendToVolunteerCard={receiveBanData} />
        <WarningConfirmation warningValue={warning} banValue={ban} sendToVolunteerCard={receiveWarningData} />
        <PastEventsModal id={id} newRatingApplied={newRatingToApplyInRatingDetails} />
      </CardFooter>
    </Card>
  );
};


