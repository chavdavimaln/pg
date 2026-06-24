// pgadmin/src/Components/Rooms/RoomCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Eye, Trash2 } from "lucide-react";

const RoomCard = ({ room, onDelete }) => {
    const listItems = (items) => (items.length ? items.join(", ") : "-");
    const statusClass = {
        Occupied: "text-red-600",
        "Partially Occupied": "text-amber-600",
        "Under Maintenance": "text-slate-600",
        Available: "text-green-600",
    }[room.status] || "text-green-600";

    return (
        <div className="room-card flex h-full flex-col rounded-lg bg-white p-5 text-left shadow">
            <h3 className="break-words text-lg font-semibold">{room.roomNumber}</h3>
            <p className="mt-2">{room.roomType}</p>
            <p className="text-gray-500">Beds: {room.beds?.length || 0}</p>
            <div className="mt-3 flex-1 space-y-1 text-sm text-gray-600">
                <p className="break-words">Occupied Beds: {listItems(room.occupiedBeds || [])}</p>
                <p className="break-words">Occupied Tables: {listItems(room.occupiedTables || [])}</p>
                <p className="break-words">Occupied Cupboards: {listItems(room.occupiedCupboards || [])}</p>
            </div>
            <p className={`mt-3 font-medium ${statusClass}`}>{room.status}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                <Link
                    to={`/rooms/designer/${room.id}`}
                    className="flex h-9 w-9 items-center justify-center rounded bg-indigo-600 text-white"
                    title="View room designer"
                    aria-label="View room designer"
                >
                    <Eye className="h-4 w-4" />
                </Link>
                <button
                    type="button"
                    onClick={() => onDelete(room)}
                    className="flex h-9 w-9 items-center justify-center rounded bg-red-600 text-white"
                    title="Delete room"
                    aria-label="Delete room"
                >
                    <Trash2 className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
};

export default RoomCard;
