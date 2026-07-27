import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import socket from "../../socket/socket";

import StudentLayout from "../../layouts/StudentLayout";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Loader from "../../components/Loader";
import QuestionCard from "../../components/QuestionCard";

const LiveQuiz = () => {

    const navigate = useNavigate();
    const { state } = useLocation();

    const session = state?.session;

    const [question, setQuestion] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {

        if (!session) {

            navigate("/student/dashboard");
            return;

        }

        socket.emit("joinSession", session._id);

        socket.on("newQuestion", (data) => {

            setQuestion(data.question);

            setSubmitted(false);

            setTimeLeft(data.question.timeLimit);

        });

        socket.on("quizEnded", () => {

            toast.success("Quiz Finished");

            navigate(`/student/result/${session._id}`);

        });

        return () => {

            socket.off("newQuestion");
            socket.off("quizEnded");

        };

    }, [session, navigate]);

    useEffect(() => {

        if (!question) return;

        if (timeLeft <= 0) return;

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [timeLeft, question]);

    const submitAnswer = async (answerIndex) => {

        if (submitted) return;

        try {

            await api.post("/responses", {

                sessionId: session._id,

                questionId: question._id,

                selectedAnswer: answerIndex

            });

            setSubmitted(true);

            toast.success("Answer Submitted");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Unable to submit answer."
            );

        }

    };

    if (!question) {

        return (

            <StudentLayout>

                <BackgroundAnimation />

                <Loader />

            </StudentLayout>

        );

    }

    return (

        <StudentLayout>

            <BackgroundAnimation />

            <div className="max-w-5xl mx-auto text-white">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold">

                        Live Quiz

                    </h1>

                    <div className="bg-red-500 px-6 py-3 rounded-xl text-2xl font-bold">

                        {timeLeft}s

                    </div>

                </div>

                <QuestionCard

                    question={question}

                    onAnswer={submitAnswer}

                />

                {submitted && (

                    <p className="text-green-400 text-center mt-6 text-xl">

                        ✅ Answer Submitted. Waiting for next question...

                    </p>

                )}

            </div>

        </StudentLayout>

    );

};

export default LiveQuiz;