import axios from "axios"
import { useApi } from "../../hooks/useApi";
import { fakerEventsAssigned } from "../../Pages/VolunteerPage/fakerEventsAssigned";

const api = useApi();

export async function getEventsAssignedByVolunteerId(id: number) {
  try {
    //get data for volunteer_assignments and events
    // const { data } = await api.get("/")
    // return data;

    //in VolunteerPage: component RatingDetails and PastEventsModal
    // console.log(fakerEventsAssigned.datas)
    return fakerEventsAssigned.datas.filter((obj) => obj.user_id === id)
  } catch (err) {
    console.log(err)
  }
}