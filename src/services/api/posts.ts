import axios from "axios";
import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getPosts() {
    try {
        const {data} = await axios.get("http://localhost:3000/organiser/pending_requests");
        console.log(data)
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}

export async function getPostsV2() {
    try {
        const { data } = await api.get("posts");
        console.log(data)
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}

export async function getPostById(id: number) {
    try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return data;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }

}