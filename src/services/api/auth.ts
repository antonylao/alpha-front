import axios from "axios"
import { SignInFormInterface, SignUpFormInterface, UserRoleStr } from "../utils/CustomTypes";
import { RoutesBack } from "../utils/RoutesBackUtils";
import { ENABLE_LOGS } from "../utils/Logs";

const logs = true

export async function signIn(role: UserRoleStr, form: SignInFormInterface) {
  try {
    let path = (role === "organiser") ? RoutesBack.AuthController.loginOrganiser : RoutesBack.AuthController.loginVolunteer
    if (logs && ENABLE_LOGS) { console.log("🚀 ~ signIn ~ path:", path) }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_DEV}${path}`, form
    )
    if (logs && ENABLE_LOGS) { console.log("🚀 ~ signIn ~ data:", data) }

    return data.datas
  } catch (error) {
    if (logs && ENABLE_LOGS) { console.log("auth.ts: error during sign in ") }
    throw error
  }
}

export async function signUpVolunteer(form: SignUpFormInterface) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_DEV}auth/signup/volunteer`, form
    )
    if (logs && ENABLE_LOGS) { console.log("🚀 ~ signIn ~ data:", data) }

    return data.datas
  } catch (error) {
    if (logs && ENABLE_LOGS) { console.log("auth.ts: error during sign up ") }
    throw error
  }
}



export async function refreshTokenFn() {
  const refreshToken = localStorage.getItem('refreshToken')
  const headers = { Authorization: "Bearer " + refreshToken }

  try {
    const { data } = await axios.get(import.meta.env.VITE_API_BASE_URL_DEV + RoutesBack.AuthController.refreshToken, { headers });
    return data.datas;
  } catch (error) {
    if (logs && ENABLE_LOGS) { console.log(error) }
  }
}

