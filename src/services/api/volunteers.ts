import axios from "axios"
import { useApi } from "../../hooks/useApi";
import { fakerVolunteers } from "../../Pages/VolunteerPage/fakerVolunteers";
import { fakerVolunteerSignedIn } from "../../VOLUNTEER_FRONT/Components/Navbar/fakerVolunteerSignedIn";

const api = useApi();

export async function getVolunteers() {
  try {
    // const {data} = await api.get("users")
    // return data;

    //in VolunteerPage
    return fakerVolunteers.datas
  } catch (err) {
    console.log(err)
  }
}

export async function getVolunteerById(id: number) {
  try {
    const { data } = await api.get(`users/${id}`)
    return data;
  } catch (err) {
    console.log(err)
  }
}

export async function getVolunteerProfilePictureById(id: number) {
  try {
    // const { data } = await api.get(`users/${id}/profile_picture`)
    // return data;

    //in VolunteerNavbar : faker only has one id of 1
    const data = fakerVolunteerSignedIn.datas.filter((obj) => obj.id === id)[0]
    return data;
  } catch (err) {
    console.log(err)
  }
}

//use this function with sign in, sign up, forgotten password
export async function getVolunteerByIdWithoutToken(id: number) {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL_DEV}users/${id}`)
    return data;
  } catch (err) {
    console.log(err)
  }
}

export async function getVolunteerWarningById(id: number) {
  try {
    const { data } = await api.get(`todos/${id}`)
    return data["completed"]
  } catch (err) {
    console.log(err)
  }
}

export async function getVolunteerBanById(id: number) {
  try {
    const { data } = await api.get(`todos/${199 - id}`)
    return data["completed"]
  } catch (err) {
    console.log(err)
  }
}

export async function updateVolunteerWarning(id: number, warning: boolean) {
  try {
    // const { data } = await api.patch(`users/${id}`, { warning: warning })
    // return data;

    //in VolunteerPage: component VolunteerCard
    fakerVolunteers.datas.filter((obj) => obj.id === id)[0].warning = String(warning)
    return fakerVolunteers.datas.filter((obj) => obj.id === id)[0]
  } catch (err) {
    console.log(err)
  }
}

export async function updateVolunteerBan(id: number, ban: boolean) {
  try {
    // const { data } = await api.patch(`users/${id}`, { ban: ban })
    // return data;

    //in VolunteerPage: component VolunteerCard
    fakerVolunteers.datas.filter((obj) => obj.id === id)[0].ban = String(ban)
    return fakerVolunteers.datas.filter((obj) => obj.id === id)[0]
  } catch (err) {
    console.log(err)
  }
}

export async function addVolunteer(body: any) {
  try {
    const { data } = await api.post(`users`, body)
    return data;
  } catch (err) {
    console.log(err)
  }
}