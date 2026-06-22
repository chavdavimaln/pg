import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";

const StudentAllocation = () => {
    const [rooms, setRooms] = useState([]);
    const [allocations, setAllocations] = useState([]);

    const [formData, setFormData] = useState({
        studentName: "",
        roomId: "",
        bedId: "",
        tableId: "",
        cupboardId: "",
    });

    const [selectedRoom, setSelectedRoom] = useState(null);

    useEffect(() => {
        const savedRooms =
            JSON.parse(localStorage.getItem("rooms")) || [];

        const savedAllocations =
            JSON.parse(localStorage.getItem("allocations")) || [];

        setRooms(savedRooms);
        setAllocations(savedAllocations);
    }, []);

    const handleRoomChange = (roomId) => {
        const room = rooms.find(
            (item) => String(item.id) === String(roomId)
        );

        setSelectedRoom(room);

        setFormData({
            ...formData,
            roomId,
            bedId: "",
            tableId: "",
            cupboardId: "",
        });
    };

    // const saveAllocation = () => {
    //     if (
    //         !formData.studentName ||
    //         !formData.roomId ||
    //         !formData.bedId
    //     ) {
    //         alert("Please fill all required fields");
    //         return;
    //     }

    //     const alreadyAllocated =
    //         allocations.find(
    //             (item) =>
    //                 String(item.roomId) ===
    //                 String(formData.roomId) &&
    //                 String(item.bedId) ===
    //                 String(formData.bedId)
    //         );

    //     if (alreadyAllocated) {
    //         alert("This bed is already occupied");
    //         return;
    //     }

    //     const room =
    //         rooms.find(
    //             (item) =>
    //                 String(item.id) ===
    //                 String(formData.roomId)
    //         ) || {};

    //     const allocation = {
    //         id: Date.now(),

    //         studentName:
    //             formData.studentName,

    //         roomId:
    //             formData.roomId,

    //         roomNumber:
    //             room.roomNumber,

    //         roomType:
    //             room.roomType,

    //         bedId:
    //             formData.bedId,

    //         tableId:
    //             formData.tableId,

    //         cupboardId:
    //             formData.cupboardId,

    //         allocatedDate:
    //             new Date().toLocaleDateString(),
    //     };

    //     const updatedAllocations = [
    //         ...allocations,
    //         allocation,
    //     ];

    //     localStorage.setItem(
    //         "allocations",
    //         JSON.stringify(updatedAllocations)
    //     );

    //     setAllocations(updatedAllocations);

    //     setFormData({
    //         studentName: "",
    //         roomId: "",
    //         bedId: "",
    //         tableId: "",
    //         cupboardId: "",
    //     });

    //     setSelectedRoom(null);

    //     alert("Student Allocated Successfully");
    // };

    const saveAllocation = () => {
        if (
            !formData.studentName ||
            !formData.roomId ||
            !formData.bedId
        ) {
            alert("Please fill required fields");
            return;
        }

        const existingAllocations =
            JSON.parse(
                localStorage.getItem("allocations")
            ) || [];

        // Check Bed Occupied
        const bedOccupied =
            existingAllocations.find(
                (item) =>
                    String(item.bedId) ===
                    String(formData.bedId)
            );

        if (bedOccupied) {
            alert("Selected bed already occupied");
            return;
        }

        const room =
            rooms.find(
                (item) =>
                    String(item.id) ===
                    String(formData.roomId)
            ) || {};

        const bed =
            room.beds?.find(
                (item) =>
                    String(item.id) ===
                    String(formData.bedId)
            ) || {};

        const table =
            room.tables?.find(
                (item) =>
                    String(item.id) ===
                    String(formData.tableId)
            ) || {};

        const cupboard =
            room.cupboards?.find(
                (item) =>
                    String(item.id) ===
                    String(formData.cupboardId)
            ) || {};

        const allocation = {
            id: Date.now(),

            studentName:
                formData.studentName,

            roomId:
                formData.roomId,

            roomNumber:
                room.roomNumber,

            roomType:
                room.roomType,

            bedId:
                formData.bedId,

            bedLabel:
                bed.label || "",

            tableId:
                formData.tableId,

            tableLabel:
                table.label || "",

            cupboardId:
                formData.cupboardId,

            cupboardLabel:
                cupboard.label || "",

            allocatedDate:
                new Date().toLocaleDateString(),

            status: "Occupied",
        };

        const updatedAllocations = [
            ...existingAllocations,
            allocation,
        ];

        localStorage.setItem(
            "allocations",
            JSON.stringify(updatedAllocations)
        );

        setAllocations(updatedAllocations);

        setFormData({
            studentName: "",
            roomId: "",
            bedId: "",
            tableId: "",
            cupboardId: "",
        });

        setSelectedRoom(null);

        alert("Student Allocated Successfully");
    };
    const deleteAllocation = (id) => {
        const updated = allocations.filter(
            (item) => item.id !== id
        );

        localStorage.setItem(
            "allocations",
            JSON.stringify(updated)
        );

        setAllocations(updated);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">
                    Student Allocation
                </h1>

                {/* Allocation Form */}
                <div className="bg-white p-6 rounded-xl shadow">

                    <div className="grid md:grid-cols-2 gap-4">

                        <input
                            type="text"
                            placeholder="Student Name"
                            value={formData.studentName}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    studentName:
                                        e.target.value,
                                })
                            }
                            className="border p-3 rounded-lg"
                        />

                        <select
                            value={formData.roomId}
                            onChange={(e) =>
                                handleRoomChange(
                                    e.target.value
                                )
                            }
                            className="border p-3 rounded-lg"
                        >
                            <option value="">
                                Select Room
                            </option>

                            {rooms.map((room) => (
                                <option
                                    key={room.id}
                                    value={room.id}
                                >
                                    {room.roomNumber}
                                    {" - "}
                                    {room.roomType}
                                </option>
                            ))}
                        </select>

                        {selectedRoom && (
                            <>
                                <select
                                    value={
                                        formData.bedId
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            bedId:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="">
                                        Select Bed
                                    </option>

                                    {selectedRoom.beds?.map(
                                        (bed) => (
                                            <option
                                                key={
                                                    bed.id
                                                }
                                                value={
                                                    bed.id
                                                }
                                            >
                                                {
                                                    bed.label
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                <select
                                    value={
                                        formData.tableId
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            tableId:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="">
                                        Select Table
                                    </option>

                                    {selectedRoom.tables?.map(
                                        (table) => (
                                            <option
                                                key={
                                                    table.id
                                                }
                                                value={
                                                    table.id
                                                }
                                            >
                                                {
                                                    table.label
                                                }
                                            </option>
                                        )
                                    )}
                                </select>

                                <select
                                    value={
                                        formData.cupboardId
                                    }
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            cupboardId:
                                                e.target
                                                    .value,
                                        })
                                    }
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="">
                                        Select Cupboard
                                    </option>

                                    {selectedRoom.cupboards?.map(
                                        (
                                            cupboard
                                        ) => (
                                            <option
                                                key={
                                                    cupboard.id
                                                }
                                                value={
                                                    cupboard.id
                                                }
                                            >
                                                {
                                                    cupboard.label
                                                }
                                            </option>
                                        )
                                    )}
                                </select>
                            </>
                        )}
                    </div>
                    <button
                        onClick={saveAllocation}
                        className="mt-5 px-6 py-3 bg-green-600 text-white rounded-lg"
                    >
                        Allocate Student
                    </button>
                </div>

                {/* Allocation List */}
                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">
                        Allocation List
                    </h2>
                    <div className="overflow-auto">
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">
                                        Student
                                    </th>
                                    <th className="border p-2">
                                        Room
                                    </th>
                                    <th className="border p-2">
                                        Bed
                                    </th>
                                    <th className="border p-2">
                                        Table
                                    </th>
                                    <th className="border p-2">
                                        Cupboard
                                    </th>
                                    <th className="border p-2">
                                        Date
                                    </th>
                                    <th className="border p-2">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {allocations.map(
                                    (item) => (
                                        <tr
                                            key={
                                                item.id
                                            }
                                        >
                                            <td className="border p-2">
                                                {
                                                    item.studentName
                                                }
                                            </td>

                                            <td className="border p-2">
                                                {
                                                    item.roomNumber
                                                }
                                            </td>

                                            <td className="border p-2">
                                                {
                                                    item.bedId
                                                }
                                            </td>

                                            <td className="border p-2">
                                                {
                                                    item.tableId
                                                }
                                            </td>

                                            <td className="border p-2">
                                                {
                                                    item.cupboardId
                                                }
                                            </td>

                                            <td className="border p-2">
                                                {
                                                    item.allocatedDate
                                                }
                                            </td>

                                            <td className="border p-2">
                                                <button
                                                    onClick={() =>
                                                        deleteAllocation(
                                                            item.id
                                                        )
                                                    }
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default StudentAllocation;