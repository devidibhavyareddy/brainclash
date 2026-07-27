import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaUserGraduate,
    FaChalkboardTeacher,
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Logo from "../../components/common/Logo";

const Register = () => {

    const navigate = useNavigate();

    const { register } = useAuth();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({

        name: "",
        email: "",
        password: "",
        role: "student"

    });

    const handleChange = (e) => {

        setFormData({

            ...formData,

            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {
            const response = await register(formData);

            if (response?.success) {
                toast.success(response.message || "Registration Successful 🎉");
                navigate("/login");
                return;
            }

            toast.error(response?.message || "Registration Failed");

        }

        catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                "Registration Failed";

            console.error("Registration error:", error);
            toast.error(message);
        }

        finally {

            setLoading(false);

        }

    };

    return (

        <>

            <BackgroundAnimation />

            <div className="min-h-screen flex justify-center items-center px-6">

                <motion.div

                    initial={{ opacity: 0, scale: 0.9 }}

                    animate={{ opacity: 1, scale: 1 }}

                    transition={{ duration: 0.5 }}

                    className="w-full max-w-lg rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8"

                >

                    <div className="flex justify-center">

                        <Logo />

                    </div>

                    <h2 className="text-3xl font-bold text-white text-center mt-6">

                        Join BrainClash 🚀

                    </h2>

                    <p className="text-center text-cyan-200 mt-2">

                        Challenge • Compete • Conquer

                    </p>

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-6 mt-8"

                    >

                        {/* Name */}

                        <div>

                            <label className="text-white">

                                Full Name

                            </label>

                            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 mt-2">

                                <FaUser className="text-cyan-300" />

                                <input

                                    type="text"

                                    name="name"

                                    value={formData.name}

                                    onChange={handleChange}

                                    required

                                    placeholder="Enter your full name"

                                    className="w-full bg-transparent text-white placeholder-gray-300 p-4 outline-none"

                                />

                            </div>

                        </div>

                        {/* Email */}

                        <div>

                            <label className="text-white">

                                Email

                            </label>

                            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 mt-2">

                                <FaEnvelope className="text-cyan-300" />

                                <input

                                    type="email"

                                    name="email"

                                    value={formData.email}

                                    onChange={handleChange}

                                    required

                                    placeholder="Enter your email"

                                    className="w-full bg-transparent text-white placeholder-gray-300 p-4 outline-none"

                                />

                            </div>

                        </div>

                        {/* Password */}

                        <div>

                            <label className="text-white">

                                Password

                            </label>

                            <div className="flex items-center bg-white/10 border border-white/20 rounded-xl px-4 mt-2">

                                <FaLock className="text-cyan-300" />

                                <input

                                    type={showPassword ? "text" : "password"}

                                    name="password"

                                    value={formData.password}

                                    onChange={handleChange}

                                    required

                                    placeholder="Create password"

                                    className="w-full bg-transparent text-white placeholder-gray-300 p-4 outline-none"

                                />

                                <button

                                    type="button"

                                    onClick={() =>

                                        setShowPassword(!showPassword)

                                    }

                                    className="text-white"

                                >

                                    {

                                        showPassword

                                            ? <FaEyeSlash />

                                            : <FaEye />

                                    }

                                </button>

                            </div>

                        </div>

                        {/* Role */}

                        <div>

                            <label className="text-white mb-3 block">

                                Select Your Role

                            </label>

                            <div className="grid grid-cols-2 gap-5">

                                <motion.div

                                    whileHover={{ scale: 1.05 }}

                                    whileTap={{ scale: 0.95 }}

                                    onClick={() =>

                                        setFormData({

                                            ...formData,

                                            role: "student"

                                        })

                                    }

                                    className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                                        formData.role === "student"
                                            ? "bg-gradient-to-r from-cyan-500 to-indigo-600 border-cyan-300"
                                            : "bg-white/10 border-white/20"
                                    }`}

                                >

                                    <FaUserGraduate className="mx-auto text-5xl text-white" />

                                    <h3 className="text-center text-white font-bold mt-4">

                                        Student

                                    </h3>

                                </motion.div>

                                <motion.div

                                    whileHover={{ scale: 1.05 }}

                                    whileTap={{ scale: 0.95 }}

                                    onClick={() =>

                                        setFormData({

                                            ...formData,

                                            role: "trainer"

                                        })

                                    }

                                    className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                                        formData.role === "trainer"
                                            ? "bg-gradient-to-r from-purple-500 to-pink-600 border-purple-300"
                                            : "bg-white/10 border-white/20"
                                    }`}

                                >

                                    <FaChalkboardTeacher className="mx-auto text-5xl text-white" />

                                    <h3 className="text-center text-white font-bold mt-4">

                                        Trainer

                                    </h3>

                                </motion.div>

                            </div>

                        </div>

                        <motion.button

                            whileHover={{ scale: 1.03 }}

                            whileTap={{ scale: 0.96 }}

                            disabled={loading}

                            className="w-full rounded-xl py-4 font-bold text-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition disabled:opacity-50"

                        >

                            {

                                loading

                                    ? "Creating Account..."

                                    : "Register"

                            }

                        </motion.button>

                    </form>

                    <p className="text-center text-white mt-8">

                        Already have an account?

                        <Link

                            to="/login"

                            className="ml-2 text-cyan-300 font-bold hover:text-cyan-200"

                        >

                            Login

                        </Link>

                    </p>

                </motion.div>

            </div>

        </>

    );

};

export default Register;