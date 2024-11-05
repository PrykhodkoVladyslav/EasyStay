import { Route, Routes } from "react-router-dom";
import Layout from "components/layouts/Layout";


import ProtectedRoute from "components/guards/ProtectedRoute";

import LoginPage from "pages/auth/LoginPage";
import RegisterPage from "pages/auth/RegisterPage";
import ForgotPage from "pages/auth/ForgotPage";
import AuthLayout from "components/layouts/AuthLayout";
import SuccessSendPage from "pages/auth/SuccessSendPage.tsx";

import CustomerHomePage from "pages/customer/HomePage";

import RealtorLayout from "components/layouts/RealtorLayout";
import RealtorHomePage from "pages/realtor/HomePage";
import RealtorDataPage from "pages/realtor/DataPage";
import RealtorHotelsPage from "pages/realtor/HotelsPage";
import RealtorReviewsPage from "pages/realtor/ReviewsPage";
import RealtorArchivedPage from "pages/realtor/ArchivedPage";

import AddLayout from "components/layouts/AddLayout";
import CategoriesListPage from "pages/realtor/add/CategoriesListPage";
import AddHotelPage from "pages/realtor/add/HotelPage";
import AddRoomPage from "pages/realtor/add/RoomPage";

import HotelCreatePage from "pages/realtor/hotel/HotelCreatePage";
import HotelEditPage from "pages/realtor/hotel/HotelEditPage";
import HotelsArchivedPage from "pages/realtor/hotel/HotelsArchivedPage";

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
import BookingPage from "pages/customer/BookingPage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route element={<CustomerLayout />}>
                    <Route element={<ProtectedRoute allowedRoles={["Customer", "Unauthorized"]} />}>
                        <Route index element={<CustomerHomePage />} />
                        <Route path="hotels" element={<HotelsPage />} />
                        <Route path="hotel/:id" element={<HotelPage />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={["Customer"]} />}>
                        <Route path="booking/:data" element={<BookingPage />} />
                    </Route>
                </Route>

                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                    <Route path="forgot" element={<ForgotPage />} />
                    <Route path="success-send" element={<SuccessSendPage />} />
                    <Route path="reset" element={<ResetPasswordPage />} />
                </Route>

                <Route element={<ProtectedRoute allowedRoles={["Realtor"]} />}>
                    <Route path="realtor" element={<RealtorLayout />}>
                        <Route index element={<RealtorHomePage />} />
                        <Route path="personal-data" element={<RealtorDataPage />} />
                        <Route path="hotels" element={<RealtorHotelsPage />} />
                        <Route path="reviews" element={<RealtorReviewsPage />} />
                        <Route path="archived" element={<RealtorArchivedPage />} />
                        <Route path="edit/:id" element={<HotelEditPage />} />
                    </Route>

                    <Route path="add" element={<AddLayout />}>
                        <Route path="categories" element={<CategoriesListPage />} />
                        <Route path="hotel" element={<AddHotelPage />} />
                        <Route path="room" element={<AddRoomPage />} />
                    </Route>


                    <Route path="hotels">
                        <Route path="list" element={<HotelsPage />} />
                        <Route path="create" element={<HotelCreatePage />} />
                        <Route path="archive" element={<HotelsArchivedPage />} />
                    </Route>
                </Route>


                <Route element={<ProtectedRoute allowedRoles={["Admin"]} />}>
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
                </Route>

            </Route>
        </Routes>
    );
}

export default App;
