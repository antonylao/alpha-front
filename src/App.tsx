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


function App() {
  return (
    <>
      <StickyNavbar />

      <Routes>
        <Route path="/" element={ <EventPage />} />
        <Route path="/volunteers" element={ <VolunteerPage />} />
        <Route path="/pending_requests" element={ <PendingRequestPage />} />
        <Route path="/comments" element={ <CommentPage />} />
        {/* Uncomment line below when events page is made */}
        {/* <Route path="/" element={<Navigate to="/events" replace />} /> */}
        <Route path="/signin" element={ <SignInPage /> } />

        <Route element={<PrivateRoute />} >
          <Route path="/volunteers" element={ <VolunteerPage />} />
        </Route>
        
        <Route path="*" element={ <NotFoundPage /> } />
      </Routes>
        
      <Footer />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );

}

export default App;
