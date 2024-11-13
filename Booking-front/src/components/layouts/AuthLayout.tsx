import { Outlet, useNavigate } from "react-router-dom";
import { getPublicResourceUrl } from "utils/publicAccessor.ts";
import VerticalPad from "components/ui/VerticalPad.tsx";
import "./../../css/auth-layout.scss";

const AuthLayout = () => {
    const navigate = useNavigate();

    return (
        <main className="auth-layout">
            <div className="half-width flex justify-center">
                <div className="half-width">
                    <div className="auth-header-block">
                        <img src={getPublicResourceUrl("logo/logo_EasyStay.svg")} alt="logo"
                             className="auth-logo pointer"
                             onClick={() => navigate("/")} />
                        <h2 className="auth-header">Відкривай цікаві місця з нами</h2>
                    </div>
                    <VerticalPad heightPx={38} />
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
            <div className="half-width auth-image-container">
                <img src={getPublicResourceUrl("images/auth/image.jpg")} alt="auth-image" className="auth-image" />
            </div>
        </main>
    );
};

export default AuthLayout;
