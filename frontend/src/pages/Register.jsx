import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserSignup } from "../api/endpoints";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
    FaEnvelope,
    FaLock,
    FaUser,
} from "react-icons/fa";
import { PiGenderIntersex } from "react-icons/pi";
import { FaImage } from "react-icons/fa6";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { motion } from "framer-motion";

const Register = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;
                if (decodedToken.exp < currentTime) {
                    localStorage.removeItem("token");
                    navigate("/");
                } else {
                    navigate("/home");
                }
            } catch (error) {
                console.error("Token error:", error);
                localStorage.removeItem("token");
                navigate("/");
            }
        }
    }, [navigate]);

    const validationSchema = Yup.object({
        firstName: Yup.string().required("First name is required"),
        lastName: Yup.string().required("Last name is required"),
        gender: Yup.string()
            .oneOf(["Male", "Female", "Other"], "Invalid gender")
            .required("Gender is required"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required"),
        avatar: Yup.mixed().required("Avatar is required"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const signup = await UserSignup(values);
            if (signup.message === "User already exists!") {
                setErrors({ general: "User already exists!" });
            } else if (signup.message === "Email already exists!") {
                setErrors({ general: "Email already exists!" });
            } else {
                setErrors({ success: "Account created successfully!" });
                navigate("/");
            }
        } catch (error) {
            setErrors({ general: "An error occurred during signup" });
            console.error("Signup error:", error);
        } finally {
            setSubmitting(false);
            setTimeout(() => {
                setErrors({ general: "" });
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-100 p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-xl shadow-lg border border-blue-50 overflow-hidden"
            >
                {/* Left Side - Registration Form */}
                <div className="w-full md:w-1/2 p-8 md:p-10 bg-blue-50/20">
                    <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
                        Create New Account
                    </h2>
                    <Formik
                        initialValues={{
                            firstName: "",
                            lastName: "",
                            gender: "",
                            email: "",
                            password: "",
                            confirmPassword: "",
                            avatar: null,
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, setFieldValue, errors }) => (
                            <Form className="space-y-4">
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* First Name */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-blue-900/100">
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                                            <Field
                                                type="text"
                                                name="firstName"
                                                placeholder="John"
                                                className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-blue-400/100"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="firstName"
                                            component="p"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div className="space-y-2">
                                        <label className="block text-sm font-medium text-blue-900/100">
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400" />
                                            <Field
                                                type="text"
                                                name="lastName"
                                                placeholder="Doe"
                                                className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-blue-400/100"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="lastName"
                                            component="p"
                                            className="text-red-500 text-xs mt-1"
                                        />
                                    </div>
                                </div>

                                {/* Gender */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-900/100">
                                        Gender
                                    </label>
                                    <div className="relative">
                                        <PiGenderIntersex className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400 z-10" />
                                        <Field
                                            as="select"
                                            name="gender"
                                            className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiMzNzQxNTAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1jaGV2cm9uLWRvd24iPjxwYXRoIGQ9Im02IDkgNiA2IDYtNiIvPjwvc3ZnPg==')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.2em]"
                                        >
                                            <option value="">
                                                Select Gender
                                            </option>
                                            <option value="Male">Male</option>
                                            <option value="Female">
                                                Female
                                            </option>
                                            <option value="Other">Other</option>
                                        </Field>
                                    </div>
                                    <ErrorMessage
                                        name="gender"
                                        component="p"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>

                                {/* Avatar Upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-blue-900/100">
                                        Profile Picture
                                    </label>
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setFieldValue(
                                                    "avatar",
                                                    e.currentTarget.files[0]
                                                )
                                            }
                                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                        />
                                        <div className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-blue-400 rounded-lg group-hover:border-blue-400 transition-colors">
                                            <FaImage className="w-6 h-6 text-blue-400 mb-3" />
                                            <p className="text-blue-900/100 text-sm">
                                                Click to upload profile photo
                                            </p>
                                            <p className="text-blue-400 text-xs mt-1">
                                                PNG, JPG, JPEG up to 2MB
                                            </p>
                                        </div>
                                    </div>
                                    <ErrorMessage
                                        name="avatar"
                                        component="p"
                                        className="text-red-500 text-xs mt-1"
                                    />
                                </div>

                                {/* Email */}
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

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                                name="password"
                                                placeholder="••••••••"
                                                className="w-full pl-10 pr-4 py-3 border border-blue-400 rounded-lg focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-colors placeholder-blue-400/100"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
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

                                    {/* Confirm Password */}
                                    <div className="space-y-2">
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
                                </div>

                                {/* Submit Button */}
                                <motion.div
                                    whileHover={{ scale: 1.02 }}
                                    className="pt-4"
                                >
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-gradient-to-br from-blue-600 to-blue-500 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-600 transition-all shadow-lg shadow-blue-200/50"
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                                                Creating Account...
                                            </span>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </button>
                                </motion.div>
                            </Form>
                        )}
                    </Formik>

                    <p className="text-center text-blue-900/100 mt-6 text-sm">
                        Already have an account?{" "}
                        <Link
                            to="/"
                            className="text-blue-600 font-semibold hover:underline hover:text-blue-700"
                        >
                            Log in here
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
                            Join Our Community
                        </h2>
                        <p className="text-sm opacity-90">
                            Start your journey with our platform today
                        </p>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;