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
    return fakerEventsAssigned.datas.filter((obj) => obj.volunteer_id === id)
  } catch (err) {
    console.log(err)
  }
}

// export async function updateVolunteerAssignmentRating(ids, newVal) {
export async function updateVolunteerAssignmentRating({ ids, newVal }) {
  // const data = await api.get("/users/1")
  const data = await api.post(`users`, { rating: newVal })

  //API PATCH request on table volunteer_assignment, organiser_rating column, on the row including the ids specified

  // in VolunteerPage: component PastEvents
  // const data = fakerEventsAssigned.datas.filter((obj) => obj.volunteer_id === ids.volunteer_id && obj.event_id === ids.event_id && obj.task_id === ids.task_id)[0]
  // console.log("in update function");
  // console.log("ids", ids)
  // console.log("faker elts ids")

  // fakerEventsAssigned.datas.forEach((obj) => console.log(obj.volunteer_id, obj.event_id, obj.task_id))
  // data.volunteer_assignment_rating = newVal;
  return data;
};