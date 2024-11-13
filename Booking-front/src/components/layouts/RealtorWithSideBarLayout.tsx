import Side from "components/partials/realtor/Side.tsx";
import { Outlet } from "react-router-dom";
import { RealtorActivePageProvider } from "components/contexts/RealtorActivePage.tsx";

const RealtorWithSideBarLayout = () => {
    return (
        <RealtorActivePageProvider>
            <div className="account-layout">
                <Side />
                <Outlet />
            </div>
        </RealtorActivePageProvider>
    );
};

export default RealtorWithSideBarLayout;
