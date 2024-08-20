// import AdminAuthHeader from "components/blocks/AdminAuthHeader.tsx";
// import AdminAuthHeader from "components/blocks/AdminAuthHeader.tsx";
import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
    return (
        <>
            {/*<AdminAuthHeader />*/}
            <Outlet />
            {/*<AdminAuthFooter />*/}
        </>
    );
};

export default AdminAuthLayout;
