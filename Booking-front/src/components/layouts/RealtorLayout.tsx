import Header from "components/partials/account/Header.tsx";
import Side from "components/partials/account/Side.tsx";
import {Link, Outlet} from "react-router-dom";

const RealtorLayout = () => {
    return (
        <main className="account-layout">
            <Header/>
            <Side/>
            <Outlet />
            {/*<Link to="/realtor/hotels/list">Список готелів</Link>*/}
        </main>
    );
};

export default RealtorLayout;
