/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

const ProfileCardSkeleton = () => {
    return (
        <div className="animate-pulse max-w-sm mx-auto bg-white rounded-xl mt-20 shadow-md overflow-hidden border border-gray-200">
            <div className=" flex flex-col items-center p-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
                <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                <div className="flex gap-3 mt-6">
                    <div className="bg-gray-300 px-12 py-5 rounded-full"></div>
                    <div className="bg-gray-300 px-12 py-5 rounded-full"></div>
                </div>
                <div className="flex justify-between w-full mt-8 px-4">
                    <div className="text-center">
                        <div className="bg-gray-300 rounded px-12 py-3 mb-2"></div>
                        <div className="bg-gray-300 rounded px-12 py-2 mb-2"></div>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-300 rounded px-12 py-3 mb-2"></div>
                        <div className="bg-gray-300 rounded px-12 py-2 mb-2"></div>
                    </div>
                    <div className="text-center">
                        <div className="bg-gray-300 rounded px-12 py-3 mb-2"></div>
                        <div className="bg-gray-300 rounded px-12 py-2 mb-2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCardSkeleton;
