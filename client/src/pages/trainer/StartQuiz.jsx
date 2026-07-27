import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import TrainerLayout from "../../layouts/TrainerLayout";
import Loader from "../../components/Loader";

const StartQuiz = () => {

    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

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

    const startQuiz = async (id) => {

        try {

            const res = await api.post("/sessions/start", {
                quizId: id,
            });

            toast.success("Quiz Started Successfully");

            navigate("/trainer/waiting-room", {
                state: {
                    session: res.data.session,
                },
            });

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Unable to start quiz"
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

                <h1 className="text-5xl font-bold mb-10">

                    Start Live Quiz

                </h1>

                {quizzes.length === 0 ? (

                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-10 text-center">

                        <h2 className="text-3xl font-bold">

                            No quizzes available

                        </h2>

                        <p className="mt-4 text-gray-300">

                            Create a quiz before starting a live session.

                        </p>

                    </div>

                ) : (

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

                        {quizzes.map((quiz) => (

                            <div
                                key={quiz._id}
                                className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 shadow-xl hover:scale-105 transition"
                            >

                                <h2 className="text-2xl font-bold">

                                    {quiz.title}

                                </h2>

                                <p className="mt-3 text-gray-300">

                                    {quiz.description || "No description available"}

                                </p>

                                <div className="mt-5 space-y-2">

                                    <p>

                                        📚 <strong>Subject:</strong> {quiz.subject}

                                    </p>

                                    <p>

                                        ⏱ <strong>Duration:</strong> {quiz.duration} mins

                                    </p>

                                    <p>

                                        🎯 <strong>Difficulty:</strong> {quiz.difficulty}

                                    </p>

                                </div>

                                <button
                                    onClick={() => startQuiz(quiz._id)}
                                    className="mt-8 w-full bg-green-600 hover:bg-green-700 rounded-xl py-3 font-semibold transition"
                                >

                                    Start Quiz

                                </button>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </TrainerLayout>

    );

};

export default StartQuiz;