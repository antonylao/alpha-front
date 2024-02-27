import { MdOutlinePendingActions } from "react-icons/md";

export function AssignVolonteersButton(props:any):any {
  const {onClick} = props
  
  return (
    <>
    <button onClick={onClick}>
        <MdOutlinePendingActions size='20' />
    </button>
    </>
  )
}