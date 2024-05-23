import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { MdDelete, MdPhotoCamera } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import "react-datepicker/dist/react-datepicker.css";
import "./FormEvent.css";
import axios from "axios";

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
  
}

type SelectedTask = {
  quantity: number;
  id: number;
  name: string
}

type Room = {
  id: number;
  name: string
}

export function FormEvent() {
  const [infos, setInfos] = useState<Info[]>([]);
  const [rooms, setRooms] = useState<Room[]>([])
  const [selectedTasks, setSelectedTasks] = useState<SelectedTask[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<Room[]>([])
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  const [eventTypes, setEventTypes] = useState([]);


  console.log("value duration", duration);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();


  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log("je rentre dans onSubmit,", { selectedTasks })
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('type', data.type);
      formData.append('description', data.description);
      if (data.startOn){
        formData.append('startOn', data.startOn);
      }
      formData.append('duration', data.duration);
      formData.append("picture", data.picture[0]);
      if (selectedTasks){
        formData.append("selectedTasks", JSON.stringify(selectedTasks))
      }
      console.log("avant le fetch")
      const response = await axios.post('http://localhost:3000/event', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });


      console.log('Got response:', response)
    } catch (error) {
      console.error('Error creating event:', error);
      alert('Failed to create event:  ' + error)
    }
  };

  register("duration", { required: false });

  const lookChange = watch([
    "title",
    "description",
    "type",
    "picture",
    "startOn",
    "duration",
  ]);
  console.log("lookChange:", lookChange);

  const handleChange = (value) => {
    setDuration(value);
    console.log("la duree", value);
    console.log("typeof de value", typeof value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/task"
        );
        const result = await response.json();

        console.log('got TASKS LIST FROM API:', result)
        setInfos(result);
        console.log(result);
      } catch (error) {
        console.log("erreur lors de la requete API" + error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/room"
        );
        const result = await response.json();

        console.log('got ROOMS LIST FROM API:', result)
        setRooms(result);
        console.log(result);
      } catch (error) {
        console.log("erreur lors de la requete API" + error);
      }
    };
    fetchData();
    return () => {};
  }, []);


  useEffect(() => {
    const fetchEventTypes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/event');
        setEventTypes(response.data);
        console.log('response eventType' +response.data) // Suppose your API returns an array of event types
      } catch (error) {
        console.error('Error fetching event types:', error);
      }
    };

    fetchEventTypes();
  }, []);

  const handleSelectChange = (e) => {
    if (!e.target.value){
      return;
    }

    const taskId = +e.target.value;

    if (!taskId){
      return;
    }
    console.log('Changed task, its type is :', typeof taskId)

    const prevSelectedTasks = [...selectedTasks];

    console.log('prevSelectedTasks:', prevSelectedTasks)
    const foundTaskIndex = prevSelectedTasks.findIndex(item=> item.id === taskId)

    console.log('getting task from infos:', infos)
    const [task] = infos.filter((task)=> task.id === taskId)
    console.log('foundTaskIndex: ', foundTaskIndex)
    console.log('got task:', task)

    if (foundTaskIndex === -1){ // not found
      prevSelectedTasks.push({
        ...task,
        quantity: 1
      })
    } else {
      prevSelectedTasks[foundTaskIndex].quantity += 1;
    }

    setSelectedTasks(prevSelectedTasks)
  };

  // const handleDelete = (key, e) => {
  //   e.preventDefault();
  //   setSelectedTasks((prevSelectedTasks) => {
  //     const updatedSelections = { ...prevSelectedTasks };
  //     if (updatedSelections[key] > 1) {
  //       updatedSelections[key]--;
  //     } else {
  //       delete updatedSelections[key];
  //     }
  //     return updatedSelections;
  //   });
  // };

  


  const handleRoomChange = (e)=>{
    console.log('je clique dessus pour changer de salle')

    if (!e.target.value){
      return;
    }

  }

  return (
    <Card color="transparent" className="border border-black" shadow={false}>
      <div className="border-b border-black mt-2 mb-2 pt-2 pb-2">
        <Typography variant="h4" color="blue-gray">
          Créer un nouvel événement
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
                
              >
                
                {rooms.map((room, index) => (
                  <option key={index} value={room.id}>
                    {room.name}
                  </option>
                ))}
              </select>
            </div>



    </div>
    <select
  id="eventType"
  name="eventType"
  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
  onChange={(e) => setValue("type", parseInt(e.target.value))}
>
  <option value="">Choisissez le type d'événement</option>
  <option value="1">CONCERT</option>
  <option value="2">THEATRE</option>
  <option value="3">STANDUP</option>
</select>



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
              crossOrigin={undefined}
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
              crossOrigin={undefined}
            />
            <div className="w-full sm:w-72">
              <select
                id="category"
                name="category"
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                onChange={handleSelectChange}
                
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
                      register("startOn", { value: date });
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
                    console.log("registering DUREE", { value });
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


