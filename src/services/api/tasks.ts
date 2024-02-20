import { fakerTasks } from "../../Pages/VolunteerPage/fakerTasks"

export async function getTasks() {
  try {
    // const {data} = await api.get("tasks")
    // return data;

    //in VolunteerPage
    return fakerTasks.datas
  } catch (err) {
    console.log(err)
  }
}
export async function taskNameValid(str: string) {
  try {
    let taskList = await getTasks()
    taskList = taskList.map((obj: any) => { return obj.name })
    console.log(taskList)
    return taskList.includes(str)
  } catch (err) {
    console.log(err)
  }
}