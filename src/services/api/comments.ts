import axios from "axios";

export async function getComments() {
    const {data} = await axios.get("https://jsonplaceholder.typicode.com/comments");
    return(data)
}
