import { useApi } from "../../hooks/useApi";
const api = useApi();

export async function getVolunteerProfile() {
    try {
        const { data } = await api.get("my_profile");

        return data.comments;
    } catch (err) {
        console.log("ERROR")
        console.log(err)
    }
}
