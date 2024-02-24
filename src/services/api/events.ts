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

export async function getEventById(id: number) {
    try {
        const { data } = await api.get(`posts/${id}`);
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}