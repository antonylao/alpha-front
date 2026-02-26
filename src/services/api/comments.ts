import axios from "axios";
import { useApi } from "../../hooks/useApi";
import { ENABLE_LOGS } from "../utils/Logs";
const api = useApi();
const logs = true

export async function getComments() {
  try {
    const { data } = await axios.get("http://jsonplaceholder.typicode.com/comments");
    // if (logs && ENABLE_LOGS) {console.log(data)}  
    return data;
  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log("ERROR") }
    if (logs && ENABLE_LOGS) { console.log(err) }
  }
}

export async function getCommentsV2() {
  try {
    const { data } = await api.get("api/organiser/comments");
    if (logs && ENABLE_LOGS) { console.log("🚀 ~ getCommentsV2 ~ data:", data.datas) }
    // if (logs && ENABLE_LOGS) {console.log(data)}  
    return data.datas;
  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log("ERROR") }
    if (logs && ENABLE_LOGS) { console.log(err) }
  }
}

export async function getCommentById(id: number) {
  try {
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments/${id}`);
    return data;
  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log("ERROR") }
    if (logs && ENABLE_LOGS) { console.log(err) }
  }

}
