import Header from "components/partials/account/Header.tsx";
import Side from "components/partials/account/Side.tsx";
import { Outlet } from "react-router-dom";

const RealtorLayout = () => {
    return (
        <main className="account-layout">
            <Header/>
            <Side/>
            <Outlet/>

        </main>
    );
};

export default RealtorLayout;
