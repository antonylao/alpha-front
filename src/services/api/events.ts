import { parse } from "@formkit/tempo";
import { useApi } from "../../hooks/useApi";
import { fakerEvents } from "../../VOLUNTEER_FRONT/Pages/Event/fakerEvents";
const api = useApi();


export async function getEvents() {
    try {
        // const { data } = await api.get("posts");
        // return data;

        //in VOLUNTEER: Event page
        return fakerEvents.datas

    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}

export async function getUpcomingEvents() {
    try {
        const { data } = await api.get("event/upcoming");
        console.log("🚀 ~ getUpcomingEvents ~ datas:", data.datas)

        return data.datas;

        //faker: in VOLUNTEER: Event page
        // return fakerEvents.datas.filter((obj) => parse(obj.start_on, "YYYY-MM-DD HH:MM:SS") < new Date())

    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}

export async function getFinishedEvents() {
    try {
        // const { data } = await api.get("posts");
        // return data;

        //in VOLUNTEER: Event page
        return fakerEvents.datas.filter((obj) => parse(obj.start_on, "YYYY-MM-DD HH:MM:SS") < new Date())

    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}


export async function getEventById(id: number) {
    try {
        const { data } = await api.get(`posts/${id}`);
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}