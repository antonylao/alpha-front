import {
  Checkbox,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
} from "@material-tailwind/react";
import { useContext, useState } from "react";
import VolunteerEventTypesToggledContext from "../../../hooks/contexts/volunteerEventTypesToggled.context";
import { EventType } from "../../../services/utils/BackendEnums";

export function CheckboxesEvents(props: any) {


  const { eventTypes } = props
  console.log(String.fromCodePoint(0x1F516) + " CheckboxesEvents.tsx ~ eventTypes: ")
  console.log(eventTypes)
  const { eventTypesToggled, updateEventTypesToggled } = useContext(VolunteerEventTypesToggledContext)
  console.log(String.fromCodePoint(0x1F516) + " CheckboxesEvents.tsx ~ eventTypesToggled: ")
  console.log(eventTypesToggled)

  const handleChange = (e) => {
    // DEMO change
    const checkboxId: string = e.target.id
    console.log(String.fromCodePoint(0x1F516) + " CheckboxesEvents.tsx ~ checkboxId: ")
    console.log(checkboxId)
    const checkBoxValue: boolean = e.target.checked
    console.log(String.fromCodePoint(0x1F516) + " CheckboxesEvents.tsx ~ checkBoxValue: ")
    console.log(checkBoxValue)
    // original
    //const checkboxId: string = e.target.id
    //const checkBoxValue: boolean = e.target.checked

    // TEST
    const eventTypesToggledCopy = new Set(eventTypesToggled)
    console.log(String.fromCodePoint(0x1F516) + " CheckboxesEvents.tsx ~ eventTypesToggledCopy: ")
    console.log(eventTypesToggledCopy)
    //const eventTypesToggledCopy = new Set()

    //DEMO change
    if (checkBoxValue === true) {
      eventTypesToggledCopy.add(Number(checkboxId))
    } else if (checkBoxValue === false) {
      eventTypesToggledCopy.delete(Number(checkboxId))
    }
    //original
    /*if (checkBoxValue === true) {
      eventTypesToggledCopy.add(checkboxId)
    } else if (checkBoxValue === false) {
      eventTypesToggledCopy.delete(checkboxId)
    }
    */

    updateEventTypesToggled(eventTypesToggledCopy)
    console.log(String.fromCodePoint(0x1F516) + " CheckboxesEvents.tsx ~ eventTypesToggledCopy: ")
    console.log(eventTypesToggledCopy)
  }
  return (
    <Card>
      <List>
        {eventTypes.map((eventType: string, index: number) => (
          <ListItem className="p-0">
            <label
              //change htmlFor
              htmlFor={eventType}
              className="flex w-full cursor-pointer items-center px-3 py-2"
            >
              <ListItemPrefix className="mr-3">
                <Checkbox
                  //change id
                  id={eventType}
                  onChange={handleChange}
                  ripple={false}
                  // what determines if the case is checked or not
                  checked={eventTypesToggled.has(eventType)}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {EventType[eventType as any]}              </Typography>
            </label>
          </ListItem>
        ))}
      </List>
    </Card >
  );
}
