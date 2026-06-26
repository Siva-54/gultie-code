import Button from "../components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authServices";
import { useAuth } from "../contexts/AuthContext";

const Login = () =>{
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { login } = useAuth();

    const handleLogin = async (
        e: React.SubmitEvent
    ) => {

        e.preventDefault();

        setError("");

        setLoading(true);

        try {

            const data =
                await loginUser(
                    Email,
                    Password
                );

            await login(
                data.access_token
            );

            navigate("/dashboard");

        } catch (error: any) {

            setError(
                error.message
            );

        } finally {

            setLoading(false);

        }
    };
    
    return(
        <div className="min-h-screen flex items-center justify-center bg-app text-black dark:text-white">
            <div className="bg-surface p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Gultie Code</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-muted mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-700" 
                            placeholder="Enter your email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-muted mb-2">Password</label>
                        <input 
                            type="password" 
                            id="password" 
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-700" 
                            placeholder="Enter your password"
                            value={Password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    {
                        error && (
                            <div
                                className="
                                    mb-4
                                    p-3
                                    rounded
                                    bg-red-100
                                    text-red-700
                                    dark:bg-red-900
                                    dark:text-red-200
                                "
                            >
                                {error}
                            </div>
                        )
                    }
                    <Button
                        text={
                            loading
                                ? "Logging in..."
                                : "Login"
                        }
                        type="submit"
                        variant="primary"
                        className="w-full"
                    />
                </form>
                <p className="text-center text-muted mt-4">
                    No account? <Button text="Register" variant="secondary" onClick={() => navigate("/register")} className="inline-block ml-2" />
                </p>
            </div>
        </div>
    )
}

export default Login;