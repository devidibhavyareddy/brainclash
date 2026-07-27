import { useEffect, useState } from "react";
import {
    FaPlusCircle,
    FaBook,
    FaPlayCircle,
    FaUsers,
    FaTrophy
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import TrainerLayout from "../../layouts/TrainerLayout";

const Dashboard = () => {

    const { user } = useAuth();

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        quizzes: 0,
        sessions: 0,
        students: 0,
        completed: 0
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {

        try {

            const res = await api.get("/dashboard/trainer");

            setStats({
                quizzes: res.data.totalQuizzes || 0,
                sessions: res.data.liveSessions || 0,
                students: res.data.totalStudents || 0,
                completed: res.data.completedSessions || 0
            });

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }

    };

    return (

        <TrainerLayout>

            <BackgroundAnimation />

            <div className="text-white">

                {/* Welcome Banner */}

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-3xl bg-gradient-to-r from-purple-700 via-indigo-600 to-cyan-500 p-8 shadow-2xl"
                >

                    <h1 className="text-5xl font-black">

                        Welcome, {user?.name} 👋

                    </h1>

                    <p className="mt-4 text-lg text-gray-100">

                        Create exciting quizzes, challenge students,
                        and make learning fun with BrainClash.

                    </p>

                </motion.div>

                {/* Statistics */}

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">

                    <DashboardCard
                        title="My Quizzes"
                        value={loading ? "..." : stats.quizzes}
                        icon={<FaBook />}
                    />

                    <DashboardCard
                        title="Live Sessions"
                        value={loading ? "..." : stats.sessions}
                        icon={<FaPlayCircle />}
                    />

                    <DashboardCard
                        title="Students"
                        value={loading ? "..." : stats.students}
                        icon={<FaUsers />}
                    />

                    <DashboardCard
                        title="Completed"
                        value={loading ? "..." : stats.completed}
                        icon={<FaTrophy />}
                    />

                </div>

                {/* Quick Actions */}

                <h2 className="text-3xl font-bold mt-14 mb-8">

                    Quick Actions

                </h2>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                    <ActionCard
                        title="Create Quiz"
                        description="Design a brand new quiz."
                        icon={<FaPlusCircle />}
                        onClick={() => navigate("/trainer/create-quiz")}
                    />

                    <ActionCard
                        title="My Quizzes"
                        description="View and manage all your quizzes."
                        icon={<FaBook />}
                        onClick={() => navigate("/trainer/quizzes")}
                    />

                    <ActionCard
                        title="Start Live Quiz"
                        description="Host a live BrainClash session."
                        icon={<FaPlayCircle />}
                        onClick={() => navigate("/trainer/start-quiz")}
                    />

                </div>

                {/* Footer */}

                <div className="mt-16 text-center text-gray-400">

                    🚀 BrainClash by SRK • Learn • Compete • Win

                </div>

            </div>

        </TrainerLayout>

    );

};

const DashboardCard = ({ title, value, icon }) => {

    return (

        <motion.div
            whileHover={{
                scale: 1.05,
                y: -5
            }}
            className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 shadow-xl"
        >

            <div className="text-5xl text-cyan-400">

                {icon}

            </div>

            <h3 className="text-lg mt-4">

                {title}

            </h3>

            <h1 className="text-5xl font-black mt-4">

                {value}

            </h1>

        </motion.div>

    );

};

const ActionCard = ({
    title,
    description,
    icon,
    onClick
}) => {

    return (

        <motion.div
            whileHover={{
                scale: 1.05,
                y: -8
            }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="cursor-pointer rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 p-8 shadow-2xl"
        >

            <div className="text-6xl">

                {icon}

            </div>

            <h2 className="text-3xl font-bold mt-6">

                {title}

            </h2>

            <p className="mt-4 text-gray-100">

                {description}

            </p>

        </motion.div>

    );

};

export default Dashboard;