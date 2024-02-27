import { Button } from "@material-tailwind/react";
import { IoEnter } from "react-icons/io5";

export function ApplyButton({ onClick }: any) {
  return (
    <>
      <button onClick={onClick}>
        <IoEnter />
      </button>
    </>
  )
}