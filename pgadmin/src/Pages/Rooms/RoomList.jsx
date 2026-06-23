// pgadmin/src/Pages/Rooms/RoomList.jsx
import React, { useMemo, useState } from "react";
import { Search } from "lucide-react";
import RoomCard from "../../Components/Rooms/RoomCard";
import AdminLayout from "../../Components/Layout/AdminLayout";
import {
    getStoredAllocations,
    getStoredRooms,
    isRoomOccupied,
    saveStoredAllocations,
    saveStoredRooms,
} from "../../Utils/allocationHelper";

const buildRoomView = (room, allocations) => {
    const roomAllocations = allocations.filter((allocation) => String(allocation.roomId) === String(room.id));

    // The card needs display-ready lists, while the saved room keeps only layout data.
    return {
        ...room,
        status: isRoomOccupied(room.id, allocations) ? "Occupied" : "Available",
        allocationCount: roomAllocations.length,
        occupiedBeds: roomAllocations.map((allocation) => allocation.bedLabel || allocation.bedId),
        occupiedTables: roomAllocations
            .filter((allocation) => allocation.tableId)
            .map((allocation) => allocation.tableLabel || allocation.tableId),
        occupiedCupboards: roomAllocations
            .filter((allocation) => allocation.cupboardId)
            .map((allocation) => allocation.cupboardLabel || allocation.cupboardId),
        allocatedStudents: roomAllocations.map((allocation) => allocation.studentName).filter(Boolean),
    };
};

const RoomList = () => {
    const [rooms, setRooms] = useState(getStoredRooms());
    const [allocations, setAllocations] = useState(getStoredAllocations());
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("roomNumber");

    const roomCards = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        // Search checks room fields and assigned item/student names so users can find a room from any visible card text.
        const visibleRooms = rooms
            .map((room) => buildRoomView(room, allocations))
            .filter((room) => {
                const searchableText = [
                    room.roomNumber,
                    room.roomType,
                    room.status,
                    ...(room.occupiedBeds || []),
                    ...(room.occupiedTables || []),
                    ...(room.occupiedCupboards || []),
                    ...(room.allocatedStudents || []),
                ]
                    .join(" ")
                    .toLowerCase();

                return searchableText.includes(searchText);
            });

        return [...visibleRooms].sort((first, second) => {
            if (sortBy === "occupiedFirst") return second.allocationCount - first.allocationCount;
            if (sortBy === "availableFirst") return first.allocationCount - second.allocationCount;
            if (sortBy === "beds") return (second.beds?.length || 0) - (first.beds?.length || 0);

            return String(first.roomNumber || "").localeCompare(String(second.roomNumber || ""), undefined, {
                numeric: true,
                sensitivity: "base",
            });
        });
    }, [allocations, rooms, search, sortBy]);

    const deleteRoom = (room) => {
        const roomAllocations = allocations.filter((allocation) => String(allocation.roomId) === String(room.id));
        const studentList = roomAllocations.map((allocation) => allocation.studentName).filter(Boolean).join(", ");

        // Room deletion is destructive because localStorage stores allocations separately from rooms.
        const message = roomAllocations.length
            ? `Delete Room ${room.roomNumber}? This will remove ${roomAllocations.length} student allotment(s): ${
                  studentList || "Unnamed student/person"
              }.`
            : `Delete Room ${room.roomNumber}?`;

        if (!window.confirm(`${message}\n\nThis action cannot be undone.`)) return;

        const updatedRooms = rooms.filter((item) => String(item.id) !== String(room.id));
        const updatedAllocations = allocations.filter((allocation) => String(allocation.roomId) !== String(room.id));

        // Persist both collections together to avoid orphaned allotments after a room is removed.
        saveStoredRooms(updatedRooms);
        saveStoredAllocations(updatedAllocations);
        setRooms(updatedRooms);
        setAllocations(updatedAllocations);
    };

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6">
                <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <h1 className="text-2xl font-bold">Room List</h1>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <div className="relative">
                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search rooms..."
                                className="w-full rounded-lg border py-2 pl-9 pr-3 sm:w-72"
                            />
                        </div>
                        <select
                            value={sortBy}
                            onChange={(event) => setSortBy(event.target.value)}
                            className="rounded-lg border px-3 py-2"
                            aria-label="Sort rooms"
                        >
                            <option value="roomNumber">Sort by room no</option>
                            <option value="occupiedFirst">Occupied first</option>
                            <option value="availableFirst">Available first</option>
                            <option value="beds">Most beds first</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {roomCards.length > 0 ? (
                        roomCards.map((room) => <RoomCard key={room.id} room={room} onDelete={deleteRoom} />)
                    ) : (
                        <div className="rounded-lg bg-white p-5 text-gray-500 shadow">No Rooms Found</div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default RoomList;
