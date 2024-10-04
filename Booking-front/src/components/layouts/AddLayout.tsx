import Header from "components/partials/account/Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "components/Footer.tsx";

const AddLayout = () => {
    return (
        <>
            <main className="account-layout">
                <Header/>
                <Outlet/>
            </main>
            <Footer/>
        </>
    );
};

export default AddLayout;
