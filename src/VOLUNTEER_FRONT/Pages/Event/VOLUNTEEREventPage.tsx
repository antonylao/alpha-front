import { useContext, useEffect, useState } from "react"
import { getEvents, getUpcomingEvents } from "../../../services/api/events"

import { VolunteerDescriptionEventPageCard } from "../../Components/CardEvent/VOLUNTEERDescriptionEventPageCard"
import { EventFilter } from "../../Components/EventFilter/EventFilter"
import VolunteerSearchBarEvent from "../../Components/SearchBar/SearchBar"
import { normalizeString, stringToRegExp } from "../../../services/utils/Utils"
import { useQuery } from "@tanstack/react-query"
import { VolunteerEventCard } from "../../Components/CardEvent/VOLUNTEEREventCard"
import VolunteerEventTypesToggledContext from "../../../hooks/contexts/volunteerEventTypesToggled.context"
import { EventType } from "../../../services/utils/BackendEnums"
import { EnumUtils } from "../../../services/utils/EnumUtils"
import { ENABLE_LOGS } from "../../../services/utils/Logs"

const logs = false

export function VolunteerEventPage() {
  const [filteredEvents, setFilteredEvents] = useState<any>([])
  const [searchBarValue, setSearchBarValue] = useState<any>("")
  const [useEffectFirstCall, setUseEffectFirstCall] = useState<any>(true)

  const { eventTypesToggled, updateEventTypesToggled } = useContext(VolunteerEventTypesToggledContext)

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: [`allUpcomingEvents`],
    queryFn: () => getUpcomingEvents(),
  })

  // if (logs && ENABLE_LOGS) {console.log("🚀 ~ VolunteerEventPage ~ data:", data)}  

  // DEMO change
  //
  //const eventTypes = [EnumUtils.getKey(EventType.CONCERT), EnumUtils.getKey(EventType.STANDUP), EnumUtils.getKey(EventType.THEATRE)]
  //const eventTypes = Object.keys(EventType).filter((key) => isNaN(key))


  //original
  const eventTypes = [...new Set<string>(data?.map((event: any) => { return event.type }))]
  if (logs && ENABLE_LOGS) { console.log(String.fromCodePoint(0x1F516) + " VOLUNTEEREventPage.tsx ~ eventTypes: ") }
  if (logs && ENABLE_LOGS) { console.log(eventTypes) }


  useEffect(() => {
    if (isSuccess && useEffectFirstCall) {
      setFilteredEvents(data)

      const allEventTypes = new Set<string>(data?.map((event: any) => { return event.type }))
      updateEventTypesToggled(allEventTypes)

      setUseEffectFirstCall(false)
      return;
    }

    if (isSuccess && !useEffectFirstCall) {
      const searchValueNormalized = normalizeString(searchBarValue)

      const searchValRegexp = stringToRegExp(searchValueNormalized);
      setFilteredEvents(
        data?.filter((event: any) => {

          return (
            event.title.match(searchValRegexp) && eventTypesToggled.has(event.type)
          );
        })
      );
    }
  }, [isSuccess, eventTypesToggled, searchBarValue])

  const receiveSearchBarData = (value: string) => {
    setSearchBarValue(value)
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération de la liste complète des événements</div>;
  return (
    <>
      <VolunteerDescriptionEventPageCard types={eventTypes} />
      <div className="pb-2"></div>
      <div className="flex justify-between gap-4">
        <EventFilter eventTypes={eventTypes} />
        <VolunteerSearchBarEvent sendToEventPage={receiveSearchBarData} />
      </div>
      <div className="pb-3"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch ">
        {filteredEvents.map((event: any) => (
          <div key={event.id}>
            <VolunteerEventCard data={event} />
          </div>
        ))}
      </div>
    </>
  )
}  
