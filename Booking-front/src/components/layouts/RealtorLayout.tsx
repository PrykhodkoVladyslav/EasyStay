import Header from "components/partials/realtor/Header.tsx";
import Side from "components/partials/realtor/Side.tsx";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer.tsx";

const RealtorLayout = () => {
    return (
        <>
            <main className="account-layout">
                <Header/>
                <div className="body-container">
                    <Side/>
                    <Outlet/>
                </div>
            </main>
            <Footer/>
        </>
    );
};

export default RealtorLayout;
