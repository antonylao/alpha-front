import { Select } from "@material-tailwind/react"
import { CheckboxesEvents } from "./CheckboxesEvents"

export function EventFilter(props: any) {
  const { eventTypes } = props

  return (
    <>
      <div className='w-72 filter-input'>
        <Select label="Filtrer par type d'événements" >
          <CheckboxesEvents eventTypes={eventTypes} />
        </Select>
      </div>
    </>
  )
}