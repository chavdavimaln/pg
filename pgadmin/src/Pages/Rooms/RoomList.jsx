// pgadmin/src/Pages/Rooms/RoomList.jsx
import React from "react";
import RoomCard from "../../Components/Rooms/RoomCard";
import AdminLayout from "../../Components/Layout/AdminLayout";
import { getStoredAllocations, getStoredRooms, isRoomOccupied } from "../../Utils/allocationHelper";

const RoomList = () => {
    const rooms = getStoredRooms();
    const allocations = getStoredAllocations();
    return (
        <AdminLayout>
            <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Room List</h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {rooms.length > 0 ? (
                        rooms.map((room) => (
                            <RoomCard
                                key={room.id}
                                room={{
                                    ...room,
                                    status: isRoomOccupied(room.id, allocations) ? "Occupied" : "Available",
                                }}
                            />
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
