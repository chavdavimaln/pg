import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

const AdminLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-col flex-1 min-h-screen">
                <Header />

                <main className="flex-1 p-6">
                    {children}
                </main>

                <Footer />
            </div>
        </div>
    );
};

export default AdminLayout;