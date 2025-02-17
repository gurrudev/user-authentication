/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Navbar = ({ user }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className="bg-gradient-to-br from-blue-600 to-blue-500 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo Section */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-2"
                >
                    <div className="w-8 h-8 bg-white/10 rounded-full mx-auto flex items-center justify-center backdrop-blur-sm">
                        <svg
                            className="w-6 h-6 text-white"
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
                    <h2 className="text-white text-2xl bold">UAuth</h2>
                </motion.div>

                {/* Desktop Menu Section */}
                <div
                    className="hidden md:flex items-center space-x-6"
                >
                    <Link
                        to="/home"
                        className="text-white hover:text-gray-200 transition duration-300"
                    >
                        Home
                    </Link>
                    {user && (
                        <p className="text-white font-semibold">@{user}</p>
                    )}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
                    >
                        Logout
                    </motion.button>
                </div>

                {/* Mobile Menu Icon */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMobileMenu}
                        className="text-white focus:outline-none"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu - Toggle visibility based on state */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="md:hidden bg-white absolute left-0 right-0 top-16 p-6 rounded-b-lg shadow-lg"
                >
                    <div className="flex flex-col items-center space-y-4">
                        <Link
                            to="/home"
                            className="text-blue-600 hover:text-blue-700 transition duration-300"
                            onClick={toggleMobileMenu}
                        >
                            Home
                        </Link>
                        {user && <p className="text-blue-600">@{user}</p>}
                        <button
                            onClick={handleLogout}
                            className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition duration-300"
                        >
                            Logout
                        </button>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
