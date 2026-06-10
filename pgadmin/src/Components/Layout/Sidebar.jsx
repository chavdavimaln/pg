import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, LayoutDashboard, Users, Settings, FileText } from "lucide-react";

const Sidebar = () => {
    const [open, setOpen] = useState(false);

    const menus = [
        { name: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/admin/dashboard" },
        { name: "Users", icon: <Users size={18} />, path: "/admin/users" },
        { name: "Blogs", icon: <FileText size={18} />, path: "/admin/blogs" },
        { name: "Settings", icon: <Settings size={18} />, path: "/admin/settings" }
    ];

    return (
        <>
            <button className="fixed top-4 left-4 z-50 p-2 bg-gray-900 text-white rounded lg:hidden" onClick={() => setOpen(true)}>
                <Menu size={22} />
            </button>

            {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)}></div>}
            <aside className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white overflow-y-auto transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
                {/* <aside className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-gray-900 text-white overflow-y-auto transform transition-transform duration-300 z-50 ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}> */}
                <div className="flex items-center justify-between p-5 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Admin Panel</h2>
                    <button className="lg:hidden" onClick={() => setOpen(false)}>
                        <X size={22} />
                    </button>
                </div>

                <nav className="p-4 space-y-2">
                    {menus.map((item, index) => (
                        <Link key={index} to={item.path} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition">
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;