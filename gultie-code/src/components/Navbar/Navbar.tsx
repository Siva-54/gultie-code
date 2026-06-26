import Logo from "../common/Logo";
import Navlinks from "./Navlinks";
import UserActions from "./UserActions";

const Navbar = () => {
    return (
        <nav className="bg-surface text-black dark:text-white shadow-md">
            <div className="mx-auto px-4 py-4">
                <div className="flex justify-between items-center ">
                    <Logo className="h-10 w-10 text-xl" />
                    <Navlinks />
                    <UserActions />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;