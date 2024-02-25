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

export function CheckboxesEvents(props: any) {

  const { eventTypes } = props
  const { eventTypesToggled, updateEventTypesToggled } = useContext(VolunteerEventTypesToggledContext)

  const handleChange = (e) => {
    const checkboxId: string = e.target.id
    const checkBoxValue: boolean = e.target.checked
    console.log(eventTypesToggled)

    const eventTypesToggledCopy = new Set(eventTypesToggled)
    if (checkBoxValue === true) {
      eventTypesToggledCopy.add(checkboxId)
    } else if (checkBoxValue === false) {
      eventTypesToggledCopy.delete(checkboxId)
    }

    updateEventTypesToggled(eventTypesToggledCopy)
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
                  checked={eventTypesToggled.has(eventType)}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography color="blue-gray" className="font-medium">
                {eventType}
              </Typography>
            </label>
          </ListItem>
        ))}
      </List>
    </Card >
  );
}