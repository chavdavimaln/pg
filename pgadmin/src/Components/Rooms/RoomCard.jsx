import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
    return (
        <div className="bg-white rounded-xl shadow p-5">

            <h3 className="font-semibold text-lg">
                {room.roomName}
            </h3>

            <p className="text-gray-500">
                Room No : {room.roomNo}
            </p>

            <p className="text-gray-500">
                Beds : {room.totalBeds}
            </p>

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