import axios from "axios"
import { useApi } from "../../hooks/useApi";

const api = useApi();

export async function getVolunteers() {
  try {
    const {data} = await api.get("users")
    return data;
  } catch(err) {
    console.log(err)
  }
}


//IN CONSTRUCTION
export async function getVolunteersFiltered(search: '') {
  try {
    const {data} = await api.get("users")
    return data;
  } catch(err) {
    console.log(err)
  }
}

export async function getVolunteerById(id:number) {
  try {
    const {data} = await api.get(`users/${id}`)
    return data;
  } catch(err) {
    console.log(err)
  }
}

//use this function with sign in, sign up, forgotten password
export async function getVolunteerByIdWithoutToken(id:number) {
  try {
    const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL_DEV}users/${id}`)
    return data;
  } catch(err) {
    console.log(err)
  }
}

export async function getVolunteerWarningById(id:number) {
  try {
    const {data} = await api.get(`todos/${id}`)
    return data["completed"]
  } catch(err) {
    console.log(err)
  }
}

export async function getVolunteerBanById(id:number) {
  try {
    const {data} = await api.get(`todos/${199 - id}`)
    return data["completed"]
  } catch(err) {
    console.log(err)
  }
}

export async function updateVolunteerWarning(id:number, warning:boolean) {
  try {
    const {data} = await api.patch(`users/${id}`, {warning: warning})
    return data;
  } catch(err) {
    console.log(err)
  }
}


export async function addVolunteer(body:any) {
  try {
    const {data} = await api.post(`users`, body)
    return data;
  } catch(err) {
    console.log(err)
  }
}