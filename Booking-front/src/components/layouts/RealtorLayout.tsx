import Header from "components/partials/account/Header.tsx";
import Side from "components/partials/account/Side.tsx";
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
