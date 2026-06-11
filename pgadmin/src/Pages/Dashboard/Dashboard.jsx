// pgadmin/src/Pages/Dashboard/Dashboard.jsx

import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const Dashboard = () => {
    const cards = [
        { title: "Total Users", value: "1,250" },
        { title: "Total Blogs", value: "320" },
        { title: "Orders", value: "540" },
        { title: "Revenue", value: "$12,500" }
    ];

    return (
        <AdminLayout>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {cards.map((card, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow">
                        <h3 className="text-gray-500 mb-2">{card.title}</h3>
                        <p className="text-3xl font-bold">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">
                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Recent Activities</h2>

                    <ul className="space-y-3">
                        <li className="border-b pb-2">New user registered.</li>
                        <li className="border-b pb-2">Blog published.</li>
                        <li className="border-b pb-2">Settings updated.</li>
                        <li>Order completed.</li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Stats</h2>

                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Users</span>
                                <span>75%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-blue-500 h-3 rounded-full w-3/4"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Blogs</span>
                                <span>60%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-green-500 h-3 rounded-full w-3/5"></div>
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between mb-1">
                                <span>Orders</span>
                                <span>90%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3">
                                <div className="bg-red-500 h-3 rounded-full w-[90%]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;