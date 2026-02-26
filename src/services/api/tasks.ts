import { useApi } from "../../hooks/useApi";
import { RoutesBack } from "../utils/RoutesBackUtils";

const api = useApi();

export async function getTasksV2() {
  try {
    const { data } = await api.get(RoutesBack.TaskController.getAllTasksV2)
    // return data.datas;

    //in VolunteerPage
    return fakerTasks.datas
  } catch (err) {
    console.log(err)
  }
}
