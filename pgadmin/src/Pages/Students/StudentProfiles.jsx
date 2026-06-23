import React, { useEffect, useState } from "react";
import { Check, Pencil, Trash2, X } from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import ResponsiveSortableTable from "../../Components/Common/ResponsiveSortableTable";
import {
    getStoredAllocations,
    getStoredStudents,
    saveStoredAllocations,
    saveStoredStudents,
} from "../../Utils/allocationHelper";

const emptyStudent = {
    name: "",
    phone: "",
    email: "",
    guardianName: "",
    address: "",
    idProof: "",
    joiningDate: "",
    notes: "",
};

const StudentProfiles = () => {
    const [students, setStudents] = useState([]);
    const [formData, setFormData] = useState(emptyStudent);
    const [editingId, setEditingId] = useState(null);
    const allocations = getStoredAllocations();

    useEffect(() => {
        setStudents(getStoredStudents());
    }, []);

    const resetForm = () => {
        setFormData(emptyStudent);
        setEditingId(null);
    };

    const saveStudent = () => {
        if (!formData.name.trim()) {
            alert("Please enter student or person name");
            return;
        }

        const student = {
            id: editingId || Date.now(),
            ...formData,
            name: formData.name.trim(),
        };

        const updatedStudents = editingId
            ? students.map((item) => (item.id === editingId ? student : item))
            : [...students, student];

        if (editingId) {
            const updatedAllocations = allocations.map((allocation) =>
                String(allocation.studentId) === String(editingId)
                    ? {
                          ...allocation,
                          studentName: student.name,
                          phone: student.phone || "",
                          email: student.email || "",
                      }
                    : allocation,
            );
            saveStoredAllocations(updatedAllocations);
        }

        saveStoredStudents(updatedStudents);
        setStudents(updatedStudents);
        resetForm();
    };

    const editStudent = (student) => {
        setEditingId(student.id);
        setFormData({
            name: student.name || "",
            phone: student.phone || "",
            email: student.email || "",
            guardianName: student.guardianName || "",
            address: student.address || "",
            idProof: student.idProof || "",
            joiningDate: student.joiningDate || "",
            notes: student.notes || "",
        });
    };

    const deleteStudent = (id) => {
        const hasAllocation = allocations.some((allocation) => String(allocation.studentId) === String(id));
        if (hasAllocation) {
            alert("This profile is used in an allocation. Delete or change the allocation first.");
            return;
        }

        const updatedStudents = students.filter((student) => student.id !== id);
        saveStoredStudents(updatedStudents);
        setStudents(updatedStudents);

        if (editingId === id) resetForm();
    };

    const profileColumns = [
        { key: "name", header: "Name", accessor: "name" },
        { key: "phone", header: "Phone", sortValue: (student) => student.phone || "-", render: (student) => student.phone || "-" },
        { key: "email", header: "Email", sortValue: (student) => student.email || "-", render: (student) => student.email || "-" },
        {
            key: "guardianName",
            header: "Guardian",
            sortValue: (student) => student.guardianName || "-",
            render: (student) => student.guardianName || "-",
        },
        {
            key: "idProof",
            header: "ID Proof",
            sortValue: (student) => student.idProof || "-",
            render: (student) => student.idProof || "-",
        },
        {
            key: "action",
            header: "Action",
            sortable: false,
            searchable: false,
            render: (student) => (
                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={() => editStudent(student)}
                        className="flex h-9 w-9 items-center justify-center rounded bg-indigo-600 text-white"
                        title="Edit profile"
                        aria-label="Edit profile"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>
                    <button
                        type="button"
                        onClick={() => deleteStudent(student.id)}
                        className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-white"
                        title="Delete profile"
                        aria-label="Delete profile"
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
                <h1 className="text-3xl font-bold">Student / Person Profiles</h1>

                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="grid md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="border p-3 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="border p-3 rounded-lg"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="border p-3 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="Guardian Name"
                            value={formData.guardianName}
                            onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                            className="border p-3 rounded-lg"
                        />
                        <input
                            type="text"
                            placeholder="ID Proof"
                            value={formData.idProof}
                            onChange={(e) => setFormData({ ...formData, idProof: e.target.value })}
                            className="border p-3 rounded-lg"
                        />
                        <input
                            type="date"
                            value={formData.joiningDate}
                            onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                            className="border p-3 rounded-lg"
                        />
                        <textarea
                            placeholder="Address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                            className="border p-3 rounded-lg md:col-span-2"
                        />
                        <textarea
                            placeholder="Notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="border p-3 rounded-lg md:col-span-2"
                        />
                    </div>

                    <div className="mt-5 flex gap-3">
                        <button
                            type="button"
                            onClick={saveStudent}
                            className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-600 text-white"
                            title={editingId ? "Update profile" : "Add profile"}
                            aria-label={editingId ? "Update profile" : "Add profile"}
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
                    <h2 className="text-xl font-bold mb-4">Profile List</h2>
                    <ResponsiveSortableTable
                        columns={profileColumns}
                        rows={students}
                        rowKey={(student) => student.id}
                        searchPlaceholder="Search profiles..."
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default StudentProfiles;
