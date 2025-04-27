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

const App = () => {
    return (
        <div className="h-screen">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/new" element={<NewRequest />} />
                    <Route path="/done" element={<Done/>} />
                    <Route path="/requests" element={<Cards />} />
                    <Route path="/volunteers" element={<VolunteerForm/>} />
                    <Route path="/contacts" element={<Cont/>} />
                    <Route path="/donate" element={<Donate />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);