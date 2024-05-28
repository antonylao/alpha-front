import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { EventIndex } from "./Pages/EventPage/Index/EventIndexPage";
import { EventCard } from "./Components/Card/EventCard/EventCard";
import EventDuplicatePage from './Pages/EventPage/Duplicate/EventDuplicatePage';
import EventEditPage from './Pages/EventPage/Edit/EventEditPage';
import { FormEvent } from "./Components/FormEvent/FormEvent";
import EventPage from "./Pages/EventPage/Index/EventIndexPage";
import PendingRequestPage from "./Pages/PendingRequestPage/PendingRequestPage";
import CommentPage from "./Pages/CommentPage/CommentPage";
import StickyNavbar from "./Components/Navbar/Navbar"
import { Footer } from "./Components/Footer/Footer";
import { Navigate } from "react-router-dom";
import NotFoundPage from "./services/utils/NotFoundPage";
import PrivateRoute from "./services/utils/PrivateRoute";
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import VolunteerPage from "./Pages/VolunteerPage/VolunteerPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import  VolonteerSignIn  from "./VOLUNTEER_FRONT/Pages/SignInUpPage/SignInUpPage"
import MyProfilePage from "./VOLUNTEER_FRONT/Pages/MyProfile/MyprofilePage";
// import VolonteerSignIn from "./Volonteers/Pages/SignInUpPage/SignInUpPage"

import { VolunteerEventPage } from "./VOLUNTEER_FRONT/Pages/Event/VOLUNTEEREventPage";
import { EventsAwaitingComment } from "./VOLUNTEER_FRONT/Pages/EventsAwaitingComment/EventsAwaitingComment";
import VolunteerNavbar from "./VOLUNTEER_FRONT/Components/Navbar/VolunteerNavbar";



// import { SearchBar } from "./Components/SearchBar/SearchBarEvent/SearchBar";
// import { Exemple } from "./Components/SearchBar/SearchBarEvent/Exemple";

function App() {
  return (
    <>

      <StickyNavbar />
      <VolunteerNavbar />

      <Routes>
        {/* <Route path="/" element={ <EventPage />} /> */}

        {/* If using replace, the navigation will replace the current entry in the history stack instead of adding a new one. */}
        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/signin" element={<SignInPage />} />

      
        <Route element={<PrivateRoute />} >
        <Route path="/events" Component={EventCard} />
      <Route path="/create-event/" Component={FormEvent} />
      <Route path="/duplicate-event/:id" Component={EventDuplicatePage} />
      <Route path="/edit-event/:id" Component={EventEditPage} />

          <Route path="/volunteers" element={<VolunteerPage />} />
          <Route path="/pending_requests" element={<PendingRequestPage />} />
          <Route path="/comments" element={<CommentPage />} />
        </Route>

        {/* VOLUNTEER FRONT PAGES */}
        <Route path="/volunteer_front_events" element={<VolunteerEventPage />} />
        <Route path="/volunteer_front_events_awaiting_comment" element={<EventsAwaitingComment />} />
        <Route path="/volonteer_signin" element={<VolonteerSignIn />} />
        <Route path="/my_profile" element={<MyProfilePage />} />

        {/* not defined paths */}
        <Route path="*" element={<NotFoundPage />} />



      </Routes>

      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />

    </>
  );
}

export default App;
