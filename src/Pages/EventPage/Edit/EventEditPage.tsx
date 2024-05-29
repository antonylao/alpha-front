import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { MdDelete, MdPhotoCamera } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { RoutesBack } from '../../../services/utils/RoutesBackUtils';
import { useApi } from '../../../hooks/useApi';

type Inputs = {
  title: string;
  description: string;
  picture: string;
  type: number;
  startOn: Date | undefined;
  duration: string | undefined;
};

type Info = {
  id: number;
  name: string;
};

type SelectedTask = {
  quantity: number;
  id: number;
  name: string;
};

type Room = {
  id: number;
  name: string;
};

function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const [infos, setInfos] = useState<Info[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room[]>([]);
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [eventTypes, setEventTypes] = useState([]);

  const api = useApi();

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<Inputs>();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('type', data.type);
      formData.append('description', data.description);
      if (data.startOn) {
        formData.append('startOn', data.startOn.toISOString());
      }
      formData.append('duration', data.duration);
      formData.append('picture', data.picture[0]);
      if (selectedTasks) {
        formData.append('selectedTasks', JSON.stringify(selectedTasks));
      }
      console.log('FormData to be sent:', Array.from(formData.entries()));
      
      const response = await api.put(RoutesBack.EventController.updateEvent.replace(":id", `${id}`), formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      if (response.status === 200) {
        console.log('Événement mis à jour avec succès');
      } else {
        console.error('Erreur lors de la mise à jour de l\'événement :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
    }
  };

  const lookChange = watch([
    "title",
    "description",
    "type",
    "picture",
    "startOn",
    "duration",
  ]);
  console.log('voici les values: ' + lookChange)

  const handleChange = (value) => {
    setDuration(value);
  };

  const preloadEventData = async () => {
    try {
      const response = await api.get(RoutesBack.EventController.updateEvent.replace(":event_id", String(id)));
      if (response.status === 200) {
        const eventData = response.data;
        setValue('title', eventData.title);
        setValue('description', eventData.description);
        setValue('type', eventData.type);
        // setValue('startOn', new Date(eventData.startOn));
        // setStartDate(new Date(eventData.startOn));
        setValue('duration', eventData.duration);
        setDuration(eventData.duration);
        setSelectedTasks(eventData.selectedTasks || []);
        setSelectedRoom(eventData.room ? [eventData.room] : []);
      } else {
        console.error('Erreur lors de la récupération des données de l\'événement :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'événement :', error);
    }
  };

  useEffect(() => {
    preloadEventData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const taskResponse = await api.get("http://localhost:3000/task");
        setInfos(taskResponse.data);
        const roomResponse = await api.get("http://localhost:3000/room");
        setRooms(roomResponse.data);
        const eventTypesResponse = await api.get(RoutesBack.EventController.updateEvent.replace(":event_id", String(id)));
        setEventTypes(eventTypesResponse.data);
      } catch (error) {
        console.error("Erreur lors de la requête API:", error);
      }
    };
    fetchData();
  }, []);

  const handleSelectChange = (e) => {
    const taskId = +e.target.value;
    if (!taskId) return;

    const prevSelectedTasks = [...selectedTasks];
    const foundTaskIndex = prevSelectedTasks.findIndex(item => item.id === taskId);
    const [task] = infos.filter((task) => task.id === taskId);

    if (foundTaskIndex === -1) {
      prevSelectedTasks.push({ ...task, quantity: 1 });
    } else {
      prevSelectedTasks[foundTaskIndex].quantity += 1;
    }

    setSelectedTasks(prevSelectedTasks);
  };

  const handleDelete = (taskId, e) => {
    e.preventDefault();
    setSelectedTasks((prevSelectedTasks) => {
      const updatedSelections = prevSelectedTasks.map(task => {
        if (task.id === taskId) {
          return { ...task, quantity: task.quantity - 1 };
        }
        return task;
      }).filter(task => task.quantity > 0);

      return updatedSelections;
    });
  };

  const handleRoomChange = (e) => {
    const roomId = +e.target.value;
    if (!roomId) return;
    const selected = rooms.find(room => room.id === roomId);
    setSelectedRoom([selected]);
  };

  return (
    <Card color="transparent" className="border border-black" shadow={false}>
      <div className="border-b border-black mt-2 mb-2 pt-2 pb-2">
        <Typography variant="h4" color="blue-gray">
          Modifier l'événement
        </Typography>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-full sm:w-96"
        >
          <div>
            <div className="w-full sm:w-72">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Salle
              </Typography>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleRoomChange}
                value={selectedRoom[0]?.id || ''}
              >
                <option value="">Sélectionnez une salle</option>
                {rooms.map((room, index) => (
                  <option key={index} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full sm:w-72">
            <select
              id="eventType"
              name="eventType"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={(e) => setValue("type", parseInt(e.target.value))}
              value={watch('type') || ''}
            >
              <option value="">Choisissez le type d'événement</option>
              <option value="1">CONCERT</option>
              <option value="2">THEATRE</option>
              <option value="3">STANDUP</option>
            </select>
          </div>

          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Titre
            </Typography>
            <Input
              {...register("title", { required: true })}
              {...(errors.title && <span>Ce champ ne doit pas être vide</span>)}
              size="lg"
              placeholder="Titre de l'événement"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Input
              {...register("description", { required: true })}
              {...(errors.description && (
                <span>Ce champ ne doit pas être vide</span>
              ))}
              size="lg"
              placeholder="Description de l'événement"
              className="!border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <div className="w-full sm:w-72">
              <select
                id="category"
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleSelectChange}
                value=""
              >
                <option value={null}>Sélection Tâches</option>
                {infos.map((info, index) => (
                  <option key={index} value={info.id}>
                    {info.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedTasks.length > 0 && (
              <div>
                <p className="mt-2 text-sm text-gray-500">
                  Tâches sélectionnées :
                </p>
                <ul className="list-disc pl-5">
                  {selectedTasks.map((task) => (
                    <li className="border border-black rounded-md" key={task.id}>
                      <p>
                        {task.name} (x{task.quantity})
                      </p>
                      <span>
                        <button onClick={(e) => handleDelete(task.id, e)}>
                          <MdDelete />{" "}
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div>
            <div className="mt-8 mb-2 w-full">
              <div className="flex justify-center ">
                <label htmlFor="file-upload" className="cursor-pointer ">
                  <div className="mt-6 p-4 rounded-lg border-dashed border-2 border-black">
                    <MdPhotoCamera size={150} />
                    <p> Ajouter une image</p>
                  </div>
                </label>

                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  {...register("picture", { required: false })}
                />
              </div>
              <div className="text-center">
                <p className="mt-8 mb-4">Date et heure de la représentation</p>
                <div className="flex justify-center">
                  <FaCalendarAlt size={100} />
                </div>
                <div className="flex justify-center mt-4 mb-4">
                  <DatePicker
                    className="text-center"
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setValue("startOn", date);
                    }}
                  />
                  {errors.date && <span>Ce champ ne doit pas être vide</span>}
                </div>
              </div>
              <div className="flex justify-center">
                <p className="m-2">Durée :</p>
                <TimePicker
                  value={duration}
                  onChange={(value) => {
                    setValue("duration", value);
                    handleChange(value);
                  }}
                  disableClock={true}
                />
                {errors.duration && <span>Ce champ ne doit pas être vide</span>}
              </div>
            </div>
          </div>
          <div className="flex justify-evenly mb-3">
            <Button className="mt-6 bg-red-500 w-full sm:w-auto">Annuler</Button>
            <Button type="submit" className="mt-6 bg-green-500 w-full sm:w-auto">
              Confirmer
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
}

export default EventEditPage;
