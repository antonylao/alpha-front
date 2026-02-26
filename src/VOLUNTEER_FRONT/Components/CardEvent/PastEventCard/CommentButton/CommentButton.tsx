import { LiaComment } from "react-icons/lia";

const logs = false

export function CommentButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <LiaComment />
    </button>
  )
}
