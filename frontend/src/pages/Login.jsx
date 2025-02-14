import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserLogin } from "../api/endpoints";
import UserContext from "../context/userContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Login = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

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
                localStorage.removeItem("token");
                navigate("/");
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
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form>
                            {errors.general && (
                                <p className="text-red-500 text-semibold bg-red-100 border border-red-300 py-1 px-3 rounded text-center mb-4">
                                    {errors.general}
                                </p>
                            )}
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Your email address"
                                    id="email"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    id="password"
                                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div className="mb-4">
                                <Link
                                    to="/forget-password"
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {isSubmitting ? "Logging in..." : "Login"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p className="text-center text-gray-600 mt-4">
                    {"Don't have an account?"}
                    <Link
                        to="/register"
                        className="text-blue-500 hover:text-blue-700"
                    >
                        {" "}
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
