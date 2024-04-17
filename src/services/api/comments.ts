import axios from "axios";
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getComments() {
    try {
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/comments");
        console.log(data)
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}

export async function getCommentsV2() {
    try {
        const { data } = await api.get("organiser/comments");
        console.log("🚀 ~ getCommentsV2 ~ data:", data)
        console.log(data)
        return data.comments;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}

export async function getCommentById(id: number) {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }

}