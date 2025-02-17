/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const ProfileCard = ( {avatar, firstName, lastName, gender, email} ) => {
    return (
        <div className="max-w-sm mx-auto bg-white rounded-xl mt-20 shadow-md overflow-hidden border border-gray-200">
            <div className="flex flex-col items-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                >
                    <img
                        src={avatar}
                        alt="User Avatar"
                        className="relative w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mt-4 text-2xl font-bold text-gray-900"
                >
                    {firstName + " " + lastName}
                </motion.h1>
                <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="mt-2 text-sm font-bold text-gray-500">{gender}</motion.p>
                <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-sm text-gray-500 mt-1">{email}</motion.p>

                <div className="flex gap-3 mt-6">
                    <motion.button initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        Subscribe
                    </motion.button>
                    <motion.button initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-50 transition-colors">
                        Message
                    </motion.button>
                </div>

                <div className="flex justify-between w-full mt-8 px-4">
                    <div className="text-center">
                        <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-xl font-bold text-gray-900">60.4k</motion.p>
                        <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-sm text-gray-500">Followers</motion.p>
                    </div>
                    <div className="text-center">
                        <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-xl font-bold text-gray-900">20k</motion.p>
                        <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-sm text-gray-500">Following</motion.p>
                    </div>
                    <div className="text-center">
                        <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-xl font-bold text-gray-900">12.4k</motion.p>
                        <motion.p initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }} className="text-sm text-gray-500">Posts</motion.p>
                    </div>
                </div>
            </div>
        </div>
    );
};


ProfileCard.propTypes = {
    avatar: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
};

export default ProfileCard;
