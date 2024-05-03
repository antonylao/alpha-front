import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import { MdPhotoCamera } from 'react-icons/md';

function EventEditPage() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, setValue, watch, formState: { errors }, } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('startOn', data.startOn);
      formData.append('duration', data.duration);
      formData.append('picture', data.picture[0]); // Assurez-vous que data.picture est un tableau de fichiers


      console.log("envoyé dans la req ici", formData)
      const response = await fetch(`http://localhost:3000/event/${id}`, {
        method: 'PUT',
        body: formData,
      });
      
      console.log("envoyé dans la req ", formData)
      if (response.ok) {
        console.log('Événement mis à jour avec succès');
        console.log(formData)
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
    "picture",
    "startOn",
    "duration",
    "selectedTasks",
  ]);
  console.log("lookChange:", lookChange);

  // Pré-remplir les champs du formulaire avec les données actuelles de l'événement
  const preloadEventData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/event/${id}`);
      if (response.ok) {
        const eventData = await response.json();
        // Pré-remplir les champs avec les données actuelles de l'événement
        Object.entries(eventData).forEach(([key, value]) => {
          setValue(key, value);
        });
      
      } else {
        console.error('Erreur lors de la récupération des données de l\'événement :', response.statusText);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des données de l\'événement :', error);
      alert("event non mis a jour :" + error)
    }
  };

  // Appeler preloadEventData au chargement de la page pour pré-remplir les champs
  useEffect(() => {
    preloadEventData();
  }, []);

  return (
    <div>
      <h1>Bonjour, vous êtes sur la page de modification de l'événement avec l'ID {id}</h1>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <input {...register('title')} />
        <input {...register('description')} />
        <div>
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
            {...register("picture", { required: true })}
            // {...(errors.picture && (
            //   <span>Ce champ ne doit pas être vide</span>
            // ))}
          />
        </div>
        <DatePicker
          selected={watch('startOn')} 
          onChange={(date) => setValue('startOn', date)} 
        />
        <TimePicker
          value={watch('duration')} 
          onChange={(value) => setValue('duration', value)}
        />
        <button type="submit">Modifier l'événement</button>
      </form>
    </div>
  );
}

export default EventEditPage;
