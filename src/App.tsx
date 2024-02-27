import "./App.css";
import EventPage from "./Pages/EventPage/Index/EventIndexPage";
import PendingRequestPage from "./Pages/PendingRequestPage/PendingRequestPage";
import CommentPage from "./Pages/CommentPage/CommentPage";
import StickyNavbar from "./Components/Navbar/Navbar"
import { Footer } from "./Components/Footer/Footer";
import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "./services/utils/NotFoundPage";
import PrivateRoute from "./services/utils/PrivateRoute";
import { SignInPage } from "./Pages/SignInPage/SignInPage";
import VolunteerPage from "./Pages/VolunteerPage/VolunteerPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import VolonteerSignIn from "./Volonteers/Pages/SignInUpPage/SignInUpPage"
import MyProfilePage from "./Volonteers/Pages/MyProfile/MyprofilePage";

import { VolunteerEventPage } from "./VOLUNTEER_FRONT/Pages/Event/VOLUNTEEREventPage";
import { EventsAwaitingComment } from "./VOLUNTEER_FRONT/Pages/EventsAwaitingComment/EventsAwaitingComment";
import VolunteerNavbar from "./VOLUNTEER_FRONT/Components/Navbar/VolunteerNavbar";


function App() {
  return (
    <>
      <StickyNavbar />
      <VolunteerNavbar />

      <Routes>
        {/* <Route path="/" element={ <EventPage />} /> */}

        <Route path="/" element={<Navigate to="/events" replace />} />
        <Route path="/signin" element={<SignInPage />} />

        <Route element={<PrivateRoute />} >
          <Route path="/events" element={<EventPage />} />
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
