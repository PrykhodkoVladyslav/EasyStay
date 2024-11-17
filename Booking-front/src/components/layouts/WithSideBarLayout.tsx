import { Outlet } from "react-router-dom";
import CustomerSide from "components/partials/customer/CustomerSide.tsx";
import RealtorSide from "components/partials/realtor/RealtorSide.tsx";

const WithSideBarLayout = ({ role }: { role: "Customer" | "Realtor" }) => {
    return (
        <div className="account-layout">
            {role === "Customer" ? <CustomerSide /> : <RealtorSide />}
            <Outlet />
        </div>
    );
};

export default WithSideBarLayout;