import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";

import { useEffect, useState } from "react";
import { Delete } from "../../Buttons/DeleteEvent/Delete";
import { Edit } from "../../Buttons/EditEvent/Edit";
import { Duplicate } from "../../Buttons/DuplicateEvent/Duplicate";
import { Create } from "../../Buttons/CreateEvent/Create";
import { RoutesBack } from "../../../services/utils/RoutesBackUtils";
import { useApi } from "../../../hooks/useApi";

const api = useApi();


export function EventCard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await api.get(

          RoutesBack.EventController.getAllEvents
        );
        const result = await data.datas;
        setEvents(result);
        console.log(result);
      } catch (error) {
        console.error("Erreur lors de la requête API :", error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Les mois commencent à partir de zéro, donc ajoutez 1
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    if (minutes === 0) {
      return {
        date: `${day}/${month}/${year}`,
        time: `${hours}h`
      };
    } else {
      return {
        date: `${day}/${month}/${year}`,
        time: `${hours}h ${minutes}min`
      };
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:3000/event/${eventId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Mettre à jour les données après la suppression
        fetchData();
      } else {
        throw new Error('La suppression a échoué');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement :', error);
    }
  };

  

  return (
    <>
    <Create/>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event, index) => (
          <div key={index}>
            <Card className="w-full max-w-[26rem] shadow-lg">
              <CardHeader floated={false} color="blue-gray">
                <img
                src={`http://localhost:3000/uploads/${event.picture}`}
                 
                  alt={event.title}
                  className="w-full h-auto bg-cover"
                />
                
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody>
                <div className="mb-3 flex justify-center items-center flex-wrap">
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="font-medium mr-5"
                  >
                    {event.title}
                  </Typography>
                  <div
                    className={`border border-black rounded-full ${
                      event.type === 1
                        ? "bg-blue-500"
                        : event.type === 2
                        ? "bg-orange-500"
                        : event.type === 3
                        ? "bg-red-500"
                        : ""
                    }`}
                  >
                    {event.type}
                  </div>
                </div>
                <Typography color="gray">{event.description}</Typography>
                <Typography color="gray">
                Début: {formatDateTime(event.startOn).date} - {formatDateTime(event.startOn).time}
                </Typography>
                <Typography color="gray">Durée: {event.duration}</Typography>
              </CardBody>
              <CardFooter>
                <div className="flex items-center">
                  <div>{event.id}</div>
                  <div className="flex items-center ml-auto space-x-1">
                    <div className="m-1">
                      <Edit eventId={event.id} />
                    </div>
                    <div className="m-1">
                      <Duplicate eventId={event.id} />
                    </div>
                    <div className="m-1">
                      <Delete eventId={event.id} onDelete={() => handleDelete(event.id)}  />
                    </div>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>
    </>
  );
}
