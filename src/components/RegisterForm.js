import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";

export default function RegisterForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    //     if(token) {
    //         navigate('/');
    //     }
    // }, [navigate]);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            console.log("Logging in with email:", email, "and password:", password);
            const response = await fetch("http://localhost:3000/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username, name, email, password, phone }),
            });
            console.log("Response from server:", response);

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to Register User");
            }

            // Set the token in cookies
            // document.cookie = `token=${data.token}`;
            navigate("/");
        } catch (err) {
            setError(err.message || "Something went wrong, please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col flex-grow items-center justify-center bg-gray-100 px-4 py-6 p-4">
            <div className="w-full max-w-md mx-auto p-4 sm:p-5 border-2 rounded-xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Register</h1>
                <label htmlFor="username" className="text-gray-900 block">Username:</label>
                <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-2 p-2" placeholder="Enter your username" />
                <label htmlFor="name" className="text-gray-900 block">Name:</label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-2 p-2" placeholder="Enter your name" />
                <label htmlFor="email" className="text-gray-900 block">Email:</label>
                <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-2 p-2" placeholder="Enter your email" />
                <label htmlFor="password" className="text-gray-900 block">Password:</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-2 p-2" placeholder="Enter your password" />
                <label htmlFor="phone" className="text-gray-900 block">Phone:</label>
                <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-4 p-2" placeholder="Enter your phone number" />
                <button onClick={handleRegister} disabled={isLoading} className="w-full h-12 sm:h-10 bg-gray-800 text-white rounded-md mb-4 cursor-pointer">Register</button>
                {error && <p className="text-center">{error}</p>}
            </div>
            <Link to="/login" className="text-blue-900 mt-4">Already have an account? Login here</Link>
        </div>
    )
}