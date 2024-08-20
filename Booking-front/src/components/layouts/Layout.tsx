// import BottomNavigation from "components/blocks/BottomNavigation.tsx";
// import Footer from "components/blocks/Footer.tsx";
// import Header from "components/blocks/Header.tsx";
// import Subscribe from "components/blocks/Subscribe.tsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        if (location.pathname === "/" && !hasRedirected) {
            navigate("/adminAuth/login");
            setHasRedirected(true);
        }
    }, [location.pathname, hasRedirected, navigate]);

    return (
        <>
            {/*<Header />*/}
            <Outlet />
            {/*<BottomNavigation />*/}
            {/*<Subscribe />*/}
            {/*<Footer />*/}
        </>
    );
};

export default Layout;
