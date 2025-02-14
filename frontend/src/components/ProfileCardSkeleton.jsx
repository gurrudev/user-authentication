/* eslint-disable no-unused-vars */
import React from "react";

const ProfileCardSkeleton = () => {
    return (
        <div className="animate-pulse flex flex-col items-center p-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>
    );
};

export default ProfileCardSkeleton;
