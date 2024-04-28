import axios from "axios"
import { useApi } from "../../hooks/useApi";
import { fakerVolunteers } from "../../Pages/VolunteerPage/fakerVolunteers";
import { fakerprofile } from "../../VOLUNTEER_FRONT/Pages/MyProfile/fakerprofile";
import { RoutesBack } from "../utils/RoutesBackUtils";

const api = useApi();

interface Volunteer {
  firstName: string
  lastName: string
  email: string,
  password: string,
  phoneNumber: string
  profilePicture: File
}

export async function getVolunteers() {
  try {
    const { data } = await api.get(RoutesBack.UserController.readAllVolunteersForOrganiserVolunteerIndex)

    return data.datas;

    //in VolunteerPage
    // return fakerVolunteers.datas
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

//not implemented if we want to set to false
export async function updateVolunteerWarning(id: number, warning: boolean) {
  try {
    const path = RoutesBack.UserController.applyWarning.replace(":volunteerId", String(id))
    const { data } = await api.patch(path)
    return data.datas;

    //* faker: in VolunteerPage: component VolunteerCard
    // fakerVolunteers.datas.filter((obj) => obj.id === id)[0].warning = String(warning)
    // return fakerVolunteers.datas.filter((obj) => obj.id === id)[0]
  } catch (err) {
    console.log(err)
  }
}

//not implemented if we want to set to false
export async function updateVolunteerBan(id: number, ban: boolean) {
  try {
    const path = RoutesBack.UserController.applyBan.replace(":volunteerId", String(id))
    const { data } = await api.patch(path)
    return data.datas;

    //* faker: in VolunteerPage: component VolunteerCard
    // fakerVolunteers.datas.filter((obj) => obj.id === id)[0].ban = String(ban)
    // return fakerVolunteers.datas.filter((obj) => obj.id === id)[0]
  } catch (err) {
    console.log(err)
  }
}

export async function updateVolunteerProfile(id: number, newData: Volunteer) {
  try {
    // const { data } = await api.put(`users/${id}`, data)
    // return data;

    //in VolunteerProfilePage: component MyProfileCard
    const data = fakerprofile.datas.filter((obj) => obj.id === id)[0]
    Object.keys(newData).forEach((key) => {
      if (key !== "profilePicture") {
        data[key] = newData[key]
      }
    })
    console.log("data update", data)
    return data
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