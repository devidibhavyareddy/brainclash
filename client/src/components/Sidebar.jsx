import { NavLink, useNavigate } from "react-router-dom";
import {
    FaHome,
    FaPlusCircle,
    FaQuestionCircle,
    FaPlayCircle,
    FaHistory,
    FaSignOutAlt
} from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import Logo from "./common/Logo";

const Sidebar = ({ role }) => {

    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    const trainerLinks = [

        {
            name: "Dashboard",
            path: "/trainer/dashboard",
            icon: <FaHome />
        },

        {
            name: "Create Quiz",
            path: "/trainer/create-quiz",
            icon: <FaPlusCircle />
        },

        {
            name: "My Quizzes",
            path: "/trainer/quizzes",
            icon: <FaQuestionCircle />
        },

        {
            name: "Start Quiz",
            path: "/trainer/start-quiz",
            icon: <FaPlayCircle />
        }

    ];

    const studentLinks = [

        {
            name: "Dashboard",
            path: "/student/dashboard",
            icon: <FaHome />
        },

        {
            name: "Join Quiz",
            path: "/student/join",
            icon: <FaPlayCircle />
        },

        {
            name: "Previous Results",
            path: "/student/history",
            icon: <FaHistory />
        }

    ];

    const links = role === "trainer"

        ? trainerLinks

        : studentLinks;

    return (

        <aside className="w-72 min-h-screen bg-white/10 backdrop-blur-2xl border-r border-white/10 text-white flex flex-col">

            {/* Logo */}

            <div className="flex justify-center py-8">

                <Logo />

            </div>

            {/* Navigation */}

            <div className="flex-1 px-5">

                {

                    links.map((item) => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-4 px-5 py-4 rounded-2xl mb-3 transition-all duration-300 ${

                                    isActive

                                        ? "bg-gradient-to-r from-cyan-500 to-indigo-600 shadow-lg"

                                        : "hover:bg-white/10"

                                }`

                            }

                        >

                            <span className="text-xl">

                                {item.icon}

                            </span>

                            <span className="font-semibold">

                                {item.name}

                            </span>

                        </NavLink>

                    ))

                }

            </div>

            {/* Logout */}

            <div className="p-5">

                <button

                    onClick={handleLogout}

                    className="w-full flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 py-3 rounded-2xl font-semibold transition"

                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </aside>

    );

};

export default Sidebar;