import { jwtDecode } from "jwt-decode";

export function getConnectedUserId() {
  try {
    return jwtDecode(import.meta.env.VITE_TOKEN).id
  } catch (error) {
    console.error("Le JWT Token n'est pas valide ou ne contient pas l'id du user")
  }

}