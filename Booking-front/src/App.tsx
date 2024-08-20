import ProtectedRoute from "components/guards/ProtectedRoute.tsx";
import AdminAuthLayout from "components/layouts/AdminAuthLayout.tsx";
import {Route, Routes} from "react-router-dom";
import Layout from "components/layouts/Layout.tsx";

import AdminLoginPage from "pages/AdminLoginPage.tsx";
import AdminCreatePage from "pages/AdminCreatePage.tsx";

import AdminLayout from "components/layouts/AdminLayout";
import HotelsPage from "pages/admin/hotel/HotelsPage";
import HotelCreatePage from "pages/admin/hotel/HotelCreatePage";
import UsersListPage from "pages/admin/user/UsersListPage";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout />}>
                {/*<Route index element={<HomePage />} />*/}
                {/*<Route path="hotel/:id" element={<HotelPage />} />*/}

                <Route element={<ProtectedRoute />}>
                    <Route path="admin" element={<AdminLayout />}>
                        <Route path="hotels">
                            <Route path="list" element={<HotelsPage />} />
                            <Route path="create" element={<HotelCreatePage />} />
                        </Route>

                        <Route path="users/list" element={<UsersListPage />} />
                        <Route path="createAdmin" element={<AdminCreatePage />}/>

                    </Route>

                </Route>

                <Route path="adminAuth" element={<AdminAuthLayout />}>
                    <Route path="login" element={<AdminLoginPage />}/>
                </Route>
            </Route>
        </Routes>
    )
}

export default App;
