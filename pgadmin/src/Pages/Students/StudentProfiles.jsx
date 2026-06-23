import React, { useEffect, useState } from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";
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
                        <button onClick={saveStudent} className="px-6 py-3 bg-green-600 text-white rounded-lg">
                            {editingId ? "Update Profile" : "Add Profile"}
                        </button>
                        {editingId && (
                            <button onClick={resetForm} className="px-6 py-3 bg-gray-600 text-white rounded-lg">
                                Cancel Edit
                            </button>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-bold mb-4">Profile List</h2>
                    <div className="overflow-auto">
                        <table className="w-full border">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">Name</th>
                                    <th className="border p-2">Phone</th>
                                    <th className="border p-2">Email</th>
                                    <th className="border p-2">Guardian</th>
                                    <th className="border p-2">ID Proof</th>
                                    <th className="border p-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id}>
                                        <td className="border p-2">{student.name}</td>
                                        <td className="border p-2">{student.phone || "-"}</td>
                                        <td className="border p-2">{student.email || "-"}</td>
                                        <td className="border p-2">{student.guardianName || "-"}</td>
                                        <td className="border p-2">{student.idProof || "-"}</td>
                                        <td className="border p-2">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => editStudent(student)}
                                                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => deleteStudent(student.id)}
                                                    className="bg-red-600 text-white px-3 py-1 rounded"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default StudentProfiles;
