import { RoutesBack } from "../utils/RoutesBackUtils";
import { useApi } from "../../hooks/useApi";
import { getConnectedUserId } from "../utils/JWTUtils";
import { fakerVolunteerAssignments } from "../../VOLUNTEER_FRONT/Pages/Event/fakerVolunteerAssignments";

const api = useApi();


export async function getTasksInfoForVolunteerEventIndexPage(eventId: number) {
  //DEMO change
  //const path = RoutesBack.EventTaskController.getUpcomingEventInfosForTaskApply.replace(":eventId", String(eventId))
  //const { data } = await api.get(path)
  //return data.datas
  //in VOLUNTEER event index page: component ModaleTaskList
  //test
  return fakerVolunteerAssignments.datas.filter((obj) => obj.userId === 1 && obj.eventId === eventId)
}
