import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "store/index.ts";
import { getToken, getUser, getUserLocation } from "store/slice/userSlice.ts";
import { isValidToken } from "utils/isValidToken.ts";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const userLocation = useSelector(getUserLocation);
    const user = useAppSelector(getUser);
    const token = useAppSelector(getToken);
    const location = useLocation();
    const role = user
        ? user["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
        : "Unauthorized";

    if (!isValidToken(token) && role === "Unauthorized" && !allowedRoles.includes(role!))
        return <Navigate to={"/auth/login"} state={{ from: location }} replace />;

    if ((!isValidToken(token) && role !== "Unauthorized") || !allowedRoles.includes(role!))
        return <Navigate to={userLocation} state={{ from: location }} replace />;

    return <Outlet />;
};

export default ProtectedRoute;
