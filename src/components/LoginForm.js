import { Link, useNavigate } from "react-router"; 
import { useState, useEffect } from "react";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include", // ✅ send cookies
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            navigate("/new");
        } catch (err) {
            setError(err.message || "Something went wrong. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center bg-gray-100 px-4 py-6">
            <div className="w-full max-w-md p-6 border-2 rounded-xl bg-white">
                <h1 className="text-3xl font-bold text-center mb-6">Login</h1>

                <form onSubmit={handleLogin}>
                    <label htmlFor="email" className="block mb-2 text-gray-700">Email:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                        placeholder="Enter your email"
                        required
                    />

                    <label htmlFor="password" className="block mb-2 text-gray-700">Password:</label>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded p-2 mb-4"
                        placeholder="Enter your password"
                        required
                    />

                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="showPassword" onChange={() => setShowPassword(!showPassword)} />
                        <label htmlFor="showPassword" className="ml-2 text-gray-700">Show Password</label>
                    </div>

                    <button type="submit" disabled={isLoading} className="w-full bg-gray-800 text-white rounded p-2">
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
                </form>

                <div className="text-center mt-6">
                    <Link to="/register" className="text-blue-700 hover:underline">Don't have an account? Register here</Link>
                </div>
            </div>
        </div>
    );
}
