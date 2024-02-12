import { useEffect } from "react";
import { getVolunteers } from "../../services/api/volunteers";

export default function VolunteerPage() {
  useEffect(() => {
    async function loadVolunteers() {
      const volunteers = await getVolunteers();
      return volunteers;
    }

    loadVolunteers
  })

  return (
    <>
    </>
  )
}