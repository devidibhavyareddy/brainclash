import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import socket from "../../socket/socket";

import StudentLayout from "../../layouts/StudentLayout";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Logo from "../../components/common/Logo";

const WaitingApproval = () => {

    const navigate = useNavigate();

    const { user } = useAuth();

    const { state } = useLocation();

    const session = state?.session;

    useEffect(() => {

        if (!session) {

            navigate("/student/dashboard");

            return;

        }

        if (!user) return;

        socket.emit("joinSession", session._id);

        socket.emit("joinStudentRoom", user._id);

        socket.on("studentApproved", (data) => {

            toast.success(data.message);

            navigate("/student/live", {

                state: {

                    session

                }

            });

        });

        socket.on("studentRejected", (data) => {

            toast.error(data.message);

            navigate("/student/dashboard");

        });

        return () => {

            socket.off("studentApproved");

            socket.off("studentRejected");

        };

    }, [session, user, navigate]);

    return (

        <StudentLayout>

            <BackgroundAnimation />

            <div className="flex justify-center items-center min-h-[80vh]">

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 text-center text-white max-w-xl w-full">

                    <Logo />

                    <h1 className="text-5xl font-bold mt-8">

                        Waiting For Approval

                    </h1>

                    <p className="mt-5 text-lg text-gray-300">

                        Your trainer will approve your request shortly.

                    </p>

                    <div className="mt-8 flex justify-center">

                        <div className="w-20 h-20 rounded-full border-4 border-cyan-400 border-t-transparent animate-spin"></div>

                    </div>

                    <div className="mt-8 text-gray-300">

                        <p>

                            Session ID

                        </p>

                        <p className="text-cyan-400 break-all mt-2">

                            {session?._id}

                        </p>

                    </div>

                </div>

            </div>

        </StudentLayout>

    );

};

export default WaitingApproval;