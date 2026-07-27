import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../../services/api";

import StudentLayout from "../../layouts/StudentLayout";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Loader from "../../components/Loader";

const PreviousResults = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] =useState(true);

    useEffect(() => {
        loadResults();
    }, []);

    const loadResults = async () => {
        try {

            const res = await api.get("/responses/my-results");

            setResults(res.data.results);

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Unable to load results"
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

            <div className="text-white">

                <h1 className="text-5xl font-bold mb-10">
                    My Quiz History
                </h1>

                {results.length === 0 ? (

                    <div className="bg-white/10 rounded-2xl p-10 text-center">

                        <h2 className="text-2xl font-semibold">

                            No Quiz History Found

                        </h2>

                        <p className="text-gray-300 mt-3">

                            Join and complete a quiz to view your results here.

                        </p>

                    </div>

                ) : (

                    <div className="space-y-5">

                        {results.map((item) => (

                            <div
                                key={item._id}
                                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 flex justify-between items-center"
                            >

                                <div>

                                    <h2 className="text-2xl font-bold">

                                        {item.session?.gamePin
                                            ? `Game PIN : ${item.session.gamePin}`
                                            : "Quiz Session"}

                                    </h2>

                                    <p className="text-gray-300 mt-2">

                                        {new Date(item.updatedAt).toLocaleString()}

                                    </p>

                                </div>

                                <div className="text-right">

                                    <h3 className="text-lg text-gray-300">

                                        Score

                                    </h3>

                                    <h2 className="text-4xl font-bold text-cyan-400">

                                        {item.totalMarks}

                                    </h2>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </StudentLayout>
    );
};

export default PreviousResults;