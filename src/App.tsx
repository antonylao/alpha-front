import "./App.css";
import { Footer } from "./Components/Footer/Footer";
import VolunteerPage from "./Pages/VolonteerPage/VolonteerPage";
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <>
      <Routes>
        <Route path="/volunteers" element={ <VolunteerPage />} />
      </Routes>
        
      <Footer />

    </>
  );

}

export default App;
