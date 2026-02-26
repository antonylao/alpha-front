import "./App.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { EventIndex } from "./Pages/EventPage/Index/EventIndexPage";
import { EventCard } from "./Components/Card/EventCard/EventCard";
import EventDuplicatePage from './Pages/EventPage/Duplicate/EventDuplicatePage';
import EventEditPage from './Pages/EventPage/Edit/EventEditPage';
import { FormEvent } from "./Components/FormEvent/FormEvent";
// import EventPage from "./Pages/EventPage/Index/EventIndexPage";
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
import MyProfilePage from "./VOLUNTEER_FRONT/Pages/MyProfile/MyprofilePage";
// import VolonteerSignIn from "./Volonteers/Pages/SignInUpPage/SignInUpPage"

import { VolunteerEventPage } from "./VOLUNTEER_FRONT/Pages/Event/VOLUNTEEREventPage";
import { EventsAwaitingCommentPage } from "./VOLUNTEER_FRONT/Pages/EventsAwaitingComment/EventsAwaitingCommentPage";
import VolunteerNavbar from "./VOLUNTEER_FRONT/Components/Navbar/VolunteerNavbar";
import { SignInSignUpPage } from "./VOLUNTEER_FRONT/Pages/SignInUpPage/SignInSignUpPage";
import { useEffect, useState } from "react";
import { Switch, Tab, Tabs, TabsHeader, Typography } from "@material-tailwind/react";



// import { SearchBar } from "./Components/SearchBar/SearchBarEvent/SearchBar";
// import { Exemple } from "./Components/SearchBar/SearchBarEvent/Exemple";

function App() {
  //const [activeTab, setActiveTab] = useState("volunteer");
  const [activeTab, setActiveTab] = useState("volunteer");

  useEffect(() => {
    // Target the body element and set its background color
    if (activeTab === "volunteer") {
      document.body.style.backgroundColor = '#f0f4f8'; // Light blue-gray
      document.body.style.color = '#333'; // Optional: Set text color for contrast
    } else if (activeTab === "organizer") {
      document.body.style.backgroundColor = '#195C32'; // Light blue-gray
      document.body.style.color = '#fff'; // Optional: Set text color for contrast
    }

  }, [activeTab]);


  return (
    <>
      {/*for DEMO: switch organizer/volunteer space*/}
      {/*
      <div className="pb-10 ">
        <Typography variant="h3">Choisissez votre espace</Typography>
        <Tabs value={activeTab} >
          <TabsHeader className="bg-transparent flex items-center gap-5 text-white">
            <Tab key="organizer" value="organizer" onClick={() => setActiveTab("organizer")} >
              <Typography >Organisateur</Typography>
            </Tab>
            <Tab key="volunteer" value="volunteer" onClick={() => setActiveTab("volunteer")} >
              <Typography >Bénévole</Typography>
            </Tab>

          </TabsHeader >
        </Tabs >

      </div >
      */}

      <VolunteerNavbar />
      {/*{activeTab === 'volunteer' ? <VolunteerNavbar /> : <StickyNavbar />}*/}

      <Routes>
        {/* <Route path="/" element={ <EventPage />} /> */}

        {/* If using replace, the navigation will replace the current entry in the history stack instead of adding a new one. */}
        {/*DEMO change*/}
        <Route path="/" element={<Navigate to="/volunteer_front_events" replace />} />
        {/*original*/}
        {/*<Route path="/" element={<Navigate to="/signin" replace />} />*/}
        <Route path="/events" Component={EventCard} />
        <Route path="/signin" element={<SignInPage />} />


        <Route element={<PrivateRoute />} >
          <Route path="/create-event/" Component={FormEvent} />
          <Route path="/duplicate-event/:id" Component={EventDuplicatePage} />
          <Route path="/edit-event/:id" Component={EventEditPage} />

          <Route path="/volunteers" element={<VolunteerPage />} />
          <Route path="/pending_requests" element={<PendingRequestPage />} />
          <Route path="/comments" element={<CommentPage />} />
        </Route>

        {/* VOLUNTEER FRONT PAGES */}
        <Route path="/volunteer_front_events" element={<VolunteerEventPage />} />
        <Route path="/volunteer_front_events_awaiting_comment" element={<EventsAwaitingCommentPage />} />

        <Route path="/volunteer_signin" element={<SignInSignUpPage />} />
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
