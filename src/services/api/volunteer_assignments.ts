import axios from "axios"
import { useApi } from "../../hooks/useApi";
import { fakerEventsAssigned } from "../../Pages/VolunteerPage/fakerEventsAssigned";
import { fakerVolunteerAssignments } from "../../VOLUNTEER_FRONT/Pages/Event/fakerVolunteerAssignments";
import { fakerVolunteerAssignmentsComments } from "../../VOLUNTEER_FRONT/Pages/EventsAwaitingComment/fakerVolunteerAssignmentsComments";
import { getConnectedUserId } from "../utils/JWTUtils";

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

export async function getTasksInfoForVolunteerEventIndexPage(eventId: number) {
  const { data } = await api.get(`event/upcoming/${eventId}/task`)
  console.log(`🚀 ~ getTasksInfoForVolunteerEventIndexPage (eventId: ${eventId}) ~ data.datas:`, data.datas)
  const connectedUserId = getConnectedUserId()


  const dataFiltered = data.datas.filter((obj) => obj.userId === connectedUserId)
  console.log("🚀 ~ getTasksInfoForVolunteerEventIndexPage ~ dataFiltered:", dataFiltered)
  return dataFiltered;

  //in VOLUNTEER event index page: component ModaleTaskList
  // return fakerVolunteerAssignments.datas.filter((obj) => obj.volunteer_id === 1 && obj.event_id === eventId)
}

// export async function updateVolunteerAssignmentRating(ids, newVal) {
export async function updateVolunteerAssignmentRating({ ids, newVal }: any) {
  //API PATCH request on table volunteer_assignment, organiser_rating column, on the row including the ids specified
  // const data = await api.get("/users/1")
  // const { data } = await api.patch(`users`, { rating: newVal })

  // in VolunteerPage: component PastEvents
  const data = fakerEventsAssigned.datas.filter((obj) => obj.volunteer_id === ids.volunteer_id && obj.event_id === ids.event_id && obj.task_id === ids.task_id)[0]
  data.volunteer_assignment_rating = newVal;
  return data;
};

export async function getVolunteerAssignmentInfoForEventsToCommentOnPage() {
  try {
    // const { data } = await api.get("posts");
    // return data;

    //in VOLUNTEER eventsToCommentOn page
    return fakerVolunteerAssignmentsComments.datas

  } catch (err) {
    console.log("ERROR")
    console.log(err)
  }
}

//! not done
export async function createVolunteerAssignment({ ids, status }) {
  const volunteerId = ids.volunteerId
  const eventId = ids.eventId
  const taskId = ids.taskId

  const { data } = await api.post(`users`, { volunteer_comment: newVal })
}

export async function updateVolunteerAssignmentComment({ ids, newVal }: any) {
  const volunteerId = ids.volunteerId
  const eventId = ids.eventId
  const taskId = ids.taskId
  // const { data } = await api.patch(`users`, { volunteer_comment: newVal })

  // in VOLUNTEER eventToCommentOn page: component ModalComment
  const data = fakerVolunteerAssignmentsComments.datas.filter((obj) => obj.volunteer_id === volunteerId && obj.event_id === eventId && obj.task_id === taskId)[0]
  console.log(data)
  data.comment = newVal

  return data
}


export async function updateVolunteerAssignmentStatus({ ids, newVal }: any) {
  const volunteerId = ids.volunteer_id
  const eventId = ids.event_id
  const taskId = ids.task_id

  // const { data } = await api.patch(`users`, { status: newVal })

  // in VOLUNTEER event index page: component ModaleTaskList
  //faker equivalent: set 'volunteer_assignment_status' to 'pending'
  const data = fakerVolunteerAssignments.datas.filter((obj) => obj.volunteer_id === volunteerId && obj.event_id === eventId && obj.task_id === taskId)[0]
  data.volunteer_assignment_status = newVal

  return data
}

function deleteVolunteerAssignmentRow(ids: any) {
  const volunteerId = ids.volunteer_id
  const eventId = ids.event_id
  const taskId = ids.task_id
  // const { data } = await api.delete(`users/${volunteerId}`);

  // in VOLUNTEER event index page: component Modale Task List
  //faker equivalent: set 'volunteer_assignment_status' to 'undefined'
  const data = fakerVolunteerAssignments.datas.filter((obj) => obj.volunteer_id === volunteerId && obj.event_id === eventId && obj.task_id === taskId)[0]
  data.volunteer_assignment_status

  return data;
}
