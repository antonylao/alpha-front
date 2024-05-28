import { RiPencilFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export function Edit({eventId}) {
  return (
    <>
    <Link to={`/edit-event/${eventId}`}>
      <RiPencilFill />
      </Link>
    </>
  );
}
