import { useApi } from "../../hooks/useApi";
import { ENABLE_LOGS } from "../utils/Logs";
const api = useApi();
const logs = true

export async function getVolunteerProfile() {
  try {
    const { data } = await api.get("my_profile");

    return data.comments;
  } catch (err) {
    if (logs && ENABLE_LOGS) { console.log("ERROR") }
    if (logs && ENABLE_LOGS) { console.log(err) }
  }
}
