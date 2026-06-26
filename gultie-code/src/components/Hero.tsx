import { useNavigate } from "react-router-dom";
import Button from "./common/Button";
import Logo from "./common/Logo";

const Hero = ()=>{
    const navigate = useNavigate();

    return(
        <>
        <section className="bg-surface min-h-screen text-white flex justify-center" >
            <div className="px-4 flex flex-col items-center text-center justify-center" >
                <Logo/>
                <p className="text-xl text-muted mb-4">Learn, Build, and Grow.</p>
                <h1 className="text-4xl text-black font-bold mb-4">Welcome to Gultie Code</h1>
                <p className="max-w-2xl mx-auto text-lg text-muted mb-8">Master Coding through structured learning paths, blogs, and community-driven growth.</p>
                <div className="flex flex-wrap justify-center gap-4">
                    <Button text="Register" variant="primary" onClick={() => navigate("/register")} />
                    <Button text="Login" variant="secondary" onClick={() => navigate("/login")} />
                </div>
            </div>
        </section>
        </>
    );
}

export default Hero;