import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";
import toast from "react-hot-toast";

import { useAuth } from "../../context/AuthContext";
import BackgroundAnimation from "../../components/common/BackgroundAnimation";
import Logo from "../../components/common/Logo";

const Login = () => {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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

            const data = await login(formData);

            toast.success(`Welcome ${data.user.name} 🎉`);

            if (data.user.role === "trainer") {

                navigate("/trainer/dashboard");

            } else {

                navigate("/student/dashboard");

            }

        } catch (error) {
            const message =
                error.response?.data?.message ||
                error.response?.data?.errors?.[0]?.msg ||
                "Login Failed";

            toast.error(message);

        } finally {

            setLoading(false);

        }

    };

    return (

        <>
            <BackgroundAnimation />

            <div className="min-h-screen flex items-center justify-center px-6">

                <motion.div

                    initial={{ opacity: 0, y: 40 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 0.6 }}

                    className="w-full max-w-md rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl p-8"

                >

                    <div className="flex justify-center">

                        <Logo />

                    </div>

                    <h2 className="text-center text-3xl font-bold text-white mt-6">

                        Welcome Back 👋

                    </h2>

                    <p className="text-center text-cyan-200 mt-2">

                        Learn • Play • Win

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 mt-8"
                    >

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

                                    placeholder="Enter password"

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

                        <motion.button

                            whileHover={{ scale: 1.03 }}

                            whileTap={{ scale: 0.96 }}

                            disabled={loading}

                            className="w-full rounded-xl py-4 font-bold text-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 transition disabled:opacity-50"

                        >

                            {

                                loading

                                    ? "Logging In..."

                                    : "Login"

                            }

                        </motion.button>

                    </form>

                    <p className="text-center text-white mt-8">

                        Don't have an account?

                        <Link

                            to="/register"

                            className="ml-2 text-cyan-300 font-bold hover:text-cyan-200"

                        >

                            Register

                        </Link>

                    </p>

                </motion.div>

            </div>

        </>

    );

};

export default Login;