import Header from "components/partials/realtor/Header.tsx";
import Side from "components/partials/realtor/Side.tsx";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer.tsx";
import { RealtorActivePageProvider } from "components/contexts/RealtorActivePage.tsx";

const RealtorLayout = () => {
    return (
        <RealtorActivePageProvider>
            <main className="account-layout">
                <Header/>
                <div className="body-container">
                    <Side/>
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </RealtorActivePageProvider>
    );
};

export default RealtorLayout;
