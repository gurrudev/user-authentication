/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate , Link} from "react-router-dom";
import { resetPassword } from "../api/endpoints";
import { motion } from "framer-motion";
import { FaLock } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const validationSchema = Yup.object({
        newPassword: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await resetPassword(values.newPassword, token);
            if (response.message === "Password reset successful!") {
                setErrors({ success: response.message });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                setErrors({ general: response.message });
            }
        } catch (error) {
            setErrors({ general: "Something went wrong, please try again" });
        } finally {
            setSubmitting(false);
            setTimeout(() => {
                setErrors({ general: "", success: "" });
            }, 3000);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden border border-blue-50"
            >
                {/* Left Side - Reset Password Form */}
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
                        Reset Your Password
                    </h2>
                    <div className="text-center text-blue-600/100 mb-6 text-sm ">
                        Enter your new password and confirm it to reset your
                        password.
                    </div>
                    <Formik
                        initialValues={{
                            newPassword: "",
                            confirmPassword: "",
                        }}
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
                                {errors.success && (
                                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg mb-4">
                                        <p className="text-green-600 text-sm text-center">
                                            {errors.success}
                                        </p>
                                    </div>
                                )}
                                {/* Password */}
                                <div className="space-y-2">
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
                                            name="newPassword"
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
                                        name="newPassword"
                                        component="p"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2 mt-3">
                                    <label className="block text-sm font-medium text-blue-900/100">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                                        <Field
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            name="confirmPassword"
                                            placeholder="••••••••"
                                            className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-blue-400/100"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-500"
                                        >
                                            {showConfirmPassword ? (
                                                <IoEyeOff />
                                            ) : (
                                                <IoEye />
                                            )}
                                        </button>
                                    </div>
                                    <ErrorMessage
                                        name="confirmPassword"
                                        component="p"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="mt-6"
                                >
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-200/50"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                Resetting...
                                            </span>
                                        ) : (
                                            "Reset Password"
                                        )}
                                    </button>
                                </motion.div>
                                <p className="text-center text-blue-900/80 mt-4 text-sm">
                                    Remember your password?{" "}
                                    <Link
                                        to="/"
                                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline"
                                    >
                                        Log in here
                                    </Link>
                                </p>
                            </Form>
                        )}
                    </Formik>
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
                            Secure Account Recovery
                        </h2>
                        <p className="text-sm opacity-90">
                            Easily reset your password and regain access to your
                            account.
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPassword;
