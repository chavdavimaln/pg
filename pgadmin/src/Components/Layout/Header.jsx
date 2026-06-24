import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Menu,
    ChevronDown,
    User,
    LogOut
} from "lucide-react";
import { getCurrentAdmin, logoutAdmin } from "../../Utils/adminAuth";

const Header = ({ setSidebarOpen }) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const navigate = useNavigate();
    const currentAdmin = getCurrentAdmin();

    const logout = () => {
        logoutAdmin();
        navigate("/login", { replace: true });
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-30">
            <div className="h-16 px-4 lg:px-6 flex items-center justify-between">

                <div className="flex items-center gap-4">
                    <button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                        <Menu size={24} />
                    </button>
                    <Link to="/" className="text-xl font-bold text-indigo-600 lg:hidden">
                        PG Admin
                    </Link>
                </div>

                <div className="relative">

                    <button className="flex items-center gap-2" onClick={() => setProfileOpen(!profileOpen)}>
                        <img src="https://i.pravatar.cc/40" alt="User" className="w-10 h-10 rounded-full border" />
                        <span className="hidden sm:block font-medium">{currentAdmin?.name || "Admin"}</span>
                        <ChevronDown size={18} />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 top-12 w-52 bg-white rounded-lg shadow-lg border py-2">

                            <Link to="/admin/profile" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
                                <User size={18} />
                                Profile
                            </Link>

                            <button
                                type="button"
                                onClick={logout}
                                className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-100 text-left text-red-600"
                            >
                                <LogOut size={18} />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
