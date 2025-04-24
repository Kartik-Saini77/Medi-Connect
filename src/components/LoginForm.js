import { Link, useNavigate } from "react-router"
import { useState, useEffect } from "react";

export default function LoginForm() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('jwt');
        if(token) {
            navigate('/');
        }
    }, [navigate]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:3000/api/v1.0/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ emailOrUsername:email, password }),
        })

            const data = await response.json();
            console.log(data);

            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            localStorage.setItem('jwt', data.token);
            navigate('/');
        } catch (err) {
            setError("Something went wrong, please try again.");
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-100 px-4 py-6 p-4">
            <div className="w-full max-w-md mx-auto p-4 sm:p-5 border-2 rounded-xl">
                <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">Login</h1>
                <label htmlFor="email" className="text-gray-900 block mb-2">Username or Email:</label>
                <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-4 p-2" placeholder="Enter your username or email" />
                <label htmlFor="password" className="text-gray-900 block mb-2">Password:</label>
                <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full h-12 sm:h-10 border-2 rounded-sm mb-4 p-2" placeholder="Enter your password" />
                <input type="checkbox" id="showPassword" className="mb-4 size-4" onChange={() => setShowPassword(!showPassword)} />
                <label htmlFor="showPassword" className="text-gray-900 ml-2">Show Password</label>
                <button onClick={handleLogin} disabled={isLoading} className="w-full h-12 sm:h-10 bg-gray-800 text-white rounded-md mb-4 cursor-pointer">Login</button>
                {error && <p className="text-center">{error}</p>}
            </div>
            <Link to="/anonymous" className="sm:hidden w-full max-w-md h-12 border-2 rounded-xl text-gray-800 flex justify-center items-center mt-4">
                Continue Anonymously
            </Link>
        </div>
    )
}