// pgadmin/src/Components/Rooms/RoomForm.jsx


import React, { useState } from "react";
const RoomForm = () => {
    const [form, setForm] = React.useState({
        roomNo: '',
        roomName: '',
        totalBeds: 2,
    });
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <div className="grid md:grid-cols-3 gap-4">
                <input type="text" placeholder="Room No" value={form.roomNo} onChange={(e) => setForm({ ...form, roomNo: e.target.value })} className="border p-2 rounded" />
                <input type="text" placeholder="Room Name" value={form.roomName} onChange={(e) => setForm({ ...form, roomName: e.target.value })} className="border p-2 rounded" />
                <select value={form.totalBeds} onChange={(e) => setForm({ ...form, totalBeds: e.target.value })} className="border p-2 rounded">
                    <option value={2}>2 Beds</option>
                    <option value={3}>3 Beds</option>
                    <option value={4}>4 Beds</option>
                    <option value={5}>5 Beds</option>
                </select>
            </div>
        </div>
    );
}

export default RoomForm;