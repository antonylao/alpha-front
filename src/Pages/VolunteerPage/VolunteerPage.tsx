/* TESTS
1: get volunteers info from function
 2: display volunteers info on card
 2.1: display infos from table user
 2.2: display card border color on first mount
3: update warning, ban in DB on confirmation
4: display correct rating details info: SEEMS TO WORK
5: display correct past events in modal: DONE
6: update correctly on rating apply
6.1: update in BDD: DONE
6.2: update in card
*/

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
      data?.filter((volunteer: any) => {
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
      <SearchBarVolunteer sendToVolunteerPage={receiveSearchBarData} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-max">
        {filteredListVolunteers.map((volunteer: any) => (
          <div key={volunteer.id}>
            <VolunteerCard data={volunteer} />
          </div>
        ))}
      </div>
    </>
  )
}