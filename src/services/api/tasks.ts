import { fakerTasks } from "../../Pages/VolunteerPage/fakerTasks"
import { useApi } from "../../hooks/useApi";
import { RoutesBack } from "../utils/RoutesBackUtils";

const api = useApi();

export async function getTasks() {
  try {
    const { data } = await api.get(RoutesBack.TaskController.getAllTasks)
    return data.datas;

    //in VolunteerPage
    // return fakerTasks.datas
  } catch (err) {
    console.log(err)
  }
}
