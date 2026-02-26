import { useApi } from "../../hooks/useApi";
import { fakerTasks } from "../../Pages/CommentPage/fakerTasks";
import { ENABLE_LOGS } from "../utils/Logs";
import { RoutesBack } from "../utils/RoutesBackUtils";

const api = useApi();
const logs = true

export async function getTasksV2() {
  try {
    //const { data } = await api.get(RoutesBack.TaskController.getAllTasksV2)
    // return data.datas;

    //in VolunteerPage
    return fakerTasks.datas
  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log(err) }
  }
}
