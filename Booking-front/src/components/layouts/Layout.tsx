import { Outlet /*, useLocation, useNavigate*/ } from "react-router-dom";
// import { useEffect, useState } from "react";

const Layout = () => {
    // ToDo: Видалити дану логіку, коли буде верстатися головна сторінка.
    // const navigate = useNavigate();
    // const location = useLocation();
    // const [hasRedirected, setHasRedirected] = useState(false);
    //
    // useEffect(() => {
    //     if (location.pathname === "/" && !hasRedirected) {
    //         navigate("/auth/login");
    //         setHasRedirected(true);
    //     }
    // }, [location.pathname, hasRedirected, navigate]);

    return (
        <>
            {/*<AdminHeader />*/}
            <Outlet />
            {/*<BottomNavigation />*/}
            {/*<Subscribe />*/}
            {/*<Footer />*/}
        </>
    );
};

export default Layout;
