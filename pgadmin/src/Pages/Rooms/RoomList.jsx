import React from "react";
import RoomCard from "../../components/rooms/RoomCard";
import roomData from "../../data/roomData";

const RoomList = () => {
    return (
        <div className="p-6">

            <h1 className="text-2xl font-bold mb-6">
                Room List
            </h1>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

                {roomData.map((room) => (
                    <RoomCard
                        key={room.id}
                        room={room}
                    />
                ))}

            </div>

        </div>
    );
};

export default RoomList;