import axios from "axios"
import { useApi } from "../../hooks/useApi";
import { fakerEventsAssigned } from "../../Pages/VolunteerPage/fakerEventsAssigned";

const api = useApi();

export async function getEventsAssignedByVolunteerId(id: number) {
  try {
    //get data from tables volunteer_assignments and events
    // const { data } = await api.get("/")
    // return data;

    //in VolunteerPage: component RatingDetails and PastEventsModal
    return fakerEventsAssigned.datas.filter((obj) => obj.user_id === id)
  } catch (err) {
    console.log(err)
  }
}

export async function updateVolunteerAssignmentRating(ids, newVal) {
  const assignment = await fakerEventsAssigned.datas.filter((obj) => obj.user_id === ids.volunteer_id && obj.event_id === ids.event_id && obj.task_id === ids.task_id)[0]
  assignment.volunteer_assignment_rating = newVal;
  return assignment;
}