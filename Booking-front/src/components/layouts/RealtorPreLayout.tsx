import { RealtorActivePageProvider } from "components/contexts/RealtorActivePage.tsx";
import { Outlet } from "react-router-dom";

const RealtorPreLayout = () => {
    return (
        <RealtorActivePageProvider>
            <Outlet/>
        </RealtorActivePageProvider>
    );
};

export default RealtorPreLayout;
