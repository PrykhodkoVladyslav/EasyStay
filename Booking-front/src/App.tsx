import ProtectedRoute from "components/guards/ProtectedRoute.tsx";
import { Route, Routes } from "react-router-dom";
import Layout from "components/layouts/Layout.tsx";

import LoginPage from "pages/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage.tsx";
import AuthLayout from "components/layouts/AuthLayout.tsx";

import AdminLayout from "components/layouts/AdminLayout";

import HotelsPage from "pages/admin/hotel/HotelsPage";
import HotelCreatePage from "pages/admin/hotel/HotelCreatePage";
import HotelEditPage from "pages/admin/hotel/HotelEditPage";
import HotelArchivePage from "pages/admin/hotel/HotelArchivePage";

import CountriesPage from "pages/admin/country/CountriesPage.tsx";
import CountryCreatePage from "pages/admin/country/CountryCreatePage.tsx";
import CountryEditPage from "pages/admin/country/CountryEditPage.tsx";

import CitiesPage from "pages/admin/city/CitiesPage.tsx";
import CityCreatePage from "pages/admin/city/CityCreatePage.tsx";
import CityEditPage from "pages/admin/city/CityEditPage.tsx";

import CustomersListPage from "pages/admin/user/customer/CustomersListPage.tsx";
import RealtorsListPage from "pages/admin/user/realtor/RealtorsListPage.tsx";
import AdminCreatePage from "pages/AdminCreatePage.tsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*<Route index element={<HomePage />} />*/}
                {/*<Route path="hotel/:id" element={<HotelPage />} />*/}

                <Route path="auth" element={<AuthLayout />}>
                    <Route path="login" element={<LoginPage />} />
                    <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route element={<ProtectedRoute />}>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="hotels">
                            <Route path="list" element={<HotelsPage />} />
                            <Route path="create" element={<HotelCreatePage />} />
                            <Route path="edit/:id" element={<HotelEditPage />} />
                            <Route path="archive" element={<HotelArchivePage />} />
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
