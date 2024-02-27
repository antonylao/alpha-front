import { useQuery } from "@tanstack/react-query";
import { getVolunteerAssignmentInfoForEventsToCommentOnPage } from "../../../services/api/volunteer_assignments";
import { useEffect, useState } from "react";
import { PastEventCard } from "../../Components/CardEvent/PastEventCard/PastEventCard";

export function EventsAwaitingComment() {

  const [finishedEvents, setFinishedEvents] = useState<any>([])

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`FinishedEvents`],
    queryFn: () => getVolunteerAssignmentInfoForEventsToCommentOnPage(),
  })

  useEffect(() => {
    if (isSuccess) {
      setFinishedEvents(data)
    }
  }, [isSuccess])

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération de la liste des événements terminés.</div>;
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {finishedEvents.map((event: any) => (
          <div key={event.event_id}>
            <PastEventCard data={event} />
          </div>
        ))}
      </div>
    </>
  )
}