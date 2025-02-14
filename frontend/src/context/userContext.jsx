import { createContext, useState, useEffect, useMemo } from "react";
import { UserData } from "../api/endpoints";

const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchUserData = async () => {
            if (!token) {
                setIsLoading(false);
                return;
            }
            try {
                const res = await UserData(token);
                setUser(res.user);
            } catch (error) {
                console.error("Error fetching user data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserData();
    }, [token]);

    const contextValue = useMemo(
        () => ({ user, setUser, isLoading }),
        [user, isLoading]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContext;
