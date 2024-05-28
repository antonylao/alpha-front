import { LiaComment } from "react-icons/lia";

export function CommentButton({ onClick }) {
  return (
    <button onClick={onClick}>
      <LiaComment />
    </button>
  )
}