import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    FaPlus,
    FaPlay,
    FaEdit,
    FaTrash,
    FaQuestionCircle
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import TrainerLayout from "../../layouts/TrainerLayout";
import Loader from "../../components/Loader";

const QuizList = () => {

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        loadQuizzes();
    }, []);

    const loadQuizzes = async () => {

        try {

            const res = await api.get("/quizzes/my");

            setQuizzes(res.data.quizzes || []);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Unable to load quizzes"
            );

        } finally {

            setLoading(false);

        }

    };

    const deleteQuiz = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this quiz?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/quizzes/${id}`);

            toast.success("Quiz deleted successfully");

            loadQuizzes();

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Delete failed"
            );

        }

    };

    if (loading) {
        return <Loader />;
    }

    return (

        <TrainerLayout>

            <BackgroundAnimation />

            <div className="text-white">

                <div className="flex justify-between items-center mb-10">

                    <h1 className="text-5xl font-bold">

                        My Quizzes

                    </h1>

                    <button
                        onClick={() => navigate("/trainer/create-quiz")}
                        className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl flex items-center gap-2"
                    >
                        <FaPlus />
                        Create Quiz
                    </button>

                </div>

                {quizzes.length === 0 ? (

                    <div className="text-center mt-24">

                        <FaQuestionCircle
                            className="mx-auto text-8xl opacity-40"
                        />

                        <h2 className="text-3xl mt-6">

                            No quizzes created yet

                        </h2>

                        <p className="text-gray-400 mt-3">

                            Click "Create Quiz" to get started.

                        </p>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                        {quizzes.map((quiz) => (

                            <motion.div
                                key={quiz._id}
                                whileHover={{
                                    y: -8,
                                    scale: 1.02
                                }}
                                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl"
                            >

                                <h2 className="text-2xl font-bold">

                                    {quiz.title}

                                </h2>

                                <p className="mt-4 text-gray-300">

                                    {quiz.description || "No description"}

                                </p>

                                <div className="flex justify-between mt-6 text-sm">

                                    <span>

                                        📚 {quiz.subject}

                                    </span>

                                    <span>

                                        ⏱ {quiz.duration} mins

                                    </span>

                                </div>

                                <div className="grid grid-cols-4 gap-3 mt-8">

                                    <button
                                        onClick={() =>
                                            navigate(`/trainer/questions/${quiz._id}`)
                                        }
                                        className="bg-indigo-600 hover:bg-indigo-700 py-3 rounded-xl flex justify-center"
                                    >
                                        <FaPlus />
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate("/trainer/start-quiz", {
                                                state: { quiz }
                                            })
                                        }
                                        className="bg-green-600 hover:bg-green-700 py-3 rounded-xl flex justify-center"
                                    >
                                        <FaPlay />
                                    </button>

                                    <button
                                        className="bg-yellow-500 hover:bg-yellow-600 py-3 rounded-xl flex justify-center"
                                    >
                                        <FaEdit />
                                    </button>

                                    <button
                                        onClick={() => deleteQuiz(quiz._id)}
                                        className="bg-red-600 hover:bg-red-700 py-3 rounded-xl flex justify-center"
                                    >
                                        <FaTrash />
                                    </button>

                                </div>

                            </motion.div>

                        ))}

                    </div>

                )}

            </div>

        </TrainerLayout>

    );

};

export default QuizList;