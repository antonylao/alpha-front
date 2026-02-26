import axios from "axios"
import { useApi } from "../../hooks/useApi";
import { fakerEventsAssigned } from "../../Pages/VolunteerPage/fakerEventsAssigned";
import { fakerVolunteerAssignments } from "../../VOLUNTEER_FRONT/Pages/Event/fakerVolunteerAssignments";
import { fakerVolunteerAssignmentsComments } from "../../VOLUNTEER_FRONT/Pages/EventsAwaitingComment/fakerVolunteerAssignmentsComments";
import { RoutesBack } from "../utils/RoutesBackUtils";
import { VolunteerAssignmentStatus } from "../utils/BackendEnums";
import { ENABLE_LOGS } from "../utils/Logs";

const api = useApi();
const logs = true

export async function getEventsAssignedByVolunteerId(id: number) {
  try {
    const path = RoutesBack.VolunteerAssignmentController.readPastEventsInfoForOrganiserVolunteerCard.replace(":volunteerId", String(id))
    const { data } = await api.get(path)
    return data.datas

    //*with faker: in VolunteerPage: component RatingDetails and PastEventsModal
    // return fakerEventsAssigned.datas.filter((obj) => obj.volunteer_id === id)
  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log(err) }
  }
}



// export async function updateVolunteerAssignmentRating(ids, newVal) {
//newVal is a number
export async function updateVolunteerAssignmentRating({ ids, newVal }: any) {
  const volunteerId = ids.volunteerId
  const taskId = ids.taskId
  const eventId = ids.eventId

  const path = RoutesBack.VolunteerAssignmentController.updateRating
    .replace(":volunteerId", volunteerId).replace(":eventId", eventId).replace(":taskId", taskId)

  const { data } = await api.patch(path, { rating: newVal })
  if (logs && ENABLE_LOGS) { console.log("🚀 ~ updateVolunteerAssignmentRating ~ data.datas:", data.datas) }
  return data.datas

  //*with faker: in VolunteerPage: component PastEvents
  // const data = fakerEventsAssigned.datas.filter((obj) => obj.volunteer_id === ids.volunteer_id && obj.event_id === ids.event_id && obj.task_id === ids.task_id)[0]
  // data.volunteer_assignment_rating = newVal;
  // return data;
};


export async function getVolunteerAssignmentInfoForMyEventsPage() {
  try {
    //const { data } = await api.get(RoutesBack.VolunteerAssignmentController.getFinishedAssignmentsInfo);
    //return data.datas

    //* with faker: in VOLUNTEER eventsToCommentOn page
    return fakerVolunteerAssignmentsComments.datas


  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log("ERROR") }
    if (logs && ENABLE_LOGS) { console.log(err) }
  }
}

export async function createPendingVolunteerAssignment({ ids }) {
  try {
    const volunteerId = ids.volunteerId
    const eventId = ids.eventId
    const taskId = ids.taskId

    const path = RoutesBack.VolunteerAssignmentController.createPendingVolunterAssignment
      .replace(":eventId", eventId)
      .replace(":taskId", taskId)

    const { data } = await api.post(path)
    if (logs && ENABLE_LOGS) { console.log("🚀 ~ createPendingVolunteerAssignment ~ data:", data.datas) }
    return data.datas
  } catch (error) {
    throw error
  }
}

export async function updateVolunteerAssignmentComment({ ids, newVal }: any) {
  const volunteerId = ids.volunteerId
  const eventId = ids.eventId
  const taskId = ids.taskId

  // api/volunteerCheck/event/:eventId/task/:taskId/comment
  const path = RoutesBack.VolunteerAssignmentController.updateComment.replace(":eventId", eventId).replace(":taskId", taskId)
  const { data } = await api.patch(path, { comment: newVal })
  return data.datas

  //* with faker: in VOLUNTEER eventToCommentOn page: component ModalComment
  // const data = fakerVolunteerAssignmentsComments.datas.filter((obj) => obj.volunteer_id === volunteerId && obj.event_id === eventId && obj.task_id === taskId)[0]
  // if (logs && ENABLE_LOGS) {console.log(data)}  
  // data.comment = newVal

  // return data
}


export async function updateVolunteerAssignmentStatus({ ids, newVal }: any) {
  if (logs && ENABLE_LOGS) { console.log("🚀 ~ updateVolunteerAssignmentStatus ~ ids:", ids) }
  const volunteerId = ids.volunteer_id
  const eventId = ids.eventId
  const taskId = ids.taskId

  let path;
  switch (newVal) {
    case VolunteerAssignmentStatus.CANCELED:
      path = RoutesBack.VolunteerAssignmentController.cancelAssignment
        .replace(":eventId", eventId)
        .replace(":taskId", taskId)
      break;
    default:
      if (logs && ENABLE_LOGS) { console.log("🚀 ~ updateVolunteerAssignmentStatus ~ error ~ fn updateVolunteerAssignmentStatus: path doesnt exist:") }
      throw new Error("fn updateVolunteerAssignmentStatus: path doesnt exist")
      break;
  }
  if (logs && ENABLE_LOGS) { console.log("🚀 ~ updateVolunteerAssignmentStatus ~ path:", path) }

  const { data } = await api.patch(path)
  return data.datas

  // // in VOLUNTEER event index page: component ModaleTaskList
  // //faker equivalent: set 'volunteer_assignment_status' to 'pending'
  // const data = fakerVolunteerAssignments.datas.filter((obj) => obj.volunteer_id === volunteerId && obj.event_id === eventId && obj.task_id === taskId)[0]
  // data.volunteer_assignment_status = newVal

  // return data
}

function deleteVolunteerAssignmentRow(ids: any) {
  const volunteerId = ids.volunteer_id
  const eventId = ids.event_id
  const taskId = ids.task_id
  // const { data } = await api.delete(`users/${volunteerId}`);

  // in VOLUNTEER event index page: component Modale Task List
  //faker equivalent: set 'volunteer_assignment_status' to 'undefined'
  const data = fakerVolunteerAssignments.datas.filter((obj) => obj.userId === volunteerId && obj.eventId === eventId && obj.taskId === taskId)[0]
  data.volunteerAssignmentStatus

  return data;
}
