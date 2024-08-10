import AccountLayout from "components/layout/AccountLayout.tsx";
import {Route, Routes} from "react-router-dom";

import LoginPage from "pages/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage.tsx";

import AdminLayout from "components/layout/AdminLayout";
import AdminLogin from "pages/AdminLogin.tsx";
import AdminPanelPage from "pages/AdminPanelPage.tsx";

function App() {
    return (
        <Routes>

            <Route path="/admin/" element={<AdminLayout/>}>
                <Route path="login" element={<AdminLogin />}/>
                <Route path="panel" element={<AdminPanelPage />}/>
            </Route>

            {/*<Route path="/auth/" element={<AccountLayout />}>*/}
            {/*    <Route path="login" element={<LoginPage />}/>*/}
            {/*    <Route path="register" element={<RegisterPage />}/>*/}
            {/*</Route>*/}
        </Routes>
    )
}

export default App;
