import { useEffect, useState } from "react"
import { getEvents } from "../../../services/api/events"
import { VolunteerEventCard } from "../../Components/CardEvent/VolunteerEventCard"
import { VolunteerDescriptionEventPageCard } from "../../Components/CardEvent/VOLUNTEERDescriptionEventPageCard"


export function VolunteerEventPage() {
  const [allEvents, setAllEvents] = useState<any>([])
  const [events, setEvents] = useState<any>([])

  const eventTypes = [...new Set(allEvents.map((event) => { return event.type }))]

  useEffect(() => {
    async function loadEvents() {
      const result = await getEvents();
      setAllEvents(result)
      setEvents(result)
    }
    console.log("loadcomment", loadEvents())
    loadEvents();
  }, [])
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <VolunteerDescriptionEventPageCard types={eventTypes} />
        {events.map((event: any) => (
          <div key={event.id}>
            <VolunteerEventCard data={event} />
          </div>
        ))}
      </div>
    </>
  )
} 