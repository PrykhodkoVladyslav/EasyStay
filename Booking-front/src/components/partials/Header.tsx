import {getPublicResourceUrl} from "utils/publicAccessor.ts";

const Header = () => {

    return (
        <header className="header">
            <img src={getPublicResourceUrl("logo/logo_EasyStay.svg")} alt="logo" className="site-logo"/>

        </header>
    );
};

export default Header;
