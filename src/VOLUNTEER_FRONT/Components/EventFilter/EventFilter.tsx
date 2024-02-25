import { Select } from "@material-tailwind/react"
import { CheckboxesEvents } from "./CheckboxesEvents"
import { useState } from "react";

export function EventFilter(props: any) {
  const { eventTypes } = props

  const handleChange = () => {

  }
  return (
    <>
      <div className='w-72 filter-input'>
        <Select label="Filtrer par type d'événements" onChange={handleChange} >
          <CheckboxesEvents eventTypes={eventTypes} sendToEventFilter={'function'} />
        </Select>
      </div>
    </>
  )
}