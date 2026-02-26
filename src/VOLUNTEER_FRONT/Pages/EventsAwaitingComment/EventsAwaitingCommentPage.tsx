/* TESTS
1: change back function to get volunteerId from token, not from path: DONE
2: display infos on card (component PastEventCard): DONE
3: make button work (component PastEventCard):
3.1: if comment applied, display not editable textarea: DONE
3.2: if comment not applied, display editable textarea: DONE
3.2.1: when clicking submit button,  change card color: DONE
3.2.2: when clicking submit button, change to not editable textarea and display comment content : DONE
*/

import { useQuery } from "@tanstack/react-query";
import { getVolunteerAssignmentInfoForMyEventsPage } from "../../../services/api/volunteer_assignments";
import { useEffect, useState } from "react";
import { PastEventCard } from "../../Components/CardEvent/PastEventCard/PastEventCard";
import { VolunteerDescriptionEventAwaitingCommentPageCard } from "../../Components/CardEvent/VOLUNTEERDescriptionEventAwaitingCommentPageCard";
import { ENABLE_LOGS } from "../../../services/utils/Logs";

const logs = false

export function EventsAwaitingCommentPage() {

  const [finishedEvents, setFinishedEvents] = useState<any>([])
  if (logs && ENABLE_LOGS) { console.log("🚀 ~ EventsAwaitingCommentPage ~ finishedEvents:", finishedEvents) }

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`FinishedEvents`],
    queryFn: () => getVolunteerAssignmentInfoForMyEventsPage(),
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
      <VolunteerDescriptionEventAwaitingCommentPageCard />
      <div className="pb-2"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {finishedEvents.map((event: any) => (
          <div key={event.eventId}>
            <PastEventCard data={event} />
          </div>
        ))}
      </div>
    </>
  )
}
