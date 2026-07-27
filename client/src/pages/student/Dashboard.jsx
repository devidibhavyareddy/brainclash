import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaPlayCircle,
    FaHistory,
    FaMedal,
    FaClipboardList,
    FaStar,
    FaTrophy
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import StudentLayout from "../../layouts/StudentLayout";

const Dashboard = () => {

    const { user } = useAuth();
    const navigate = useNavigate();

    return (

        <StudentLayout>

            <BackgroundAnimation />

            <div className="relative text-white">

                {/* Welcome Banner */}

                <motion.div
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-700 p-8 shadow-2xl"
                >

                    <h1 className="text-5xl font-black">
                        Welcome, {user?.name} 👋
                    </h1>

                    <p className="mt-4 text-lg text-gray-100 leading-8">

                        Ready to challenge yourself?

                        <br />

                        Join live quizzes, compete with classmates,
                        and improve your ranking on BrainClash.

                    </p>

                </motion.div>

                {/* Statistics */}

                <h2 className="text-3xl font-bold mt-12 mb-6">

                    Your Statistics

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    <StatCard
                        title="Quizzes Played"
                        value="0"
                        icon={<FaClipboardList />}
                    />

                    <StatCard
                        title="Highest Score"
                        value="0"
                        icon={<FaStar />}
                    />

                    <StatCard
                        title="Total Marks"
                        value="0"
                        icon={<FaTrophy />}
                    />

                </div>

                {/* Quick Actions */}

                <h2 className="text-3xl font-bold mt-14 mb-8">

                    Quick Actions

                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">

                    <ActionCard
                        title="Join Live Quiz"
                        description="Enter the Game PIN and compete in real-time."
                        icon={<FaPlayCircle />}
                        color="from-indigo-600 via-purple-600 to-cyan-500"
                        onClick={() => navigate("/student/join")}
                    />

                    <ActionCard
                        title="Previous Results"
                        description="View all your quiz attempts and scores."
                        icon={<FaHistory />}
                        color="from-pink-600 via-red-500 to-orange-500"
                        onClick={() => navigate("/student/history")}
                    />

                    <ActionCard
                        title="Achievements"
                        description="Unlock badges by participating in quizzes."
                        icon={<FaMedal />}
                        color="from-yellow-500 via-orange-500 to-red-500"
                        onClick={() =>
                            alert("Achievements feature coming soon!")
                        }
                    />

                </div>

                {/* Footer */}

                <footer className="mt-20 border-t border-white/10 pt-8 text-center text-gray-400">

                    © {new Date().getFullYear()} BrainClash by SRK

                    <br />

                    Learn • Compete • Win

                </footer>

            </div>

        </StudentLayout>

    );

};

/* ---------------- Statistics Card ---------------- */

const StatCard = ({ title, value, icon }) => {

    return (

        <motion.div

            whileHover={{
                scale: 1.04
            }}

            className="rounded-3xl bg-white/10 backdrop-blur-xl p-6 shadow-xl"

        >

            <div className="text-5xl text-cyan-400">

                {icon}

            </div>

            <h3 className="mt-4 text-gray-300">

                {title}

            </h3>

            <h1 className="mt-3 text-5xl font-black">

                {value}

            </h1>

        </motion.div>

    );

};

/* ---------------- Action Card ---------------- */

const ActionCard = ({
    title,
    description,
    icon,
    color,
    onClick
}) => {

    return (

        <motion.div

            whileHover={{
                scale: 1.05,
                y: -8
            }}

            whileTap={{
                scale: 0.98
            }}

            onClick={onClick}

            className={`cursor-pointer rounded-3xl bg-gradient-to-br ${color} p-8 shadow-2xl`}

        >

            <div className="text-6xl">

                {icon}

            </div>

            <h2 className="mt-6 text-3xl font-bold">

                {title}

            </h2>

            <p className="mt-4 text-gray-100 leading-7">

                {description}

            </p>

        </motion.div>

    );

};

export default Dashboard;