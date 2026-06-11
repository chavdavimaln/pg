import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
    LayoutDashboard,
    BedDouble,
    User,
    X
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const menus = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/admin/dashboard"
        },
        {
            name: "Rooms",
            icon: <BedDouble size={20} />,
            path: "/admin/rooms"
        },
        {
            name: "Profile",
            icon: <User size={20} />,
            path: "/admin/profile"
        }
    ];

    return (
        <>
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>

                <div className="h-16 flex items-center justify-between px-5 border-b border-gray-700">

                    <h2 className="text-xl font-bold">
                        PG Admin
                    </h2>

                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>

                </div>

                <nav className="p-4">

                    <ul className="space-y-2">

                        {menus.map((item) => (
                            <li key={item.path}>

                                <Link
                                    to={item.path}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path ? "bg-indigo-600 text-white" : "hover:bg-gray-800"}`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>

                            </li>
                        ))}

                    </ul>

                </nav>

            </aside>
        </>
    );
};

export default Sidebar;