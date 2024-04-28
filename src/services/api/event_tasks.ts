import { RoutesBack } from "../utils/RoutesBackUtils";
import { useApi } from "../../hooks/useApi";
import { getConnectedUserId } from "../utils/JWTUtils";

const api = useApi();

export async function getTasksInfoForVolunteerEventIndexPage(eventId: number) {
  const path = RoutesBack.EventTaskController.getUpcomingEventInfosForTaskApply.replace(":eventId", String(eventId))

  const { data } = await api.get(path)
  return data.datas
  //in VOLUNTEER event index page: component ModaleTaskList
  // return fakerVolunteerAssignments.datas.filter((obj) => obj.volunteer_id === 1 && obj.event_id === eventId)
}