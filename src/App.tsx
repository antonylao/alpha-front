import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { EventIndex } from "./Pages/EventPage/Index/EventIndexPage";
import { EventCard } from "./Components/Card/EventCard/EventCard";
import EventDuplicatePage from './Pages/EventPage/Duplicate/EventDuplicatePage';
import EventEditPage from './Pages/EventPage/Edit/EventEditPage';
import { FormEvent } from "./Components/FormEvent/FormEvent";

// import { SearchBar } from "./Components/SearchBar/SearchBarEvent/SearchBar";
// import { Exemple } from "./Components/SearchBar/SearchBarEvent/Exemple";

function App() {
  return (
    <>
     
      <Routes>
      <Route path="/" Component={EventCard} />
      <Route path="/create-event/" Component={FormEvent} />
      <Route path="/duplicate-event/:id" Component={EventDuplicatePage} />
      <Route path="/edit-event/:id" Component={EventEditPage} />
      </Routes>
    
    </>
  );
}

export default App;
