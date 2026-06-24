import React, { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import ResponsiveSortableTable from "../../Components/Common/ResponsiveSortableTable";
import {
    getStoredAllocations,
    getStoredRooms,
    getStoredStudents,
    isOccupied,
    isRoomUnderMaintenance,
    saveStoredAllocations,
    saveStoredRooms,
} from "../../Utils/allocationHelper";

const emptyForm = {
    studentId: "",
    studentName: "",
    photo: "",
    phone: "",
    email: "",
    roomId: "",
    bedId: "",
    tableId: "",
    cupboardId: "",
};

const StudentAllocation = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [rooms, setRooms] = useState([]);
    const [allocations, setAllocations] = useState([]);
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [bedOnlyModal, setBedOnlyModal] = useState(null);

    const selectedRoom = useMemo(
        () => rooms.find((room) => String(room.id) === String(formData.roomId)) || null,
        [rooms, formData.roomId],
    );

    useEffect(() => {
        const savedRooms = getStoredRooms();
        const savedAllocations = getStoredAllocations();
        const savedStudents = getStoredStudents();
        const allocationId = searchParams.get("allocationId");

        setRooms(savedRooms);
        setAllocations(savedAllocations);
        setStudents(savedStudents);

        if (allocationId) {
            const allocation = savedAllocations.find((item) => String(item.id) === String(allocationId));
            if (allocation) {
                setEditingId(allocation.id);
                setFormData({
                    studentId: allocation.studentId || "",
                    studentName: allocation.studentName || "",
                    photo: allocation.photo || "",
                    phone: allocation.phone || "",
                    email: allocation.email || "",
                    roomId: allocation.roomId || "",
                    bedId: allocation.bedId || "",
                    tableId: allocation.tableId || "",
                    cupboardId: allocation.cupboardId || "",
                });
                return;
            }
        }

        setFormData({
            ...emptyForm,
            roomId: searchParams.get("roomId") || "",
            bedId: searchParams.get("bedId") || "",
            tableId: searchParams.get("tableId") || "",
            cupboardId: searchParams.get("cupboardId") || "",
        });
    }, [searchParams]);

    const handleRoomChange = (roomId) => {
        setFormData({
            ...formData,
            roomId,
            bedId: "",
            tableId: "",
            cupboardId: "",
        });
    };

    const handleStudentChange = (studentId) => {
        const student = students.find((item) => String(item.id) === String(studentId));

        setFormData({
            ...formData,
            studentId,
            studentName: student?.name || "",
            photo: student?.photo || "",
            phone: student?.phone || "",
            email: student?.email || "",
        });
    };

    const isCurrentAllocationItem = (type, itemId) => {
        if (!editingId) return false;

        const allocation = allocations.find((item) => item.id === editingId);
        if (!allocation) return false;
        if (!selectedRoom || String(allocation.roomId) !== String(selectedRoom.id)) return false;

        if (type === "bed") return String(allocation.bedId) === String(itemId);
        if (type === "table") return String(allocation.tableId) === String(itemId);
        if (type === "cupboard") return String(allocation.cupboardId) === String(itemId);

        return false;
    };

    const isItemUnavailable = (type, itemId) =>
        selectedRoom && isOccupied(type, itemId, selectedRoom.id) && !isCurrentAllocationItem(type, itemId);

    const currentAllocation = useMemo(
        () => allocations.find((item) => String(item.id) === String(editingId)) || null,
        [allocations, editingId],
    );

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setSearchParams({});
    };

    const isKeepingSameMaintenanceAllocation = () => {
        if (!currentAllocation) return false;

        return (
            String(currentAllocation.studentId) === String(formData.studentId) &&
            String(currentAllocation.roomId) === String(formData.roomId) &&
            String(currentAllocation.bedId) === String(formData.bedId) &&
            String(currentAllocation.tableId) === String(formData.tableId) &&
            String(currentAllocation.cupboardId) === String(formData.cupboardId)
        );
    };

    const makeRoomAvailable = (roomId) => {
        const updatedRooms = rooms.map((item) =>
            String(item.id) === String(roomId) ? { ...item, status: "Available" } : item,
        );

        saveStoredRooms(updatedRooms);
        setRooms(updatedRooms);
    };

    const saveAllocation = (allowBedOnly = false) => {
        if (!formData.studentId) {
            alert("Please select a saved student/person profile first");
            return;
        }

        if (!formData.roomId || !formData.bedId) {
            alert("Please select room and bed");
            return;
        }

        const student = students.find((item) => String(item.id) === String(formData.studentId));
        if (!student) {
            alert("Selected profile was not found");
            return;
        }

        const room = rooms.find((item) => String(item.id) === String(formData.roomId));
        if (!room) {
            alert("Selected room was not found");
            return;
        }

        const totalBeds = room.beds?.length || Number(room.bedCount) || 0;
        const usedBedsInRoom = allocations.filter(
            (allocation) =>
                String(allocation.roomId) === String(room.id) &&
                String(allocation.id) !== String(editingId) &&
                allocation.bedId,
        ).length;

        if (totalBeds > 0 && usedBedsInRoom >= totalBeds) {
            alert("This room has no vacant bed available for another person");
            return;
        }

        if (isRoomUnderMaintenance(room) && !isKeepingSameMaintenanceAllocation()) {
            const allowStatusChange = window.confirm(
                "This room is under maintenance. Existing allotted members can remain, but a new or changed allotment is not allowed while the room is under maintenance.\n\nDo you want to change this room status to Available and continue?",
            );

            if (!allowStatusChange) {
                alert("Allotment cancelled. Keep the existing member or change the room status to Available first.");
                return;
            }

            makeRoomAvailable(room.id);
        }

        if (isItemUnavailable("bed", formData.bedId)) {
            alert("Selected bed already occupied");
            return;
        }

        if (formData.tableId && isItemUnavailable("table", formData.tableId)) {
            alert("Selected table already allotted");
            return;
        }

        if (formData.cupboardId && isItemUnavailable("cupboard", formData.cupboardId)) {
            alert("Selected cupboard already allotted");
            return;
        }

        const missingItems = [
            !formData.tableId ? "table" : "",
            !formData.cupboardId ? "cupboard" : "",
        ].filter(Boolean);

        if (missingItems.length && !allowBedOnly) {
            setBedOnlyModal({
                roomId: room.id,
                roomNumber: room.roomNumber,
                bedLabel: room.beds?.find((item) => String(item.id) === String(formData.bedId))?.label || "selected bed",
                missingItems,
            });
            return;
        }

        const bed = room.beds?.find((item) => String(item.id) === String(formData.bedId));
        const table = room.tables?.find((item) => String(item.id) === String(formData.tableId));
        const cupboard = room.cupboards?.find((item) => String(item.id) === String(formData.cupboardId));

        const allocation = {
            id: editingId || Date.now(),
            studentId: student.id,
            studentName: student.name,
            photo: student.photo || "",
            phone: student.phone || "",
            email: student.email || "",
            roomId: room.id,
            roomNumber: room.roomNumber,
            roomType: room.roomType,
            bedId: formData.bedId,
            bedLabel: bed?.label || "",
            tableId: formData.tableId,
            tableLabel: table?.label || "",
            cupboardId: formData.cupboardId,
            cupboardLabel: cupboard?.label || "",
            allocatedDate:
                allocations.find((item) => item.id === editingId)?.allocatedDate || new Date().toLocaleDateString(),
            status: "Occupied",
        };

        const updatedAllocations = editingId
            ? allocations.map((item) => (item.id === editingId ? allocation : item))
            : [...allocations, allocation];

        saveStoredAllocations(updatedAllocations);
        setAllocations(updatedAllocations);
        resetForm();

        alert(editingId ? "Allocation Updated Successfully" : "Student Allocated Successfully");
    };

    const continueBedOnlyAllocation = () => {
        setBedOnlyModal(null);
        saveAllocation(true);
    };

    const editAllocation = (allocation) => {
        setEditingId(allocation.id);
        setFormData({
            studentId: allocation.studentId || "",
            studentName: allocation.studentName || "",
            photo: allocation.photo || "",
            phone: allocation.phone || "",
            email: allocation.email || "",
            roomId: allocation.roomId || "",
            bedId: allocation.bedId || "",
            tableId: allocation.tableId || "",
            cupboardId: allocation.cupboardId || "",
        });
        setSearchParams({ allocationId: allocation.id });
    };

    const deleteAllocation = (id) => {
        const updated = allocations.filter((item) => item.id !== id);

        saveStoredAllocations(updated);
        setAllocations(updated);

        if (editingId === id) resetForm();
    };

    const allocationColumns = [
        { key: "studentName", header: "Student", accessor: "studentName" },
        {
            key: "photo",
            header: "Photo",
            sortValue: (item) => item.studentName || "",
            render: (item) =>
                item.photo ? (
                    <img src={item.photo} alt={item.studentName || "Profile"} className="h-10 w-10 rounded object-cover" />
                ) : (
                    "-"
                ),
        },
        { key: "roomNumber", header: "Room", accessor: "roomNumber" },
        { key: "bed", header: "Bed", sortValue: (item) => item.bedLabel || item.bedId, render: (item) => item.bedLabel || item.bedId },
        { key: "table", header: "Table", sortValue: (item) => item.tableLabel || "-", render: (item) => item.tableLabel || "-" },
        {
            key: "cupboard",
            header: "Cupboard",
            sortValue: (item) => item.cupboardLabel || "-",
            render: (item) => item.cupboardLabel || "-",
        },
        { key: "allocatedDate", header: "Date", accessor: "allocatedDate" },
        {
            key: "action",
            header: "Action",
            sortable: false,
            searchable: false,
            render: (item) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => editAllocation(item)}
                        className="flex h-9 w-9 items-center justify-center rounded bg-indigo-600 text-white"
                        title="Edit allocation"
                        aria-label="Edit allocation"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteAllocation(item.id)}
                        className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-white"
                        title="Delete allocation"
                        aria-label="Delete allocation"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            ),
        },
    ];

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Student Allocation</h1>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                        <h2 className="text-xl font-bold">{editingId ? "Update Allocation" : "New Allocation"}</h2>
                        <Link
                            to="/students"
                            className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 text-white"
                            title="Add new profile"
                            aria-label="Add new profile"
                        >
                            <Plus className="h-5 w-5" />
                        </Link>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <select
                            value={formData.studentId}
                            onChange={(e) => handleStudentChange(e.target.value)}
                            className="border p-3 rounded-lg"
                        >
                            <option value="">Select Saved Profile</option>
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.name} {student.phone ? `- ${student.phone}` : ""}
                                </option>
                            ))}
                        </select>
                        {students.length === 0 && (
                            <div className="md:col-span-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-amber-800">
                                Add a student/person profile before allocating any room item.
                            </div>
                        )}

                        <input
                            type="text"
                            placeholder="Student / Person Name"
                            value={formData.studentName}
                            readOnly
                            className="border p-3 rounded-lg bg-gray-100"
                        />
                        <div className="flex items-center gap-3 rounded-lg border bg-gray-100 p-3">
                            {formData.photo ? (
                                <img
                                    src={formData.photo}
                                    alt="Selected profile"
                                    className="h-12 w-12 rounded object-cover"
                                />
                            ) : (
                                <div className="flex h-12 w-12 items-center justify-center rounded bg-white text-xs text-gray-500">
                                    Photo
                                </div>
                            )}
                            <span className="text-sm text-gray-600">Profile photo</span>
                        </div>

                        <input
                            type="text"
                            placeholder="Mobile"
                            value={formData.phone}
                            readOnly
                            className="border p-3 rounded-lg bg-gray-100"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            readOnly
                            className="border p-3 rounded-lg bg-gray-100"
                        />

                        <select
                            value={formData.roomId}
                            onChange={(e) => handleRoomChange(e.target.value)}
                            className="border p-3 rounded-lg"
                        >
                            <option value="">Select Room</option>
                            {rooms.map((room) => (
                                <option key={room.id} value={room.id}>
                                    {room.roomNumber} - {room.roomType}
                                    {isRoomUnderMaintenance(room) ? " (Under Maintenance)" : ""}
                                </option>
                            ))}
                        </select>

                        {selectedRoom && (
                            <>
                                <select
                                    value={formData.bedId}
                                    onChange={(e) => setFormData({ ...formData, bedId: e.target.value })}
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="">Select Bed</option>
                                    {selectedRoom.beds?.map((bed) => {
                                        const unavailable = isItemUnavailable("bed", bed.id);
                                        return (
                                            <option key={bed.id} value={bed.id} disabled={unavailable}>
                                                {bed.label}
                                                {unavailable ? " (Occupied)" : ""}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select
                                    value={formData.tableId}
                                    onChange={(e) => setFormData({ ...formData, tableId: e.target.value })}
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="">Select Table (Optional)</option>
                                    {selectedRoom.tables?.map((table) => {
                                        const unavailable = isItemUnavailable("table", table.id);
                                        return (
                                            <option key={table.id} value={table.id} disabled={unavailable}>
                                                {table.label}
                                                {unavailable ? " (Allotted)" : ""}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select
                                    value={formData.cupboardId}
                                    onChange={(e) => setFormData({ ...formData, cupboardId: e.target.value })}
                                    className="border p-3 rounded-lg"
                                >
                                    <option value="">Select Cupboard (Optional)</option>
                                    {selectedRoom.cupboards?.map((cupboard) => {
                                        const unavailable = isItemUnavailable("cupboard", cupboard.id);
                                        return (
                                            <option key={cupboard.id} value={cupboard.id} disabled={unavailable}>
                                                {cupboard.label}
                                                {unavailable ? " (Allotted)" : ""}
                                            </option>
                                        );
                                    })}
                                </select>
                            </>
                        )}
                    </div>

                    <div className="mt-5 flex gap-3">
                        <button
                            type="button"
                            onClick={() => saveAllocation()}
                            className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-white"
                            title={editingId ? "Update allocation" : "Allocate student"}
                            aria-label={editingId ? "Update allocation" : "Allocate student"}
                        >
                            <Check className="h-5 w-5" />
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-600 text-white"
                                title="Cancel edit"
                                aria-label="Cancel edit"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Allocation List</h2>
                    <ResponsiveSortableTable
                        columns={allocationColumns}
                        rows={allocations}
                        rowKey={(item) => item.id}
                        searchPlaceholder="Search allocations..."
                    />
                </div>

                {bedOnlyModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
                            <h3 className="text-xl font-bold">Assign Bed Only?</h3>
                            <div className="mt-3 space-y-2 text-sm text-gray-700">
                                <p>
                                    Room {bedOnlyModal.roomNumber} has {bedOnlyModal.bedLabel} selected, but no{" "}
                                    {bedOnlyModal.missingItems.join(" or ")} is selected for this person.
                                </p>
                                <p>
                                    You can add more room furniture from the room designer, or continue with bed
                                    occupation only. The room will still become partially occupied or occupied based on
                                    bed count.
                                </p>
                            </div>
                            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setBedOnlyModal(null)}
                                    className="rounded-lg border px-4 py-2 text-gray-700"
                                >
                                    Cancel
                                </button>
                                <Link
                                    to={`/rooms/designer/${bedOnlyModal.roomId}`}
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-center text-white"
                                >
                                    Add Table / Cupboard
                                </Link>
                                <button
                                    type="button"
                                    onClick={continueBedOnlyAllocation}
                                    className="rounded-lg bg-green-600 px-4 py-2 text-white"
                                >
                                    Continue Bed Only
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};

export default StudentAllocation;
