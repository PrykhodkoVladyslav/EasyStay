import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/index.ts";
import { ToastContainer } from "react-toastify";

import App from "./App.tsx";
import "./css/fonts.scss";
import "./css/index.scss";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <App />
                <ToastContainer />
            </BrowserRouter>
        </Provider>
    </>,
);
