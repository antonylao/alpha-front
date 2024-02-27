import { createContext, useState } from 'react';

const VolunteerEventTypesToggledContext = createContext<any>({
  eventTypesToggled: [],
  updateEventTypesToggled: () => { },
})

export function VolunteerEventTypesToggledProvider({ children }: any) {
  const [eventTypesToggled, setEventTypesToggled] = useState<Set<string>>(new Set<string>());

  function updateEventTypesToggled(eventTypesCopy: Set<string>) {
    setEventTypesToggled(eventTypesCopy)
  }

  return (
    <VolunteerEventTypesToggledContext.Provider value={{ eventTypesToggled, updateEventTypesToggled }}>
      {children}
    </VolunteerEventTypesToggledContext.Provider>
  )
}

export default VolunteerEventTypesToggledContext;