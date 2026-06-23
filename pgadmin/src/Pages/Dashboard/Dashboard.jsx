// pgadmin/src/Pages/Dashboard/Dashboard.jsx

import React from "react";
import { Bed, DoorOpen, Home, UserCheck, Users, Warehouse } from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { getStoredAllocations, getStoredRooms, getStoredStudents } from "../../Utils/allocationHelper";

const Dashboard = () => {
    const rooms = getStoredRooms();
    const allocations = getStoredAllocations();
    const students = getStoredStudents();

    // These totals are derived from the saved room layouts so the dashboard stays in sync with room designer edits.
    const totalBeds = rooms.reduce((total, room) => total + (room.beds?.length || 0), 0);
    const occupiedBeds = allocations.filter((allocation) => allocation.bedId).length;
    const totalTables = rooms.reduce((total, room) => total + (room.tables?.length || 0), 0);
    const totalCupboards = rooms.reduce((total, room) => total + (room.cupboards?.length || 0), 0);
    const totalDoors = rooms.reduce((total, room) => total + (room.doors?.length || 0), 0);
    const occupiedRooms = new Set(allocations.map((allocation) => String(allocation.roomId))).size;

    const cards = [
        { title: "Rooms", value: rooms.length, detail: `${occupiedRooms} occupied`, icon: Home, color: "text-indigo-600" },
        { title: "Students", value: students.length, detail: `${allocations.length} allotments`, icon: Users, color: "text-sky-600" },
        { title: "Beds", value: totalBeds, detail: `${Math.max(totalBeds - occupiedBeds, 0)} vacant`, icon: Bed, color: "text-blue-600" },
        { title: "Tables", value: totalTables, detail: `${allocations.filter((item) => item.tableId).length} allotted`, icon: UserCheck, color: "text-amber-600" },
        {
            title: "Cupboards",
            value: totalCupboards,
            detail: `${allocations.filter((item) => item.cupboardId).length} allotted`,
            icon: Warehouse,
            color: "text-green-700",
        },
        { title: "Doors", value: totalDoors, detail: "room entries", icon: DoorOpen, color: "text-slate-700" },
    ];

    const recentAllocations = allocations.slice(-5).reverse();

    return (
        <AdminLayout>
            <div className="space-y-6">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div key={card.title} className="rounded-lg bg-white p-5 text-left shadow">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">{card.title}</h3>
                                        <p className="mt-2 text-3xl font-bold">{card.value}</p>
                                        <p className="mt-1 text-sm text-gray-500">{card.detail}</p>
                                    </div>
                                    <Icon className={`h-7 w-7 ${card.color}`} />
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Recent Allotments</h2>
                        <ul className="space-y-3">
                            {recentAllocations.length > 0 ? (
                                recentAllocations.map((allocation) => (
                                    <li key={allocation.id} className="border-b pb-3 last:border-b-0 last:pb-0">
                                        <p className="font-medium">{allocation.studentName}</p>
                                        <p className="text-sm text-gray-500">
                                            Room {allocation.roomNumber} - {allocation.bedLabel || allocation.bedId}
                                        </p>
                                    </li>
                                ))
                            ) : (
                                <li className="text-gray-500">No allotments yet.</li>
                            )}
                        </ul>
                    </div>

                    <div className="rounded-lg bg-white p-6 shadow">
                        <h2 className="mb-4 text-lg font-semibold">Occupancy</h2>
                        <div className="space-y-4">
                            <div>
                                <div className="mb-1 flex justify-between">
                                    <span>Beds Occupied</span>
                                    <span>
                                        {occupiedBeds}/{totalBeds || 0}
                                    </span>
                                </div>
                                <div className="h-3 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-3 rounded-full bg-blue-500"
                                        style={{ width: `${totalBeds ? (occupiedBeds / totalBeds) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="mb-1 flex justify-between">
                                    <span>Rooms Occupied</span>
                                    <span>
                                        {occupiedRooms}/{rooms.length || 0}
                                    </span>
                                </div>
                                <div className="h-3 w-full rounded-full bg-gray-200">
                                    <div
                                        className="h-3 rounded-full bg-green-600"
                                        style={{ width: `${rooms.length ? (occupiedRooms / rooms.length) * 100 : 0}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Dashboard;
