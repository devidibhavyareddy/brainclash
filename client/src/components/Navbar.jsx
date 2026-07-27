import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./common/Logo";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <nav className="flex items-center justify-between px-8 py-5 bg-white/10 backdrop-blur-xl border-b border-white/10">

            <Logo />

            <div className="flex items-center gap-6">

                <span className="text-white font-semibold">

                    👋 {user?.name}

                </span>

                <button

                    onClick={handleLogout}

                    className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl text-white font-semibold transition"

                >

                    Logout

                </button>

            </div>

        </nav>

    );

};

export default Navbar;