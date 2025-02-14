import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserContext from "../context/userContext";
import ProfileCardSkeleton from "../components/ProfileCardSkeleton";

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { user, isLoading } = useContext(UserContext);

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
    }, [token, navigate]);

    return (
        <>
            <Navbar user={isLoading ? "" : user && user.firstName} />
            <div className="max-w-sm mx-auto bg-white rounded-xl mt-20 shadow-md overflow-hidden border border-gray-200">
                {isLoading ? (
                    <ProfileCardSkeleton />
                ) : (
                    <div className="flex flex-col items-center p-6">
                        <img
                            src={user && user.avatar}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full border-2 border-gray-300"
                        />
                        <h2 className="mt-4 text-lg font-semibold text-gray-900">
                            {user && user.firstName + " " + user.lastName}
                        </h2>
                        <p className="text-sm text-gray-600 capitalize">
                            {user && user.gender}
                        </p>
                        <p className="text-sm text-gray-500">
                            {user && user.email}
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Home;
