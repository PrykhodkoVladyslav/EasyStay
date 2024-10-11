import { Outlet } from "react-router-dom";
import Footer from "components/Footer.tsx";
import CustomerHeader from "components/partials/customer/CustomerHeader.tsx";
import ActivePageOnHeaderProvider from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";

const CustomerLayout = () => {
    return (
        <ActivePageOnHeaderProvider>
            <div className="customer-layout">
                <CustomerHeader />
                <main className="main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ActivePageOnHeaderProvider>
    );
};

export default CustomerLayout;
