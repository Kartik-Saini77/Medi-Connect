import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Home from "./components/Home";
import Cards from "./components/Cards";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import VolunteerForm from "./components/VolunteerForm";
import NewRequest from "./components/NewRequest";
import Done from "./components/Done";
import Cont from "./components/Cont";
import Donate from "./components/Donate";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
    return (
        <div className="h-screen">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/new" element={<ProtectedRoute><NewRequest /></ProtectedRoute>} />
                    <Route path="/done" element={<ProtectedRoute><Done/></ProtectedRoute>} />
                    <Route path="/requests" element={<ProtectedRoute><Cards /></ProtectedRoute>} />
                    <Route path="/volunteers" element={<ProtectedRoute><VolunteerForm/></ProtectedRoute>} />
                    <Route path="/contacts" element={<ProtectedRoute><Cont/></ProtectedRoute>} />
                    <Route path="/donate" element={<ProtectedRoute><Donate /></ProtectedRoute>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);