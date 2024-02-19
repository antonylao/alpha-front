import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { BanButton } from "../../Buttons/Ban/Ban";
 
export function BanConfirmation(props:any) {
  const {banValue, sendToVolunteerCard} = props

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    if (banValue === true) {
      return;
    }

    setOpen(!open);
  }

  const handleValidate = () => {
    //ban value should be false because of the handleOpen condition
    sendToVolunteerCard(!banValue)

    setOpen(!open);
  }
  return (
    <>
      <BanButton onClick={handleOpen} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Êtes-vous sûr de vouloir effectuer un ban sur ce bénévole ?</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleValidate}>
            <span>Valider</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}