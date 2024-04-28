import { jwtDecode } from "jwt-decode";

export function getConnectedUserId(): number {
  try {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      throw new Error()
    }
    return (jwtDecode(token)).id as number
  } catch (error) {
    console.error("Impossible de récupérer l'id du user connecté: le JWT Token n'est pas valide ou ne contient pas l'id du user")
    throw error
  }

}