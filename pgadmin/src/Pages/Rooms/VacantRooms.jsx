// src/Pages/Rooms/VacantRooms.jsx

import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const VacantRooms = () => {

    const rooms =
        JSON.parse(
            localStorage.getItem("rooms")
        ) || [];

    const vacantRooms =
        rooms.filter(
            room => room.status !== "Occupied"
        );

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-5">
                    Vacant Rooms
                </h1>

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-3">
                                Room No
                            </th>

                            <th className="border p-3">
                                Type
                            </th>

                            <th className="border p-3">
                                Beds
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {vacantRooms.map(room => (
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

export default VacantRooms;