// Import du composant Link
import { Link } from 'react-router-dom';
import { IoIosCopy } from "react-icons/io";

export function Duplicate({ eventId }) {
  return (
   
    <Link to={`/duplicate-event/${eventId}`}>
      <IoIosCopy />
    </Link>
  );
}
