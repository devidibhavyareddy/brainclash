import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";

const JoinQuiz = () => {

    const navigate = useNavigate();

    const [gamePin, setGamePin] = useState("");

    const [loading, setLoading] = useState(false);

    const joinQuiz = async () => {

        if (!gamePin.trim()) {

            return toast.error("Please enter Game PIN");

        }

        if (!/^\d{6}$/.test(gamePin)) {

            return toast.error("Game PIN must be 6 digits");

        }

        try {

            setLoading(true);

            const res = await api.post("/sessions/join", {
                gamePin,
            });

            toast.success("Join request sent successfully.");

            navigate("/student/waiting", {
                state: {
                    session: res.data.session,
                },
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Unable to join quiz."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <StudentLayout>

            <BackgroundAnimation />

            <div className="flex items-center justify-center min-h-[80vh]">

                <div className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-xl p-8 shadow-2xl text-white">

                    <h1 className="text-4xl font-bold text-center">

                        Join Live Quiz

                    </h1>

                    <p className="text-center text-gray-300 mt-3">

                        Enter your 6-digit Game PIN

                    </p>

                    <input

                        type="text"

                        maxLength={6}

                        value={gamePin}

                        onChange={(e) =>
                            setGamePin(
                                e.target.value.replace(/\D/g, "")
                            )
                        }

                        placeholder="000000"

                        className="mt-8 w-full rounded-xl p-4 text-center text-3xl tracking-[10px] text-black outline-none"

                    />

                    <button

                        onClick={joinQuiz}

                        disabled={loading}

                        className={`mt-8 w-full rounded-xl py-4 font-bold transition ${
                            loading
                                ? "bg-gray-500 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600"
                        }`}

                    >

                        {loading ? "Joining..." : "Join Quiz"}

                    </button>

                </div>

            </div>

        </StudentLayout>

    );

};

export default JoinQuiz;