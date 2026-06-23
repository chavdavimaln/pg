// src/Pages/Rooms/VacantBeds.jsx

import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { getStoredAllocations, getStoredRooms, getVacantBedsForRoom } from "../../Utils/allocationHelper";

const VacantBeds = () => {

    const rooms = getStoredRooms();
    const allocations = getStoredAllocations();

    const vacantBeds = [];

    rooms.forEach(room => {
        getVacantBedsForRoom(room, allocations).forEach(bed => {
            vacantBeds.push({
                roomNumber:
                    room.roomNumber,
                bedLabel:
                    bed.label
            });
        });
    });

    return (
        <AdminLayout>

            <div className="bg-white p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-5">
                    Vacant Beds
                </h1>

                <table className="w-full border">

                    <thead>
                        <tr>
                            <th className="border p-3">
                                Room
                            </th>

                            <th className="border p-3">
                                Bed
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {vacantBeds.map(
                            (bed, index) => (
                                <tr key={index}>
                                    <td className="border p-3">
                                        {bed.roomNumber}
                                    </td>

                                    <td className="border p-3">
                                        {bed.bedLabel}
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>

                </table>

            </div>

        </AdminLayout>
    );
};

export default VacantBeds;
