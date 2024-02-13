import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { WarningButton } from "../../Buttons/Warning/Warning";
 
export function WarningConfirmation() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <WarningButton onClick={handleOpen} />
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Êtes-vous sûr de vouloir effectuer un warning sur ce bénévole ?</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Annuler</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Valider</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}