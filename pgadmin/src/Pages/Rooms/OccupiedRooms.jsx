// src/Pages/Rooms/OccupiedRooms.jsx

import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { getStoredAllocations, getStoredRooms } from "../../Utils/allocationHelper";

const OccupiedRooms = () => {
    const rooms = getStoredRooms();
    const allocations = getStoredAllocations();

    const occupiedRows = allocations.map((allocation) => {
        const room = rooms.find((item) => String(item.id) === String(allocation.roomId));
        return {
            ...allocation,
            roomType: allocation.roomType || room?.roomType || "-",
            roomNumber: allocation.roomNumber || room?.roomNumber || "-",
        };
    });

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-5">Occupied Rooms</h1>

                <div className="overflow-auto">
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-3 border">Room</th>
                                <th className="p-3 border">Type</th>
                                <th className="p-3 border">Bed</th>
                                <th className="p-3 border">Table</th>
                                <th className="p-3 border">Cupboard</th>
                                <th className="p-3 border">Student / Person</th>
                                <th className="p-3 border">Phone</th>
                                <th className="p-3 border">Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {occupiedRows.map((item) => (
                                <tr key={item.id}>
                                    <td className="border p-3">{item.roomNumber}</td>
                                    <td className="border p-3">{item.roomType}</td>
                                    <td className="border p-3">{item.bedLabel || item.bedId}</td>
                                    <td className="border p-3">{item.tableLabel || "-"}</td>
                                    <td className="border p-3">{item.cupboardLabel || "-"}</td>
                                    <td className="border p-3">{item.studentName}</td>
                                    <td className="border p-3">{item.phone || "-"}</td>
                                    <td className="border p-3">
                                        <Link
                                            to={`/student-allocation?allocationId=${item.id}`}
                                            className="inline-block bg-indigo-600 text-white px-3 py-1 rounded"
                                        >
                                            Change
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
};

export default OccupiedRooms;
