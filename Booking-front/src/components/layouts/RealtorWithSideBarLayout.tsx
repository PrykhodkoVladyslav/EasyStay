import Side from "components/partials/realtor/Side.tsx";
import { Outlet } from "react-router-dom";

const RealtorWithSideBarLayout = () => {
    return (
        <div className="account-layout">
            <Side />
            <Outlet />
        </div>
    );
};

export default RealtorWithSideBarLayout;
