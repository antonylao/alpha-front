import axios from "axios"
import { SignInFormInterface, SignUpFormInterface, UserRoleStr } from "../utils/CustomTypes";
import { RoutesBack } from "../utils/RoutesBackUtils";


export async function signIn(role: UserRoleStr, form: SignInFormInterface) {
  try {
    let path = (role === "organiser") ? RoutesBack.AuthController.loginOrganiser : RoutesBack.AuthController.loginVolunteer
    console.log("🚀 ~ signIn ~ path:", path)

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_DEV}${path}`, form
    )
    console.log("🚀 ~ signIn ~ data:", data)

    return data.datas
  } catch (error) {
    console.log("auth.ts: error during sign in ")
    throw error
  }
}

export async function signUpVolunteer(form: SignUpFormInterface) {
  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL_DEV}auth/signup/volunteer`, form
    )
    console.log("🚀 ~ signIn ~ data:", data)

    return data.datas
  } catch (error) {
    console.log("auth.ts: error during sign up ")
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

