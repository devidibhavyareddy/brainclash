import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import toast from "react-hot-toast";

import api from "../../services/api";
import socket from "../../socket/socket";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import TrainerLayout from "../../layouts/TrainerLayout";
import Loader from "../../components/Loader";

const WaitingRoom = () => {

    const navigate = useNavigate();

    const { state } = useLocation();

    const session = state?.session;

    const [waitingStudents, setWaitingStudents] = useState([]);
    const [approvedStudents, setApprovedStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (!session) return;

        socket.emit("joinSession", session._id);

        loadWaitingStudents();

        socket.on("studentJoined", loadWaitingStudents);
        socket.on("studentApprovedListUpdated", loadWaitingStudents);

        return () => {

            socket.off("studentJoined", loadWaitingStudents);
            socket.off("studentApprovedListUpdated", loadWaitingStudents);

        };

    }, [session]);

    const loadWaitingStudents = async () => {

        try {

            const res = await api.get(`/sessions/waiting/${session._id}`);

            setWaitingStudents(res.data.waitingStudents || []);
            setApprovedStudents(res.data.approvedStudents || []);

        } catch (error) {

            console.error(error);

            toast.error(
                error.response?.data?.message ||
                "Unable to load students"
            );

        } finally {

            setLoading(false);

        }

    };

    const approve = async (studentId) => {

        try {

            await api.post("/sessions/approve", {
                sessionId: session._id,
                studentId,
            });

            toast.success("Student Approved");

            loadWaitingStudents();

        } catch (error) {

            toast.error("Unable to approve student");

        }

    };

    const reject = async (studentId) => {

        try {

            await api.post("/sessions/reject", {
                sessionId: session._id,
                studentId,
            });

            toast.success("Student Rejected");

            loadWaitingStudents();

        } catch (error) {

            toast.error("Unable to reject student");

        }

    };

    const startQuiz = async () => {

        try {

            await api.post("/sessions/live", {
                sessionId: session._id,
            });

            toast.success("Quiz Started");

            navigate("/trainer/live", {
                state: {
                    session,
                },
            });

        } catch (error) {

            toast.error(
                error.response?.data?.message ||
                "Unable to start quiz"
            );

        }

    };

    if (!session) {

        return (

            <div className="min-h-screen flex justify-center items-center text-white">

                Invalid Session

            </div>

        );

    }

    if (loading) {
        return <Loader />;
    }

    return (

        <TrainerLayout>

            <BackgroundAnimation />

            <div className="text-white">

                <h1 className="text-5xl font-bold text-center">

                    Waiting Room

                </h1>

                <div className="text-center mt-10">

                    <h2 className="text-xl">

                        Game PIN

                    </h2>

                    <div className="text-7xl font-black tracking-[12px] mt-4">

                        {session.gamePin}

                    </div>

                    <button
                        onClick={() => {
                            navigator.clipboard.writeText(session.gamePin);
                            toast.success("Game PIN Copied");
                        }}
                        className="mt-5 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl"
                    >

                        Copy PIN

                    </button>

                </div>

                <div className="flex justify-center mt-10">

                    <QRCodeCanvas
                        value={`${window.location.origin}/student/join?pin=${session.gamePin}`}
                        size={220}
                    />

                </div>

                <div className="grid lg:grid-cols-2 gap-8 mt-12">

                    {/* Waiting */}

                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6">

                        <h2 className="text-3xl font-bold mb-6">

                            Waiting Students ({waitingStudents.length})

                        </h2>

                        {waitingStudents.length === 0 ? (

                            <p className="text-gray-400">

                                No students waiting.

                            </p>

                        ) : (

                            waitingStudents.map((student) => (

                                <div
                                    key={student._id}
                                    className="flex justify-between items-center bg-white/10 rounded-xl p-4 mb-4"
                                >

                                    <div>

                                        <h3>

                                            {student?.student?.name}

                                        </h3>

                                        <p className="text-gray-300">

                                            {student?.student?.email}

                                        </p>

                                    </div>

                                    <div className="flex gap-3">

                                        <button
                                            onClick={() => approve(student.student._id)}
                                            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                                        >

                                            Approve

                                        </button>

                                        <button
                                            onClick={() => reject(student.student._id)}
                                            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                                        >

                                            Reject

                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                    {/* Approved */}

                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6">

                        <h2 className="text-3xl font-bold mb-6">

                            Approved Students ({approvedStudents.length})

                        </h2>

                        {approvedStudents.length === 0 ? (

                            <p className="text-gray-400">

                                No approved students yet.

                            </p>

                        ) : (

                            approvedStudents.map((student) => (

                                <div
                                    key={student._id}
                                    className="bg-green-500/30 rounded-xl p-4 mb-4"
                                >

                                    {student?.student?.name}

                                </div>

                            ))

                        )}

                    </div>

                </div>

                <button
                    disabled={approvedStudents.length === 0}
                    onClick={startQuiz}
                    className="mt-12 w-full bg-gradient-to-r from-green-500 to-cyan-500 py-5 rounded-2xl text-2xl font-bold disabled:opacity-40"
                >

                    START QUIZ

                </button>

            </div>

        </TrainerLayout>

    );

};

export default WaitingRoom;