import { MdDelete } from "react-icons/md";
import { useApi } from '../../../hooks/useApi';
import { RoutesBack } from "../../../services/utils/RoutesBackUtils";



export function Delete({ eventId, onDelete }) {


  const api = useApi();

  const handleDeleteConfirmation = () => {
    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cet événement ?");
    if (isConfirmed) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      const {data} = await api.delete(RoutesBack.EventController.deleteEvent.replace(":id", `${eventId}`), {
      // const response = await fetch(`http://localhost:3000/event/${eventId}`, {
        method: "DELETE",
      });
      
      const response = data.datas;
      console.log('voici la réponse '+ response); 
     
    // Afficher la réponse de l'API (facultatif)
      
      onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
    }
  };

  return (
    <button onClick={handleDeleteConfirmation}><MdDelete /></button>
  );
}
