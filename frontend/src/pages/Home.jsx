/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../api/endpoints";
import Navbar from "../components/Navbar";
import UserContext from "../context/userContext";

const Home = () => {
    const [data, setData] = useState(null);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);

    const memoizedUser = useMemo(() => user, [user]);

    // console.log(user);
    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
        const fetchData = async () => {
            const res = await UserData(token);
            setUser(res.user);
            if (res.message === "Invalid token") {
                navigate("/");
            } else {
                setData(res);
            }
        };
        fetchData();
    }, [token, navigate]);

    return (
        <>
            <Navbar user={memoizedUser && memoizedUser.firstName} />
            <div className="max-w-sm mx-auto bg-white rounded-xl mt-20 shadow-md overflow-hidden border border-gray-200">
                <div className="flex flex-col items-center p-6">
                    <img
                        src={memoizedUser && memoizedUser.avatar}
                        alt="User Avatar"
                        className="w-24 h-24 rounded-full border-2 border-gray-300"
                    />
                    <h2 className="mt-4 text-lg font-semibold text-gray-900">
                        {memoizedUser && memoizedUser.firstName + " " + memoizedUser.lastName}
                    </h2>
                    <p className="text-sm text-gray-600 capitalize">
                        {memoizedUser && memoizedUser.gender}
                    </p>
                    <p className="text-sm text-gray-500">
                        {memoizedUser && memoizedUser.email}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Home;
