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
    saveStoredAllocations,
} from "../../Utils/allocationHelper";

const emptyForm = {
    studentId: "",
    studentName: "",
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

    const resetForm = () => {
        setFormData(emptyForm);
        setEditingId(null);
        setSearchParams({});
    };

    const saveAllocation = () => {
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

        const bed = room.beds?.find((item) => String(item.id) === String(formData.bedId));
        const table = room.tables?.find((item) => String(item.id) === String(formData.tableId));
        const cupboard = room.cupboards?.find((item) => String(item.id) === String(formData.cupboardId));

        const allocation = {
            id: editingId || Date.now(),
            studentId: student.id,
            studentName: student.name,
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

    const editAllocation = (allocation) => {
        setEditingId(allocation.id);
        setFormData({
            studentId: allocation.studentId || "",
            studentName: allocation.studentName || "",
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

                        <input
                            type="text"
                            placeholder="Phone"
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
                                    <option value="">Select Table</option>
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
                                    <option value="">Select Cupboard</option>
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
                            onClick={saveAllocation}
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
            </div>
        </AdminLayout>
    );
};

export default StudentAllocation;
