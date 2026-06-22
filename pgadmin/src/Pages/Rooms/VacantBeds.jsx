// src/Pages/Rooms/VacantBeds.jsx

import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const VacantBeds = () => {

    const rooms =
        JSON.parse(
            localStorage.getItem("rooms")
        ) || [];

    const allocations =
        JSON.parse(
            localStorage.getItem("allocations")
        ) || [];

    const occupiedBeds =
        allocations.map(
            item => item.bedId
        );

    const vacantBeds = [];

    rooms.forEach(room => {
        room.beds?.forEach(bed => {

            if (
                !occupiedBeds.includes(bed.id)
            ) {
                vacantBeds.push({
                    roomNumber:
                        room.roomNumber,
                    bedLabel:
                        bed.label
                });
            }

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