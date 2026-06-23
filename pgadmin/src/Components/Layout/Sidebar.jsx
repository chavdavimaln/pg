import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BedDouble, User, X, ChevronDown, ChevronRight } from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();

    const [roomMenuOpen, setRoomMenuOpen] = useState(
        location.pathname.startsWith("/rooms")
    );

    const menus = [
        {
            name: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/"
        },
        {
            name: "Profiles",
            icon: <User size={20} />,
            path: "/students"
        },
        {
            name: "Student Allocation",
            icon: <User size={20} />,
            path: "/student-allocation",
        }
    ];

    return (
        <>
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
                <div className="h-16 flex items-center justify-between px-5 border-b border-gray-700">
                    <h2 className="text-xl font-bold">
                        PG Admin
                    </h2>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)} >
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        {/* Dashboard */}
                        {menus.map((item) => (
                            <li key={item.path}>
                                <Link to={item.path} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${location.pathname === item.path ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`} >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            </li>
                        ))}

                        {/* Rooms Menu */}
                        <li>
                            <button onClick={() => setRoomMenuOpen(!roomMenuOpen)} className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition ${location.pathname.startsWith("/rooms") ? "bg-gray-800 text-white" : "hover:bg-gray-800"}`} >
                                <div className="flex items-center gap-3">
                                    <BedDouble size={20} />
                                    <span>Rooms</span>
                                </div>

                                {roomMenuOpen ? (
                                    <ChevronDown size={18} />
                                ) : (
                                    <ChevronRight size={18} />
                                )}
                            </button>

                            {roomMenuOpen && (
                                <ul className="mt-2 space-y-1">
                                    <li>
                                        <Link to="/rooms" className={`block px-4 py-2 rounded-md text-sm text-start transition ${location.pathname === "/rooms" ? " text-white" : "text-gray-300 hover:bg-gray-800"}`} >
                                            All Rooms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/rooms/add" className={`block px-4 py-2 rounded-md text-sm text-start transition ${location.pathname === "/rooms/add" ? "text-white" : "text-gray-300 hover:bg-gray-800"}`} >
                                            Add Room
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/rooms/occupied" className={`block px-4 py-2 rounded-md text-sm text-start transition ${location.pathname === "/rooms/occupied" ? "text-white" : "text-gray-300 hover:bg-gray-800"}`} >
                                            Occupied Rooms
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/rooms/vacant" className={`block px-4 py-2 rounded-md text-sm text-start transition ${location.pathname === "/rooms/vacant" ? "text-white" : "text-gray-300 hover:bg-gray-800"}`} >
                                            Vacant Rooms
                                        </Link>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
