import axios from "axios"

export async function getVolunteers() {
  const {data} = await axios.get("https://jsonplaceholder.typicode.com/users")

  return data;
}