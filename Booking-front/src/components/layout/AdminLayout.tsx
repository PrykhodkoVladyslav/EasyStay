// import AuthFooter from "components/blocks/AuthFooter.tsx";
// import AuthHeader from "components/blocks/AuthHeader.tsx";
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
