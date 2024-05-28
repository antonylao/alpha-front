// import axios from "axios"
// import { VolunteerUpdateInterface } from "../utils/CustomTypes";
import { useApi } from "../../hooks/useApi";

const api = useApi()

export async function VolunteerProfileUpdate(body: any) {

  const token = localStorage.getItem('token')
  const headers = { Authorization: "Bearer " + token }
  console.log("🚀 ~ VolunteerProfileUpdate ~ token:", token)

  console.log("🚀 ~ VolunteerProfileUpdate ~ body:", body, {headers})
  try {
    const { data } = await api.put( body )
    console.log("🚀 ~ VolunteerProfileUpdate ~ data:", data)

    return data.datas
  } catch (error) {
    console.log("volunteerProfileUpdate: error during profile update ")
    console.log("🚀 ~ VolunteerProfileUpdate ~ error:", error)
    throw error
  }
}
