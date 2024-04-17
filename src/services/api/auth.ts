import axios from "axios"
import { SignInFormInterface, UserRoleStr } from "../utils/CustomTypes";


export async function signIn(role: UserRoleStr, form: SignInFormInterface) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_DEV}auth/signin/${role}`, form
    )
    console.log("🚀 ~ signIn ~ data:", data)

    return data
  } catch (error) {
    console.log("auth.ts: error during sign in ")
    throw error
  }
}


export async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken')
  const headers = { Authorization: "Bearer " + refreshToken }

  try {
    const { data } = await axios.get(import.meta.env.VITE_API_BASE_URL_DEV + 'auth/refreshToken', { headers });
    console.log("🚀 ~ refreshToken ~ data:", data)
    return data;
  } catch (error) {
    console.log(error)
  }
}

