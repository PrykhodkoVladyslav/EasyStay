import { Route, Routes } from "react-router-dom";
import Layout from "components/layouts/Layout";

import HomePage from "pages/HomePage.tsx";
import ProtectedRoute from "components/guards/ProtectedRoute";

import LoginPage from "pages/LoginPage";
import RegisterPage from "pages/RegisterPage";
import AuthLayout from "components/layouts/AuthLayout";

import RealtorLayout from "components/layouts/RealtorLayout";

import RealtorHomePage from "pages/realtor/HomePage";
import RealtorDataPage from "pages/realtor/DataPage";
import RealtorHotelsPage from "pages/realtor/HotelsPage";
import RealtorReviewsPage from "pages/realtor/ReviewsPage";
import RealtorArchivedPage from "pages/realtor/ArchivedPage";
import RealtorDiscountPage from "pages/realtor/DiscountsPage";

import HotelsPage from "pages/realtor/hotel/HotelsPage";
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

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                {/*<Route path="hotel/:id" element={<HotelPage />} />*/}

                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>


                <Route element={<ProtectedRoute allowedRoles={['Realtor']} />}>
                    <Route path="realtor" element={<RealtorLayout />}>
                        <Route path="home" element={<RealtorHomePage />} />
                        <Route path="personal-data" element={<RealtorDataPage />} />
                        <Route path="hotels" element={<RealtorHotelsPage />} />
                        <Route path="reviews" element={<RealtorReviewsPage />} />
                        <Route path="archived" element={<RealtorArchivedPage />} />
                        <Route path="discounts" element={<RealtorDiscountPage />} />

                    </Route>
                    <Route path="hotels">
                        <Route path="list" element={<HotelsPage />} />
                        <Route path="create" element={<HotelCreatePage />} />
                        <Route path="edit/:id" element={<HotelEditPage />} />
                        <Route path="archive" element={<HotelsArchivedPage />} />
                    </Route>
                </Route>


                <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
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
