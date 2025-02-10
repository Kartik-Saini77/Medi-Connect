import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Body from "./components/Body";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/Contacts" element={<></>} />
                    <Route path="/Volunteers" element={<></>} />
                    <Route path="/Requests" element={<></>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);