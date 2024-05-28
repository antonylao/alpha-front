import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { WarningButton } from "../../../../../Components/Buttons/Warning/Warning";

export function TaskApplyCancelConfirmation(props: any) {

  const { ids, validated } = props

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(!open);
  }

  const handleValidate = () => {
    validated(ids)

    setOpen(!open);
  }
  return (
    <>
      <Button onClick={handleOpen}>Annuler</Button>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Êtes-vous sûr de vouloir annuler votre participation ?</DialogHeader>

        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Non</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleValidate}>
            <span>Oui</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}