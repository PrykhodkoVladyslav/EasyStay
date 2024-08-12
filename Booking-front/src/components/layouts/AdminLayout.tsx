// import AuthHeader from "components/blocks/AdminHeader.tsx";
// import AuthFooter from "components/blocks/AdminFooter.tsx";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
    return (
        <>
            {/*<AdminHeader />*/}
            <Outlet />
            {/*<AdminFooter />*/}
        </>
    );
};

export default AdminLayout;
