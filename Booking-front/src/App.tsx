import ProtectedRoute from "components/guards/ProtectedRoute.tsx";
import AccountLayout from "components/layouts/AccountLayout.tsx";
import {Route, Routes} from "react-router-dom";
import Layout from "components/layouts/Layout.tsx";

import LoginPage from "pages/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage.tsx";

import AdminLayout from "components/layouts/AdminLayout";
import HotelsPage from "./pages/admin/hotel/HotelsPage";
import HotelCreatePage from "./pages/admin/hotel/HotelCreatePage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*<Route index element={<HomePage />} />*/}
                {/*<Route path="hotel/:id" element={<HotelPage />} />*/}

                <Route element={<ProtectedRoute />}>
                    <Route path="/admin" element={<AdminLayout />}>
                        <Route path="hotels">
                            <Route path="list" element={<HotelsPage />} />
                            <Route path="create" element={<HotelCreatePage />} />
                        </Route>
                    </Route>

                </Route>

                <Route path="auth" element={<AccountLayout />}>
                    <Route path="login" element={<LoginPage />}/>
                    <Route path="register" element={<RegisterPage />}/>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;
