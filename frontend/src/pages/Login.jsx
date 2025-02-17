import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserLogin } from "../api/endpoints";
import UserContext from "../context/userContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp < Date.now() / 1000) {
                    localStorage.removeItem("token");
                } else {
                    navigate("/home");
                }
            } catch (error) {
                localStorage.removeItem("token");
                console.error("Token error:", error);
            }
        }
    }, [navigate]);

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required").min(6),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const login = await UserLogin(values);
            if (login.message === "login successful!") {
                localStorage.setItem("token", login.token);
                setUser(login.user);
                navigate("/home");
            } else {
                setErrors({ general: login.message });
            }
        } catch (error) {
            setErrors({ general: "An error occurred during login" });
            console.error("Login error:", error);
        }
        setSubmitting(false);
        setTimeout(() => {
            setErrors({ general: "" });
        }, 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border border-blue-50"
            >
                {/* Left Side - Login Form */}
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
                        Log in to your Account
                    </h2>
                    <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="w-full md:flex-1 py-2 px-4 bg-white text-blue-800 rounded-md border border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <FcGoogle size={20} />
                            Google
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            className="w-full md:flex-1 py-2 px-4 bg-white text-blue-800 rounded-md border border-blue-400 hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                        >
                            <svg
                                className="w-5 h-5 text-[#1877F2]"
                                viewBox="0 0 48 48"
                            >
                                <path
                                    fill="currentColor"
                                    d="M48 24c0-13.3-10.7-24-24-24S0 10.7 0 24c0 11.8 8.6 21.6 20 23.4V30h-6v-6h6v-4.5c0-6 3.6-9.3 9-9.3 2.6 0 5.3.5 5.3.5v6h-3c-3 0-3.9 1.9-3.9 3.8V24h6.7l-1.1 6H32v17.4C41.4 45.6 48 35.8 48 24z"
                                />
                            </svg>
                            Facebook
                        </motion.button>
                    </div>
                    <div className="text-center text-blue-600/100 mb-4 text-sm">
                        or continue with email
                    </div>
                    <Formik
                        initialValues={{ email: "", password: "" }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors }) => (
                            <Form>
                                {errors.general && (
                                    <div className="bg-red-50 border border-red-200 p-3 rounded-lg mb-4">
                                        <p className="text-red-600 text-sm text-center">
                                            {errors.general}
                                        </p>
                                    </div>
                                )}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-900/100">
                                        Email
                                    </label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                                        <Field
                                            type="email"
                                            name="email"
                                            placeholder="john@example.com"
                                            className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-blue-400/100"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="email"
                                        component="p"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>
                                <div className="space-y-2 mt-2">
                                    <label className="block text-sm font-medium text-blue-900/100">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                                        <Field
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="password"
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-blue-400/100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-500"
                                        >
                                            {showPassword ? (
                                                <IoEyeOff />
                                            ) : (
                                                <IoEye />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="password"
                                        component="p"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row items-end justify-end text-sm mb-4 mt-3">
                                    <Link
                                        to="/forget-password"
                                        className="text-blue-600 hover:text-blue-700 hover:underline mt-2 md:mt-0 text-sm"
                                    >
                                        Forgot Password?
                                    </Link>
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className=""
                                >
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-200/50"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                Logging in...
                                            </span>
                                        ) : (
                                            "Log In"
                                        )}
                                    </button>
                                </motion.div>
                            </Form>
                        )}
                    </Formik>
                    <p className="text-center text-blue-900/80 mt-4 text-sm">
                        {"Don't have an account?"}{" "}
                        <Link
                            to="/register"
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                            Create an account
                        </Link>
                    </p>
                </div>

                {/* Right Side - Illustration */}
                <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center p-6 relative">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center text-white"
                    >
                        <div className="mb-6">
                            <div className="w-24 h-24 bg-white/10 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm">
                                <svg
                                    className="w-12 h-12 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <h2 className="text-xl font-semibold mb-2">
                            Connect Seamlessly
                        </h2>
                        <p className="text-sm opacity-90">
                            Your gateway to a unified digital experience
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
