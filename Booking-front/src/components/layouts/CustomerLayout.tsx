import { Outlet } from "react-router-dom";
import Footer from "components/Footer.tsx";
import CustomerHeader from "components/partials/customer/CustomerHeader.tsx";

const CustomerLayout = () => {
    return (
        <div className="customer-layout">
            <CustomerHeader />
            <main className="main">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default CustomerLayout;
