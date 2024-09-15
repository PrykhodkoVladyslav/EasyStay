import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAppSelector } from "store/index.ts";
import { getToken } from "store/slice/userSlice.ts";
import { checkToken } from "utils/checkToken.ts";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const location = useLocation();
    const token = useAppSelector(getToken);
    const payload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const role = payload ? payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] : null;

    if (!checkToken(token) || !allowedRoles.includes(role)) {
        return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
