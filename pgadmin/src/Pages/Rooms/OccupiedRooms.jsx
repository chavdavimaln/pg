// src/Pages/Rooms/OccupiedRooms.jsx

import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const OccupiedRooms = () => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];

    const occupiedRooms = rooms.filter(
        (room) => room.status === "Occupied"
    );

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-5">
                    Occupied Rooms
                </h1>

                <table className="w-full border">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-3 border">Room</th>
                            <th className="p-3 border">Type</th>
                            <th className="p-3 border">Beds</th>
                        </tr>
                    </thead>

                    <tbody>
                        {occupiedRooms.map((room) => (
                            <tr key={room.id}>
                                <td className="border p-3">
                                    {room.roomNumber}
                                </td>

                                <td className="border p-3">
                                    {room.roomType}
                                </td>

                                <td className="border p-3">
                                    {room.beds?.length}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </AdminLayout>
    );
};

export default OccupiedRooms;