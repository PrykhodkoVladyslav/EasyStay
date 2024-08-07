import './App.css'
import {Route, Routes} from "react-router-dom";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route index element={<HomePage/>}/>
                <Route path="*" element={<NotFoundPage/>}/>
            </Route>

            <Route path="/admin" element={<AccountLayout/>}>

            </Route>

            <Route path="/Rieltor" element={<AccountLayout/>}>

            </Route>

            <Route path="/user" element={<AccountLayout/>}>

            </Route>

            <Route path="/auth/" element={<AccountLayout/>}>
                <Route path="login" element={<LoginPage/>}/>
                <Route path="register" element={<RegisterPage/>}/>
            </Route>
        </Routes>
    )
}

export default App
