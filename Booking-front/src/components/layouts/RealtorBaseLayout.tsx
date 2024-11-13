import { Outlet } from "react-router-dom";
import Footer from "components/Footer.tsx";
import ActivePageOnHeaderProvider from "components/contexts/ActivePageOnHeaderProvider/ActivePageOnHeaderProvider.tsx";
import "./../../css/realtor-base-layout.scss";
import RealtorHeader from "components/partials/realtor/RealtorHeader.tsx";

const RealtorBaseLayout = () => {
    return (
        <ActivePageOnHeaderProvider>
            <div className="realtor-base-layout">
                <RealtorHeader />
                <main className="main">
                    <Outlet />
                </main>
                <Footer />
            </div>
        </ActivePageOnHeaderProvider>
    );
};

export default RealtorBaseLayout;
