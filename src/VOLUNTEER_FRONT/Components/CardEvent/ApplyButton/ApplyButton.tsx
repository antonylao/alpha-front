import { Button } from "@material-tailwind/react";
import { IoEnter } from "react-icons/io5";

export function ApplyButton({ onClick }: any) {
  return (
    <>
      <Button onClick={onClick}>
        <IoEnter />
      </Button>
    </>
  )
}