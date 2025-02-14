import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { UserSignup } from "../api/endpoints";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const Register = () => {
    const navigate = useNavigate();

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
                navigate("/");
            }
        } catch (error) {
            setErrors({ general: "An error occurred during signup" });
            console.error("Signup error:", error);
        } finally {
            setSubmitting(false);
            setTimeout(() => {
                setErrors({general: ""})
            },3000)
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-8">
                <h2 className="text-3xl font-bold text-center mb-6">
                    Register
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
                        <Form
                            className="grid grid-cols-2 gap-4"
                            encType="multipart/form-data"
                        >
                            {errors.general && (
                                <p className="col-span-2 text-red-500 text-semibold bg-red-100 border border-red-300 py-1 px-3 rounded text-center mb-4">
                                    {errors.general}
                                </p>
                            )}
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    First Name
                                </label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    placeholder="Your first name"
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="firstName"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Last Name
                                </label>
                                <Field
                                    type="text"
                                    name="lastName"
                                    placeholder="Your last name"
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="lastName"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Gender
                                </label>
                                <Field
                                    as="select"
                                    name="gender"
                                    className="w-full p-3 border border-gray-300 rounded"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Field>
                                <ErrorMessage
                                    name="gender"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    name="email"
                                    placeholder="Your email address"
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Your password"
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Confirm Password
                                </label>
                                <Field
                                    type="password"
                                    name="confirmPassword"
                                    placeholder="Confirm password"
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">
                                    Avatar
                                </label>
                                <input
                                    type="file"
                                    name="avatar"
                                    onChange={(e) =>
                                        setFieldValue(
                                            "avatar",
                                            e.currentTarget.files[0]
                                        )
                                    }
                                    className="w-full p-3 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="avatar"
                                    component="p"
                                    className="text-red-500 text-xs mt-1"
                                />
                            </div>
                            <div className="col-span-2 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full max-w-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
                                >
                                    {isSubmitting
                                        ? "Registering..."
                                        : "Register"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p className="text-center text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link to="/" className="text-blue-500 hover:text-blue-700">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
