import { MdEventNote } from "react-icons/md"; //event icon

export function PastEventsButton(props:any):any {
  const {onClick} = props
  
  return (
    <>
    <button onClick={onClick}>
      <MdEventNote />   
    </button>
    </>
  )
}