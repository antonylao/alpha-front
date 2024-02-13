import axios from "axios";

//use this function with sign in, sign up, forgotten password
export async function getOrganiserByIdWithoutToken(id:number) {
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL_DEV}users/${id}`)
    return data;
  } catch(err) {
    console.log(err)
  }
}