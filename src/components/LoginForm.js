import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    // Optional: auto-redirect if token exists in cookie
    // useEffect(() => {
    //     const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    //     if (token) {
    //         navigate('/');
    //     }
    // }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", 
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            
            navigate("/");
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col flex-grow items-center justify-center bg-gray-100 px-4 py-6 p-4">
            <div className="w-full max-w-md mx-auto p-4 sm:p-5 border-2 rounded-xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Login</h1>
                <label htmlFor="email" className="text-gray-900 block mb-2">Email:</label>
                <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-12 sm:h-10 border-2 rounded-sm mb-4 p-2"
                    placeholder="Enter your email"
                />
                <label htmlFor="password" className="text-gray-900 block mb-2">Password:</label>
                <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 sm:h-10 border-2 rounded-sm mb-4 p-2"
                    placeholder="Enter your password"
                />
                <div className="flex items-center mb-4">
                    <input
                        type="checkbox"
                        id="showPassword"
                        className="size-4"
                        onChange={() => setShowPassword(!showPassword)}
                    />
                    <label htmlFor="showPassword" className="text-gray-900 ml-2">Show Password</label>
                </div>
                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className="w-full h-12 sm:h-10 bg-gray-800 text-white rounded-md mb-4 cursor-pointer"
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                {error && <p className="text-center text-red-600">{error}</p>}
            </div>
            <Link to="/register" className="text-blue-900 mt-4">Don't have an account? Register here</Link>
        </div>
    );
}
