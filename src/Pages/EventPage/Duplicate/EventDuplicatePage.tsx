import React from 'react';
import { useParams } from 'react-router-dom';

function EventDuplicatePage() {
  const { id } = useParams<{ id: string }>(); 

  return (
    <div>
      <h1>Bonjour, vous êtes sur la page de duplication de l'événement avec l'ID {id}</h1>
    </div>
  );
}

export default EventDuplicatePage;
