import React from "react";

const Header = () => {
    return (
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold">Dashboard</h1>

            <div className="flex items-center gap-4">
                <span className="hidden sm:block text-gray-600">Admin User</span>

                <img src="https://i.pravatar.cc/40" alt="Admin" className="w-10 h-10 rounded-full object-cover" />
            </div>
        </header>
    );
};

export default Header;