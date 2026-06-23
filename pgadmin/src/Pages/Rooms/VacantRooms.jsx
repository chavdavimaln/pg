// src/Pages/Rooms/VacantRooms.jsx

import React from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../Components/Layout/AdminLayout";
import {
    getStoredAllocations,
    getStoredRooms,
    getVacantBedsForRoom,
    isOccupied,
} from "../../Utils/allocationHelper";

const VacantRooms = () => {
    const rooms = getStoredRooms();
    const allocations = getStoredAllocations();

    const vacantRooms = rooms
        .map((room) => {
            const vacantBeds = getVacantBedsForRoom(room, allocations);
            const vacantTables = (room.tables || []).filter((table) => !isOccupied("table", table.id, room.id));
            const vacantCupboards = (room.cupboards || []).filter(
                (cupboard) => !isOccupied("cupboard", cupboard.id, room.id),
            );

            return {
                room,
                vacantBeds,
                vacantTables,
                vacantCupboards,
            };
        })
        .filter((item) => item.vacantBeds.length > 0);

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-xl shadow">
                <h1 className="text-2xl font-bold mb-5">Vacant Rooms</h1>

                <div className="overflow-auto">
                    <table className="w-full border">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border p-3">Room No</th>
                                <th className="border p-3">Type</th>
                                <th className="border p-3">Vacant Beds</th>
                                <th className="border p-3">Vacant Tables</th>
                                <th className="border p-3">Vacant Cupboards</th>
                                <th className="border p-3">Allocate</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vacantRooms.map(({ room, vacantBeds, vacantTables, vacantCupboards }) => (
                                <tr key={room.id}>
                                    <td className="border p-3">{room.roomNumber}</td>
                                    <td className="border p-3">{room.roomType}</td>
                                    <td className="border p-3">{vacantBeds.map((bed) => bed.label).join(", ")}</td>
                                    <td className="border p-3">
                                        {vacantTables.map((table) => table.label).join(", ") || "-"}
                                    </td>
                                    <td className="border p-3">
                                        {vacantCupboards.map((cupboard) => cupboard.label).join(", ") || "-"}
                                    </td>
                                    <td className="border p-3">
                                        <div className="flex flex-wrap gap-2">
                                            {vacantBeds.map((bed) => (
                                                <Link
                                                    key={bed.id}
                                                    to={`/student-allocation?roomId=${room.id}&bedId=${bed.id}`}
                                                    className="inline-block bg-green-600 text-white px-3 py-1 rounded"
                                                >
                                                    {bed.label}
                                                </Link>
                                            ))}
                                        </div>
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

export default VacantRooms;
