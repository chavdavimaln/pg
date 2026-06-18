// pgadmin/src/Components/Rooms/RoomCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    return (
        <div className="bg-white rounded-xl shadow p-5 room-card">
            <h3 className="font-semibold text-lg">{room.roomNumber}</h3>
            <p className="mt-2">{room.roomType}</p>
            <p className="text-gray-500">Beds :{room.beds?.length || 0}</p>
            <p className="text-green-600 font-medium">{room.status}</p>
            <Link
                to={`/rooms/designer/${room.id}`}
                className="inline-block mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
            >
                Design Room
            </Link>
        </div>
    );
};

export default RoomCard;
