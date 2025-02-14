/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../api/endpoints";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
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
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Formik
                initialValues={{
                    newPassword: "",
                    confirmPassword: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, errors }) => (
                    <Form className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl text-center font-bold mb-4">
                            Reset Password
                        </h2>
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
                        <div className="mb-4">
                            <label
                                htmlFor="password"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                New Password
                            </label>
                            <Field
                                id="password"
                                name="newPassword"
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name="newPassword"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <div className="mb-4">
                            <label
                                htmlFor="confirmPassword"
                                className="block text-gray-700 font-bold mb-2"
                            >
                                Confirm Password
                            </label>
                            <Field
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <ErrorMessage
                                name="confirmPassword"
                                component="div"
                                className="text-red-500 text-xs mt-1"
                            />
                        </div>
                        <div className="flex items-center justify-between mt-4">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            >
                                {isSubmitting ? "Resting.." : " Reset Password"}
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default ResetPassword;
