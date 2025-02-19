import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Header from "./components/Header";
import Body from "./components/Body";
import Cards from "./components/Cards";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<Body />} />
                    <Route path="/Requests" element={<Cards />} />
                    <Route path="/Volunteers" element={<></>} />
                    <Route path="/Contacts" element={<></>} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);