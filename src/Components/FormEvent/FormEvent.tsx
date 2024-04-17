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

type Inputs = {
  title: string;
  description: string;
  image: string;
  date: Date | undefined;
  duree: string | undefined;
  selectedTasks: { [taskName: string]: number };
};

export function FormEvent() {
  const [infos, setInfos] = useState([]);
  const [selectedInfos, setSelectedInfos] = useState<{
    [taskName: string]: number;
  }>({});
  const [startDate, setStartDate] = useState(new Date());
  const [duration, setDuration] = useState("");
  console.log("value duration", duration);

  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        console.log('Event created successfully');
      } else {
        console.error('Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  register("duree", { required: false });

  const lookChange = watch([
    "title",
    "description",
    "image",
    "date",
    "duree",
    "selectedTasks",
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
        setInfos(result);
        console.log(result);
      } catch (error) {
        console.log("erreur lors de la requete API" + error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  
  

  const handleSelectChange = (e) => {
    const selInfo = e.target.value;
    setSelectedInfos((prevSelectedInfos) => ({
      ...prevSelectedInfos,
      [selInfo]: (prevSelectedInfos[selInfo] || 0) + 1,
    }));
  };

  const handleDelete = (key, e) => {
    e.preventDefault();
    setSelectedInfos((prevSelectedInfos) => {
      const updatedSelections = { ...prevSelectedInfos };
      if (updatedSelections[key] > 1) {
        updatedSelections[key]--;
      } else {
        delete updatedSelections[key];
      }
      return updatedSelections;
    });
  };

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
                value={selectedInfos}
              >
                <option value="">Sélection Tâches</option>
                {infos.map((info, index) => (
                  <option key={index} value={info.name}>
                    {info.name}
                  </option>
                ))}
              </select>
            </div>

            {Object.keys(selectedInfos).length > 0 && (
              <div>
                <p className="mt-2 text-sm text-gray-500">
                  Tâches sélectionnées :
                </p>
                <ul className="list-disc pl-5">
                  {Object.entries(selectedInfos).map(([info, count], index) => (
                    <li className="border border-black rounded-md" key={index}>
                      <p>
                        {info} (x{count})
                      </p>
                      <span>
                        <button onClick={(e) => handleDelete(info, e)}>
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
                  {...register("image", { required: true })}
                  {...(errors.image && (
                    <span>Ce champ ne doit pas être vide</span>
                  ))}
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
                      register("date", { value: date });
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
                    setValue("duree", value);
                    handleChange(value);
                  }}
                  disableClock={true}
                />
                {errors.duree && <span>Ce champ ne doit pas être vide</span>}
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className="flex justify-evenly mb-3">
        <Button className="mt-6 bg-red-500 w-full sm:w-auto">Annuler</Button>
        <Button className="mt-6 bg-green-500 w-full sm:w-auto">
          Confirmer
        </Button>
      </div>
    </Card>
  );
}
