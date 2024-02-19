import { Outlet, Navigate } from "react-router-dom"

export default function PrivateRoute() {

    const auth = { token : true };

    return auth.token ? <Outlet /> : <Navigate to="/signin" />
}