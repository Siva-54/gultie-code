import Button from "../components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authServices";

const Register = () =>{
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async (
        e: React.SubmitEvent
    ) => {

        e.preventDefault();

        try {

            const data =
                await registerUser(
                    username,
                    email,
                    password
                );

            alert(
                "Registration successful"
            );

            console.log(data);

            navigate("/login");

        } catch (error) {

            console.error(error);

        }
    };

    return( 
        <div className="min-h-screen flex items-center justify-center bg-app text-black dark:text-white">
            <div className="bg-surface p-8 rounded shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register for Gultie Code</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-muted mb-2">Username</label>
                        <input 
                            type="text" 
                            id="username" 
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-700" 
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-muted mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300 dark:focus:border-blue-700" 
                            placeholder="Enter your email"
                            value={email}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button text="Register" type="submit" variant="primary" className="w-full" />
                </form>
                <div className="text-center text-muted mt-4">
                    <p>Continue with google? <Button text="Google" variant="secondary" className="inline-block ml-2" /></p>
                </div>
                <div className="text-center text-muted mt-4"> 
                    <p className="inline-block">Already have an account? <Button text="Login" variant="secondary" onClick={() => navigate("/login")} className="inline-block ml-2" /></p>
                </div>
            </div>
        </div>
    );

}

export default Register;