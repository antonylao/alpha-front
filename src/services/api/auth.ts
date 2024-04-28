import axios from "axios"
import { SignInFormInterface, UserRoleStr } from "../utils/CustomTypes";
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


export async function refreshTokenFn() {
  const refreshToken = localStorage.getItem('refreshToken')
  const headers = { Authorization: "Bearer " + refreshToken }

  try {
    const { data } = await axios.get(import.meta.env.VITE_API_BASE_URL_DEV + RoutesBack.AuthController.refreshToken, { headers });
    return data.datas;
  } catch (error) {
    console.log(error)
  }
}

