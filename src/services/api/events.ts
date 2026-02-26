import { parse } from "@formkit/tempo";
import { useApi } from "../../hooks/useApi";
import { fakerEvents } from "../../VOLUNTEER_FRONT/Pages/Event/fakerEvents";
import { RoutesBack } from "../utils/RoutesBackUtils";
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
      console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getEvents: ")
      console.log("ERROR")
      console.log(err)
    }
  }
}

export async function getUpcomingEvents() {
  try {
    const { data } = await api.get(RoutesBack.EventController.getAllUpcomingEvents);
    // console.log("🚀 ~ getUpcomingEvents ~ datas:", data.datas)

    //return data.datas;

    //faker: in VOLUNTEER: Event page
    return fakerEvents.datas.filter((obj) => parse(obj.startOn, "YYYY-MM-DD HH:MM:SS") < new Date())

  } catch (err) {
    if (logs) {
      console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getUpcomingEvents: ")
      console.log("ERROR")
      console.log(err)
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
      console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getFinishedEvents: ")
      console.log("ERROR")
      console.log(err)
    }
  }
}


export async function getEventById(id: number) {
  try {
    const { data } = await api.get(`posts/${id}`);
    return data;
  } catch (err) {
    if (logs) {
      console.log(String.fromCodePoint(0x1F516) + " events.ts ~ getEventById: ")
      console.log("ERROR")
      console.log(err)
    }
  }
}
