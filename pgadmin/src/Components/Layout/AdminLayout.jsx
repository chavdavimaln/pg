// pgadmin/src/Components/Layout/AdminLayout.jsx

import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const AdminLayout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="flex flex-col flex-1 lg:ml-64">
                <Header setSidebarOpen={setSidebarOpen} />

                <main className="flex-1 p-4 lg:p-6">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;