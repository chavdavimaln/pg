// src/Pages/Rooms/OccupiedBeds.jsx

import React from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const OccupiedBeds = () => {

    const allocations =
        JSON.parse(
            localStorage.getItem("allocations")
        ) || [];

    return (
        <AdminLayout>
            <div className="bg-white p-6 rounded-xl shadow">

                <h1 className="text-2xl font-bold mb-5">
                    Occupied Beds
                </h1>

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th className="border p-3">
                                Student
                            </th>

                            <th className="border p-3">
                                Room
                            </th>

                            <th className="border p-3">
                                Bed
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {allocations.map(item => (
                            <tr key={item.id}>
                                <td className="border p-3">
                                    {item.studentName}
                                </td>

                                <td className="border p-3">
                                    {item.roomNumber}
                                </td>

                                <td className="border p-3">
                                    {item.bedLabel}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
        </AdminLayout>
    );
};

export default OccupiedBeds;