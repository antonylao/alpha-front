import { parse } from "@formkit/tempo";
import { useApi } from "../../hooks/useApi";
import { fakerEvents } from "../../VOLUNTEER_FRONT/Pages/Event/fakerEvents";
import { RoutesBack } from "../utils/RoutesBackUtils";
import { ENABLE_LOGS } from "../utils/Logs";

const api = useApi();
const logs = true

export async function getEvents() {
  try {
    // const { data } = await api.get("posts");
    // return data;

    //in VOLUNTEER: Event page
    return fakerEvents.datas

  } catch (err) {
    if (logs) {
      if (logs && ENABLE_LOGS) { console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getEvents: ") }
      if (logs && ENABLE_LOGS) { console.log("ERROR") }
      if (logs && ENABLE_LOGS) { console.log(err) }
    }
  }
}

export async function getUpcomingEvents() {
  try {
    //const { data } = await api.get(RoutesBack.EventController.getAllUpcomingEvents);
    // if (logs && ENABLE_LOGS) {console.log("🚀 ~ getUpcomingEvents ~ datas:", data.datas)}  

    //return data.datas;

    //faker: in VOLUNTEER: Event page
    return fakerEvents.datas.filter((obj) => parse(obj.startOn, "YYYY-MM-DD HH:MM:SS") < new Date())

  } catch (err) {
    if (logs) {
      if (logs && ENABLE_LOGS) { console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getUpcomingEvents: ") }
      if (logs && ENABLE_LOGS) { console.log("ERROR") }
      if (logs && ENABLE_LOGS) { console.log(err) }
    }
  }
}

export async function getFinishedEvents() {
  try {
    // const { data } = await api.get("posts");
    // return data;

    //in VOLUNTEER: Event page
    return fakerEvents.datas.filter((obj) => parse(obj.start_on, "YYYY-MM-DD HH:MM:SS") < new Date())

  } catch (err) {
    if (logs) {
      if (logs && ENABLE_LOGS) { console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getFinishedEvents: ") }
      if (logs && ENABLE_LOGS) { console.log("ERROR") }
      if (logs && ENABLE_LOGS) { console.log(err) }
    }
  }
}


export async function getEventById(id: number) {
  try {
    const { data } = await api.get(`posts/${id}`);
    return data;
  } catch (err) {
    if (logs) {
      if (logs && ENABLE_LOGS) { console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getEventById: ") }
      if (logs && ENABLE_LOGS) { console.log("ERROR") }
      if (logs && ENABLE_LOGS) { console.log(err) }
    }
  }
}
