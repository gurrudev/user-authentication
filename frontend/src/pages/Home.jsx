import { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import UserContext from "../context/userContext";
import ProfileCardSkeleton from "../components/ProfileCardSkeleton";
import ProfileCard from "../components/ProfileCard";

const Home = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (!token) {
            navigate("/");
            return;
        }
    }, [token, navigate]);

    return (
        <>
            <Navbar user={isLoading ? "" : user && user.firstName} />

            {isLoading ? (
                <ProfileCardSkeleton />
            ) : (
                <ProfileCard
                    avatar={user && user.avatar}
                    firstName={user && user.firstName}
                    lastName={user && user.lastName}
                    gender={user && user.gender}
                    email={user && user.email}
                />
            )}
        </>
    );
};

export default Home;
