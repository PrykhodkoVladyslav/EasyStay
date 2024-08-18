// import BottomNavigation from "components/blocks/BottomNavigation.tsx";
// import Footer from "components/blocks/Footer.tsx";
// import Header from "components/blocks/Header.tsx";
// import Subscribe from "components/blocks/Subscribe.tsx";
import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const Layout = () => {
    const navigate = useNavigate();
    const [hasRedirected, setHasRedirected] = useState(false);

    useEffect(() => {
        if (!hasRedirected) {
            navigate("/auth/login");
            setHasRedirected(true);
        }
    }, [hasRedirected, navigate]);

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
