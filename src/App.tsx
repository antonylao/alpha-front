import "./App.css";
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
    
      <Routes>
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
