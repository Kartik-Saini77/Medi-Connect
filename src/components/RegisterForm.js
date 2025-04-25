import { Link, useNavigate } from "react-router"; 
import { useState } from "react";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, name, email, password, phone }),
            });

            const data = await response.json(); 

            if (!response.ok) {
                throw new Error(data.message || "Failed to register user");
            }

           
             localStorage.setItem("token", data.token);

            navigate("/"); 
        } catch (err) {
            setError(err.message || "Something went wrong, please try again.");
            console.error("Registration error:", err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col flex-grow items-center justify-center bg-gray-100 px-4 py-6">
            <div className="w-full max-w-md mx-auto p-4 sm:p-5 border-2 rounded-xl bg-white shadow-md">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Register</h1>

                <label htmlFor="username" className="block mb-1 text-gray-700">Username:</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-10 border-2 rounded-sm mb-3 p-2" placeholder="Enter username" />

                <label htmlFor="name" className="block mb-1 text-gray-700">Name:</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-10 border-2 rounded-sm mb-3 p-2" placeholder="Enter full name" />

                <label htmlFor="email" className="block mb-1 text-gray-700">Email:</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-10 border-2 rounded-sm mb-3 p-2" placeholder="Enter email" />

                <label htmlFor="password" className="block mb-1 text-gray-700">Password:</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-10 border-2 rounded-sm mb-3 p-2" placeholder="Enter password" />

                <label htmlFor="phone" className="block mb-1 text-gray-700">Phone:</label>
                <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-10 border-2 rounded-sm mb-4 p-2" placeholder="Enter phone number" />

                <button onClick={handleRegister} disabled={isLoading} className="w-full h-10 bg-gray-800 text-white rounded-md hover:bg-gray-900">
                    {isLoading ? "Registering..." : "Register"}
                </button>

                {error && <p className="text-red-600 text-center mt-3">{error}</p>}
            </div>

            <Link to="/login" className="text-blue-800 mt-4 hover:underline">Already have an account? Login here</Link>
        </div>
    );
}
