import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Logo from "../../components/common/Logo";
import Loader from "../../components/Loader";

const Result = () => {
    const { sessionId } = useParams();
    const navigate = useNavigate();

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadResult();
    }, [sessionId]);

    const loadResult = async () => {
        try {
            const res = await api.get(`/sessions/result/${sessionId}`);

            setResult(res.data.result);
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Unable to load result."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <StudentLayout>
            <BackgroundAnimation />

            <div className="flex justify-center items-center min-h-[80vh]">

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center text-white w-full max-w-xl">

                    <Logo />

                    <h1 className="text-5xl font-bold mt-8">
                        Quiz Completed 🎉
                    </h1>

                    <div className="mt-10 space-y-5">

                        <h2 className="text-3xl text-cyan-400">
                            Total Marks
                        </h2>

                        <h1 className="text-7xl font-black">
                            {result?.totalMarks ?? 0}
                        </h1>

                        <p className="text-xl">
                            ✅ Correct Answers :
                            {" "}
                            <span className="font-bold">
                                {result?.correctAnswers ?? 0}
                            </span>
                        </p>

                        <p className="text-xl">
                            ❌ Wrong Answers :
                            {" "}
                            <span className="font-bold">
                                {result?.wrongAnswers ?? 0}
                            </span>
                        </p>

                    </div>

                    <button
                        onClick={() => navigate("/student/dashboard")}
                        className="mt-10 w-full rounded-xl bg-cyan-500 py-3 text-xl font-semibold hover:bg-cyan-600"
                    >
                        Back to Dashboard
                    </button>

                </div>

            </div>

        </StudentLayout>
    );
};

export default Result;