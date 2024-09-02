import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "store/index.ts";
import { ToastContainer } from "react-toastify";
import ThemeProvider from "utils/contexts/ThemeContext.tsx";

import App from "./App.tsx";
import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <>
        <Provider store={store}>
            <BrowserRouter>
                <ThemeProvider>
                    <App />
                    <ToastContainer />
                </ThemeProvider>
            </BrowserRouter>
        </Provider>
    </>,
);
