import { IoWarningOutline } from "react-icons/io5"; // warning icon

export function WarningButton(props:any):any {
  const {onClick} = props
  
  return (
    <>
    <button onClick={onClick}>
      <IoWarningOutline />  
    </button>
    </>
  )
}