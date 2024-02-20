import { useEffect, useState } from "react";
import { getVolunteers } from "../../services/api/volunteers";
import SearchBarVolunteer from "../../Components/SearchBar/SearchBarVolonteer/SearchBarVolunteer";
import { VolunteerCard } from "../../Components/Card/VolunteerCard/VolunteerCard";
import { normalizeString, stringToRegExp } from "../../services/utils/Utils";
import { useQuery } from "@tanstack/react-query";

export default function VolunteerPage() {
  const [filteredListVolunteers, setFilteredListVolunteers] = useState<any>([]);

  const { data, isSuccess, isLoading, isError } = useQuery({
    queryKey: ["completeListVolunteers"],
    queryFn: getVolunteers,
  })

  useEffect(() => {
    if (isSuccess) {
      setFilteredListVolunteers(data)
    }
  }, [isSuccess])

  const receiveSearchBarData = (value: string) => {
    value = normalizeString(value)
    if (value.length === 0) {
      setFilteredListVolunteers([...data]);

      return
    }

    const searchValRegexp = stringToRegExp(value);

    setFilteredListVolunteers(
      data.filter((volunteer: any) => {
        console.log(volunteer)

        return (
          `${volunteer.firstname} ${volunteer.lastname}`.match(searchValRegexp) ||
          `${volunteer.lastname} ${volunteer.firstname}`.match(searchValRegexp)
        );
      })
    );
  }

  if (isLoading) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors de la récupération de la liste complète des bénévoles</div>;

  return (
    <>
      <h1>Volunteer Page Title</h1>

      <SearchBarVolunteer sendToVolunteerPage={receiveSearchBarData} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredListVolunteers.map((volunteer: any) => (
          <div key={volunteer.id}>
            <VolunteerCard id={volunteer.id} />
          </div>
        ))}
      </div>
    </>
  )
}