import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaGamepad,
    FaUsers,
    FaChartLine,
    FaBolt,
    FaTrophy,
    FaArrowRight
} from "react-icons/fa";

import Logo from "../components/common/Logo";
import BackgroundAnimation from "../components/common/BackgroundAnimation";

const features = [
    {
        icon: <FaBolt />,
        title: "Live Quiz",
        description: "Host quizzes with real-time questions and timers."
    },
    {
        icon: <FaUsers />,
        title: "Waiting Room",
        description: "Approve students before the quiz begins."
    },
    {
        icon: <FaChartLine />,
        title: "Analytics",
        description: "Track scores and performance instantly."
    },
    {
        icon: <FaTrophy />,
        title: "Leaderboard",
        description: "Compete and rank against other students."
    }
];

const Landing = () => {

    return (

        <>
            <BackgroundAnimation />

            <div className="min-h-screen text-white">

                {/* Navbar */}

                <nav className="flex justify-between items-center px-10 py-6">

                    <Logo />

                    <div className="flex gap-4">

                        <Link
                            to="/login"
                            className="px-6 py-3 rounded-xl hover:bg-white/10 transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/register"
                            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold transition"
                        >
                            Register
                        </Link>

                    </div>

                </nav>

                {/* Hero */}

                <section className="grid lg:grid-cols-2 gap-10 items-center px-10 py-20">

                    <motion.div
                        initial={{ x: -80, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.7 }}
                    >

                        <h1 className="text-6xl font-black leading-tight">

                            Learn
                            <br />
                            Play
                            <br />
                            Win 🏆

                        </h1>

                        <p className="mt-8 text-xl text-gray-300">

                            BrainClash is an interactive quiz platform where
                            trainers create quizzes, students compete live,
                            and everyone enjoys real-time leaderboards,
                            instant scoring, and engaging learning.

                        </p>

                        <div className="mt-10 flex gap-5">

                            <Link
                                to="/login"
                                className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition"
                            >

                                Get Started

                                <FaArrowRight />

                            </Link>

                            <Link
                                to="/register"
                                className="border border-white hover:bg-white/10 px-8 py-4 rounded-2xl transition"
                            >

                                Create Account

                            </Link>

                        </div>

                    </motion.div>

                    <motion.div
                        animate={{
                            y: [0, -20, 0]
                        }}
                        transition={{
                            repeat: Infinity,
                            duration: 3
                        }}
                        className="flex justify-center"
                    >

                        <FaGamepad className="text-[280px] text-cyan-400 opacity-90" />

                    </motion.div>

                </section>

                {/* Features */}

                <section className="px-10 pb-20">

                    <h2 className="text-4xl font-bold text-center mb-14">

                        Why Choose BrainClash?

                    </h2>

                    <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">

                        {features.map((feature, index) => (

                            <motion.div
                                key={index}
                                whileHover={{
                                    scale: 1.05,
                                    y: -8
                                }}
                                className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10"
                            >

                                <div className="text-5xl text-cyan-400">

                                    {feature.icon}

                                </div>

                                <h2 className="text-2xl font-bold mt-6">

                                    {feature.title}

                                </h2>

                                <p className="mt-4 text-gray-300">

                                    {feature.description}

                                </p>

                            </motion.div>

                        ))}

                    </div>

                </section>

                {/* Footer */}

                <footer className="text-center py-8 border-t border-white/10 text-gray-400">

                    © {new Date().getFullYear()} BrainClash by SRK • Learn • Play • Win

                </footer>

            </div>

        </>

    );

};

export default Landing;