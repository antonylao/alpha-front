import { MdDelete } from "react-icons/md";

export function Delete({ eventId, onDelete }) {
  const handleDeleteConfirmation = () => {
    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cet événement ?");
    if (isConfirmed) {
      handleDelete();
    }
  };

  const handleDelete = async () => {
    try {
      
      const response = await fetch(`http://localhost:3000/event/${eventId}`, {
        method: "DELETE",
      });
      const data = await response.json();
      console.log(data); // Afficher la réponse de l'API (facultatif)
      
      onDelete();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'événement :", error);
    }
  };

  return (
    <button onClick={handleDeleteConfirmation}><MdDelete /></button>
  );
}
