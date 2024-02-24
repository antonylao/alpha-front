import { fakerTasks } from "../../Pages/VolunteerPage/fakerTasks"
import { useApi } from "../../hooks/useApi";

const api = useApi();

export async function getTasks() {
  try {
    // const {data} = await api.get("tasks")
    // return data;

    //in VolunteerPage
    return fakerTasks.datas
  } catch (err) {
    console.log(err)
  }
}
