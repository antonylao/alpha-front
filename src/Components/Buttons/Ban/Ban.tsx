import { FaBan } from "react-icons/fa"; 

export function BanButton(props:any):any {
  const {onClick} = props
  
  return (
    <>
    <button onClick={onClick}>
      <FaBan />  
    </button>
    </>
  )
}