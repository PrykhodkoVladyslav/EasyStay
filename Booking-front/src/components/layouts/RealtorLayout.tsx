import Header from "components/partials/Header.tsx";
import {Link, Outlet} from "react-router-dom";

const RealtorLayout = () => {
    return (
        <main className="account-layout">
            <Header/>
            {/*<Outlet />*/}
            {/*<Link to="/realtor/hotels/list">Список готелів</Link>*/}
        </main>
    );
};

export default RealtorLayout;
