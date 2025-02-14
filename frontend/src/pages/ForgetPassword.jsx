/* eslint-disable no-unused-vars */
import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { forgoPassword } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
    const navigate = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is Required"),
    });

    const handleSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await forgoPassword(values);
            if (response.message === "Password reset link sent!") {
                setErrors({ success: "Reset link sent! Check your email." });
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            } else {
                setErrors({ general: response.message });
            }
        } catch (error) {
            console.error("Forget Password error:", error);
            setErrors({ general: "An error occurred during password reset" });
        } finally {
            setSubmitting(false);
            setTimeout(() => {
                setErrors({ general: "", success: "" });
            }, 3000);
        }
    };

    return (
        <div className="h-screen w-full flex items-center justify-center">
            <div className="p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h2 className="text-2xl text-center font-bold mb-6">
                    Forget Password
                </h2>
                <Formik
                    initialValues={{ email: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors }) => (
                        <Form className="mb-4">
                            {errors.general && (
                                <p className="text-red-500 text-semibold bg-red-100 border border-red-300 py-1 px-3 rounded text-center mb-4">
                                    {errors.general}
                                </p>
                            )}
                            {errors.success && (
                                <p className="text-green-600 text-semibold bg-green-50 border border-green-600 py-1 px-3 rounded text-center mb-4">
                                    {errors.success}
                                </p>
                            )}
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="email"
                            >
                                Email Address
                            </label>
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your email address"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name="email"
                                component="p"
                                className="text-red-500 text-xs mt-1"
                            />

                            <div className="flex items-center justify-between mt-4">
                                <button
                                    type="submit"
                                    className="w-full mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting
                                        ? "Sending..."
                                        : "Send Reset Link"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default ForgetPassword;
