import { useEffect, useState } from "react";
// import {getVolunteers} from "../../services/api/volunteers";
import SearchBarVolunteer from "../../Components/SearchBar/SearchBarVolonteer/SearchBarVolunteer";
import { VolunteerCard } from "../../Components/Card/VolunteerCard/VolunteerCard";
import { fakerVolunteers } from "./fakerVolunteers";
import { normalizeString, stringToRegExp } from "../../services/utils/Utils";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function VolunteerPage() { 
  //UPDATED CODE
  const [filteredListVolunteers, setFilteredListVolunteers] = useState<any>([]);
  const [firstMount, setFirstMount] = useState<boolean>(true);

  const {data: completeListVolunteers, isLoading: isLoadingCompleteListVolunteers, isError: isErrorCompleteListVolunteers} = useQuery({
    queryKey:["completeListVolunteers"],
    // queryFn: getVolunteers,
    queryFn: () => {return fakerVolunteers.datas},
    // initialData: [],
  })

  console.log("complete list volunteers")
  console.log(completeListVolunteers)

  useEffect(() => {
    if (firstMount) {
      console.log("first mount");
      setFirstMount(false);
      return;
    } 

    console.log("remount")
    setFilteredListVolunteers(completeListVolunteers)
  }, [completeListVolunteers]);

  // //ERROR: creates infinite loop
  // if (!isLoadingCompleteListVolunteers && !isErrorCompleteListVolunteers) {
  //   setFilteredListVolunteers(completeListVolunteers)
  // }

  //END UPDATED CODE

  //ORIGINAL CODE
  // const [completeListVolunteers,setCompleteListVolunteers] = useState<any>([])
  // const [filteredListVolunteers, setFilteredListVolunteers] = useState<any>([])
  // useEffect(() => {
  //   async function loadVolunteers() {
  //     //API call
  //     // const volunteers = await getVolunteers();

  //     const volunteers = fakerVolunteers;

  //     setCompleteListVolunteers(volunteers.datas);
  //     setFilteredListVolunteers(volunteers.datas);
  //   }

  //   loadVolunteers()
  // }, [])
  //END ORIGINAL CODE


  //COMMON CODE
  const receiveSearchBarData = (value:string) => {
    value = normalizeString(value)
    if (value.length === 0) {
      console.log(completeListVolunteers)
      setFilteredListVolunteers([...completeListVolunteers]);

      return
    } 
    
    const searchValRegexp = stringToRegExp(value);

    setFilteredListVolunteers(
      [...completeListVolunteers].filter((volunteer:any) => {
        console.log(volunteer)

        return (
          `${volunteer.firstname} ${volunteer.lastname}`.match(searchValRegexp) ||
          `${volunteer.lastname} ${volunteer.firstname}`.match(searchValRegexp) 
        );
      })
    );
  }
  //END COMMON CODE

  // if (isLoadingCompleteListVolunteers) return <div>Chargement...</div>;
  // if (isErrorCompleteListVolunteers) return <div>Erreur lors de la récupération de la liste complète des bénévoles</div>;

  return (
    <>
      <h1>Volunteer Page Title</h1>

      <SearchBarVolunteer sendToVolunteerPage={receiveSearchBarData}/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredListVolunteers.map((volunteer:any) => (
            <div key={volunteer.id}>
              <VolunteerCard id={volunteer.id}/>
            </div>
          ))}
        </div>
    </>
  )
}