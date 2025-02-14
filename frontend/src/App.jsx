import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { UserProvider } from "./context/userContext";
import ForgetPassword from "./pages/ForgetPassword";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";

function AppContent() {
    return (
        <div className="h-screen w-full bg-gray-100">
            <UserProvider>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/forget-password" element={<ForgetPassword />} />
                    <Route path="/reset-password/:token" element={<ResetPassword/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </UserProvider>
        </div>
    );
}

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
