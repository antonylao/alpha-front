import { useEffect, useState } from "react";
import { getVolunteerById, getVolunteers, addVolunteer} from "../../services/api/volunteers";
import './Volonteer.css';
import SearchBarVolunteer from "../../Components/SearchBar/SearchBarVolonteer/SearchBarVolunteer";

export default function VolunteerPage() {
  const [listVolunteers, setListVolunteers] = useState<any>([])
  const [volunteerById, setVolunteerById] = useState<any>({})

  useEffect(() => {
    async function loadVolunteers() {
      const volunteers = await getVolunteers();

      console.log(volunteers)

      setListVolunteers(volunteers)
    }

    async function loadVolunteer(id:number) {
      const volunteer = await getVolunteerById(id)
      setVolunteerById(volunteer)
    }

    loadVolunteers()
    loadVolunteer(8)
  }, [])

  async function handleClick() {
    const body = {
      id: -1,
      name: "test",
      email: "test",
      phone: "test",
    }

    const result = await addVolunteer(body)
    console.log(result);
  }

  return (
    <>
      <h1>Volunteer Page Title</h1>

      <SearchBarVolunteer />

      {listVolunteers.map((volunteer:any, index:number) => (
        <div key={index}>
          {volunteer.name}
        </div>
      ))}

      <p>{JSON.stringify(volunteerById)}</p>
      <button onClick={handleClick}>Ajouter le bénévole test</button>
    </>
  )
}