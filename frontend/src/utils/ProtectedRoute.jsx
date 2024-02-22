import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({
    canActivate,
    redirectPage = "/"
}) => {
    if(!canActivate) {
        return <Navigate to={redirectPage} replace/>
    }
    return <Outlet />
}

export default ProtectedRoute