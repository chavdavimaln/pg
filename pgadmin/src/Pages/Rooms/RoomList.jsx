// pgadmin/src/Pages/Rooms/RoomList.jsx
import React from "react";
import RoomCard from "../../Components/Rooms/RoomCard";
import AdminLayout from "../../Components/Layout/AdminLayout";

const RoomList = () => {
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Room List</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rooms.length > 0 ? (
                        rooms.map(room => (
                            <RoomCard key={room.id} room={room} />
                        ))
                    ) : (
                        <div> No Rooms Found </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};
export default RoomList;