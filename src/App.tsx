import "./App.css";
import { Route, Routes } from "react-router-dom";
import VolunteerPage from "./Pages/VolonteerPage/VolonteerPage";
import EventPage from "./Pages/EventPage/Index/EventIndexPage";
import PendingRequestPage from "./Pages/PendingRequestPage/PendingRequestPage";
import CommentPage from "./Pages/CommentPage/CommentPage";
import StickyNavbar from "./Components/Navbar/Navbar"
import { Footer } from "./Components/Footer/Footer";


function App() {
  return (
    <>
      <StickyNavbar />

      <Routes>
        <Route path="/" element={ <EventPage />} />
        <Route path="/volunteers" element={ <VolunteerPage />} />
        <Route path="/pending_requests" element={ <PendingRequestPage />} />
        <Route path="/comments" element={ <CommentPage />} />
      </Routes>
        
      <Footer />

    </>
  );

}

export default App;
