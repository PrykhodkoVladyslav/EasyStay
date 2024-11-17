import { Route, Routes } from "react-router-dom";
import Layout from "components/layouts/Layout";

import ProtectedRoute from "components/guards/ProtectedRoute";

import LoginPage from "pages/auth/LoginPage";
import RegisterPage from "pages/auth/RegisterPage";
import ForgotPage from "pages/auth/ForgotPage";
import AuthLayout from "components/layouts/AuthLayout";
import SuccessSendPage from "pages/auth/SuccessSendPage.tsx";

import CustomerHomePage from "pages/customer/HomePage";

import RealtorPreLayout from "components/layouts/RealtorPreLayout";
import RealtorWithSideBarLayout from "components/layouts/RealtorWithSideBarLayout.tsx";
import RealtorHomePage from "pages/realtor/HomePage";
import RealtorDataPage from "pages/realtor/DataPage";
import RealtorHotelsPage from "pages/realtor/HotelsPage";
import RealtorReviewsPage from "pages/realtor/ReviewsPage";
import RealtorArchivedPage from "pages/realtor/ArchivedPage";

import CategoriesListPage from "pages/realtor/add/CategoriesListPage";
import AddHotelPage from "pages/realtor/add/HotelPage";
import AddRoomPage from "pages/realtor/add/RoomPage";

import EditHotelPage from "pages/realtor/edit/HotelPage";
// import EditRoomPage from "pages/realtor/edit/RoomPage";

import AdminLayout from "components/layouts/AdminLayout";
import HotelsListPage from "pages/admin/hotel/HotelsListPage";
import HotelsArchivedListPage from "pages/admin/hotel/HotelsArchivedListPage";
import CountriesPage from "pages/admin/country/CountriesPage";
import CountryCreatePage from "pages/admin/country/CountryCreatePage";
import CountryEditPage from "pages/admin/country/CountryEditPage";
import CitiesPage from "pages/admin/city/CitiesPage";
import CityCreatePage from "pages/admin/city/CityCreatePage";
import CityEditPage from "pages/admin/city/CityEditPage";

import CustomersListPage from "pages/admin/user/customer/CustomersListPage";
import RealtorsListPage from "pages/admin/user/realtor/RealtorsListPage";
import AdminCreatePage from "pages/admin/user/admin/AdminCreatePage";
import ResetPasswordPage from "pages/auth/ResetPasswordPage.tsx";
import CustomerLayout from "components/layouts/CustomerLayout.tsx";
import HotelsPage from "pages/customer/HotelsPage.tsx";
import HotelPage from "pages/customer/HotelPage.tsx";
import BookingPage from "pages/customer/BookingPage/BookingPage.tsx";
import RealtorPage from "pages/customer/RealtorPage.tsx";
import SignalRChatPage from "pages/shared/Chat/SignalRChatPage.tsx";
import RealtorBaseLayout from "components/layouts/RealtorBaseLayout.tsx";

function App() {
    const authPart = <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot" element={<ForgotPage />} />
        <Route path="success-send" element={<SuccessSendPage />} />
        <Route path="reset" element={<ResetPasswordPage />} />
    </Route>;

    const customersPart = <Route element={<CustomerLayout />}>
        <Route element={<ProtectedRoute allowedRoles={["Customer", "Unauthorized"]} />}>
            <Route index element={<CustomerHomePage />} />
            <Route path="hotels" element={<HotelsPage />} />
            <Route path="hotel/:id" element={<HotelPage />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
            <Route path="booking/:data" element={<BookingPage />} />
            <Route path="realtorPage/:id" element={<RealtorPage />} />
            <Route path="chat" element={<SignalRChatPage />} />
        </Route>
    </Route>;

    const realtorsPart = <Route element={<ProtectedRoute allowedRoles={["Realtor"]} />}>
        <Route path="realtor">
            <Route element={<RealtorPreLayout />}>
                <Route element={<RealtorBaseLayout />}>
                    <Route element={<RealtorWithSideBarLayout />}>
                        <Route index element={<RealtorHomePage />} />
                        <Route path="personal-data" element={<RealtorDataPage />} />
                        <Route path="hotels" element={<RealtorHotelsPage />} />
                        <Route path="reviews" element={<RealtorReviewsPage />} />
                        <Route path="archived" element={<RealtorArchivedPage />} />
                    </Route>

                    <Route path="chat" element={<SignalRChatPage />} />

                    <Route path="add">
                        <Route path="categories" element={<CategoriesListPage />} />
                        <Route path="hotel" element={<AddHotelPage />} />
                        <Route path="room" element={<AddRoomPage />} />
                    </Route>

                    <Route path="edit">
                        <Route path="hotel/:id" element={<EditHotelPage />} />
                        {/*<Route path="room/:id" element={<RoomEditPage />} />*/}
                    </Route>


                    <Route path="hotels">
                        <Route path="list" element={<HotelsPage />} />
                    </Route>
                </Route>
            </Route>
        </Route>
    </Route>;

    const adminsPart = <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
        <Route path="admin" element={<AdminLayout />}>
            <Route path="hotels">
                <Route path="list" element={<HotelsListPage />} />
                <Route path="archive" element={<HotelsArchivedListPage />} />
            </Route>
            <Route path="countries">
                <Route path="list" element={<CountriesPage />} />
                <Route path="create" element={<CountryCreatePage />} />
                <Route path="edit/:id" element={<CountryEditPage />} />
            </Route>
            <Route path="cities">
                <Route path="list" element={<CitiesPage />} />
                <Route path="create" element={<CityCreatePage />} />
                <Route path="edit/:id" element={<CityEditPage />} />
            </Route>

            <Route path="users">
                <Route path="customers/list" element={<CustomersListPage />} />
                <Route path="realtors/list" element={<RealtorsListPage />} />
                <Route path="createAdmin" element={<AdminCreatePage />} />
            </Route>
        </Route>
    </Route>;

    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {authPart}

                {customersPart}

                {realtorsPart}

                {adminsPart}
            </Route>
        </Routes>
    );
}

export default App;
