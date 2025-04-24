import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Body from "./components/Body";
import Cards from "./components/Cards";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

const App = () => {
    return (
        <div className="h-screen">
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm/>} />
                    <Route path="/requests" element={<Cards />} />
                    <Route path="/volunteers" element={<></>} />
                    <Route path="/contacts" element={<></>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);