import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
// import { BanButton } from "../../Buttons/Ban/Ban";
import { PastEventsButton } from "../../Buttons/PastEvents/PastEvents";
// import { WarningButton } from "../../Buttons/Warning/Warning";
import { RatingVolunteerProfile } from "../../Rating/RatingVolunteerProfile";
import { BanConfirmation } from "../../Modales/BanConfirmation/BanConfirmation";
import { WarningConfirmation } from "../../Modales/WarningConfirmation/WarningConfirmation";

export function VolunteerCard() {
  return (
    <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
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
            FIRSTNAME LASTNAME
          </Typography>

        <Typography color="gray">
          Adresse Mail
        </Typography>
        <Typography color="gray">
          Numéro de téléphone
        </Typography>
        <div className="flex justify-center">
          <RatingVolunteerProfile />
        </div>
      </CardBody>
      <CardFooter className="group mt-8 inline-flex flex-row-reverse flex-wrap items-center gap-3">
        {/* buttons are inside the modal components */}
        {/* <BanButton /> */}
        {/* <WarningButton /> */}
        <BanConfirmation />
        <WarningConfirmation />
        <PastEventsButton />
      </CardFooter>
    </Card>
  );
};
