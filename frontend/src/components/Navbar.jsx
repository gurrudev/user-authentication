/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Navbar = ({ user }) => {
    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/";
    };

    return (
        <nav className="bg-gray-800 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-lg font-bold">
                    <h2 className="hover:text-gray-400">User Authentication</h2>
                </div>
                <div className="flex items-center space-x-4">
                    <Link to="/home" className="text-white hover:text-gray-400">
                        Home
                    </Link>
                    {user && <p className="text-white">@{user}</p>}
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
