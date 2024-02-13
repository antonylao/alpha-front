import "./App.css";
import { Create } from "./Components/Buttons/CreateEvent/Create";
import { EventCard } from "./Components/Card/EventCard/EventCard";

function App() {
  return (
    <>
      <Create />
      <EventCard />
      {/* <Routes>
        <Route path="/volunteers" element={ <VolunteerPage />} />
      </Routes>
        
      <Footer /> */}
    </>
  );
}

export default App;
