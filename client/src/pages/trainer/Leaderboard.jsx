import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../../services/api";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Logo from "../../components/common/Logo";
import TrainerLayout from "../../layouts/TrainerLayout";
import Loader from "../../components/Loader";

const Leaderboard = () => {

    const { sessionId } = useParams();

    const [leaders, setLeaders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeaderboard();
    }, [sessionId]);

    const loadLeaderboard = async () => {

        try {

            const res = await api.get(`/sessions/leaderboard/${sessionId}`);

            setLeaders(res.data.leaderboard || []);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message || "Unable to load leaderboard"
            );

        } finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <Loader />;
    }

    return (

        <TrainerLayout>

            <BackgroundAnimation />

            <div className="text-white">

                <Logo />

                <h1 className="text-5xl font-bold mt-8 mb-10">

                    🏆 Leaderboard

                </h1>

                {leaders.length === 0 ? (

                    <div className="bg-white/10 rounded-3xl p-10 text-center">

                        <h2 className="text-2xl font-semibold">

                            No leaderboard data available.

                        </h2>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {leaders.map((student, index) => (

                            <div
                                key={student._id}
                                className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 flex justify-between items-center hover:bg-white/20 transition"
                            >

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        #{index + 1}{" "}
                                        {student.student?.name || "Unknown Student"}

                                    </h2>

                                    <p className="text-gray-300">

                                        Rank {index + 1}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <h2 className="text-3xl font-bold text-cyan-400">

                                        {student.totalMarks}

                                    </h2>

                                    <p className="text-gray-300">

                                        Marks

                                    </p>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </TrainerLayout>

    );

};

export default Leaderboard;