import { useContext, useEffect, useState } from "react"
import { getEvents } from "../../../services/api/events"

import { VolunteerDescriptionEventPageCard } from "../../Components/CardEvent/VOLUNTEERDescriptionEventPageCard"
import { EventFilter } from "../../Components/EventFilter/EventFilter"
import VolunteerSearchBarEvent from "../../Components/SearchBar/SearchBar"
import { normalizeString, stringToRegExp } from "../../../services/utils/Utils"
import { useQuery } from "@tanstack/react-query"
import { VolunteerEventCard } from "../../Components/CardEvent/VOLUNTEEREventCard"
import VolunteerEventTypesToggledContext from "../../../hooks/contexts/volunteerEventTypesToggled.context"


export function VolunteerEventPage() {
  const [filteredEvents, setFilteredEvents] = useState<any>([])
  const [searchBarValue, setSearchBarValue] = useState<any>("")
  const [useEffectFirstCall, setUseEffectFirstCall] = useState<any>(true)

  const { eventTypesToggled, updateEventTypesToggled } = useContext(VolunteerEventTypesToggledContext)

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["completeListEvents"],
    queryFn: getEvents,
  })

  const eventTypes = [...new Set<string>(data?.map((event: any) => { return event.type }))]

  useEffect(() => {
    if (isSuccess && useEffectFirstCall) {
      setFilteredEvents(data)
      // updateEventTypesToggled([...new Set<string>(data.map((event: any) => { return event.type }))])

      const allEventTypes = new Set<string>(data.map((event: any) => { return event.type }))
      // console.log(allEventTypes)
      updateEventTypesToggled(allEventTypes)

      setUseEffectFirstCall(false)
      return;
    }

    if (isSuccess && !useEffectFirstCall) {
      const searchValueNormalized = normalizeString(searchBarValue)

      const searchValRegexp = stringToRegExp(searchValueNormalized);
      console.log(eventTypesToggled)
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
    // value = normalizeString(value)

    // const searchValRegexp = stringToRegExp(value);

    // setFilteredEvents(
    //   data.filter((event: any) => {

    //     return (
    //       event.title.match(searchValRegexp) && eventTypesToggled.includes(event.type)
    //     );
    //   })
    // );
  }

  const receiveCheckBoxesInfo = (value: Array<any>) => {
    console.log(value)
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération de la liste complète des événements</div>;
  return (
    <>
      <div className="flex justify-between gap-4">
        <EventFilter eventTypes={eventTypes} />
        <VolunteerSearchBarEvent sendToEventPage={receiveSearchBarData} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        <VolunteerDescriptionEventPageCard types={eventTypes} />
        {filteredEvents.map((event: any) => (
          <div key={event.id}>
            <VolunteerEventCard data={event} />
          </div>
        ))}
      </div>
    </>
  )
} 