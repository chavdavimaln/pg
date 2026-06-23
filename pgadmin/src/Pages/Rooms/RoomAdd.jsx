// pgadmin/src/Pages/Rooms/RoomAdd.jsx
import React, { useState } from "react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import RoomCanvas from "../../Components/Rooms/RoomCanvas";
import { calculateResponsiveLayout } from "../../Utils/roomLayoutEngine";
import { getStoredRooms, saveStoredRooms } from "../../Utils/allocationHelper";

const getRoomType = (beds) => {
    if (beds === 1) return "Single Room";
    if (beds === 2) return "Twin Room";
    if (beds === 3) return "Triple Room";
    if (beds === 4) return "Quad Room";
    return "Common Room";
};
const generateRoomNumber = () => {
    const rooms = getStoredRooms();

    return `R-${String(rooms.length + 1).padStart(3, "0")}`;
};
const RoomAdd = () => {
    const [roomData, setRoomData] = useState({
        roomNumber: generateRoomNumber(),
        roomType: "Single Room",
        bedCount: 1,
        canvasWidth: 600,
        canvasHeight: 400,
    });

    const [beds, setBeds] = useState([]);
    const [tables, setTables] = useState([]);
    const [cupboards, setCupboards] = useState([]);
    const [doors, setDoors] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const generateLayout = () => {
        // The layout engine can grow beyond the entered size when the selected item count needs more room.
        const result = calculateResponsiveLayout(Number(roomData.bedCount), roomData.canvasWidth, roomData.canvasHeight);
        setBeds(result.beds);
        setTables(result.tables);
        setCupboards(result.cupboards);
        setDoors(result.doors?.slice(0, 1) || []);
        setRoomData((prev) => ({
            ...prev,
            roomType: getRoomType(Number(roomData.bedCount)),
            canvasWidth: result.canvasWidth,
            canvasHeight: result.canvasHeight,
        }));
    };
    const saveRoom = () => {
        if (beds.length === 0) {
            alert("Please generate layout first");
            return;
        }
        const rooms = getStoredRooms();
        const room = {
            id: Date.now(),
            roomNumber: roomData.roomNumber,
            roomType: getRoomType(Number(roomData.bedCount)),
            bedCount: roomData.bedCount,
            canvasWidth: roomData.canvasWidth,
            canvasHeight: roomData.canvasHeight,
            status: "Available",
            beds,
            tables,
            cupboards,
            doors,
        };
        rooms.push(room);
        saveStoredRooms(rooms);
        console.log("Saved Rooms", rooms);
        alert("Room Saved Successfully");
        setRoomData({
            roomNumber: generateRoomNumber(),
            roomType: "Single Room",
            bedCount: 1,
            canvasWidth: 600,
            canvasHeight: 400,
        });
        setBeds([]);
        setTables([]);
        setCupboards([]);
        setDoors([]);
    };
    const isOverlapping = (x, y, width, height, currentId) => {
        const items = [...beds, ...tables, ...cupboards, ...doors];

        return items.some((item) => {
            if (item.id === currentId) return false;

            return x < item.x + item.width && x + width > item.x && y < item.y + item.height && y + height > item.y;
        });
    };
    const updateBedPosition = (id, x, y) => {
        const bed = beds.find((item) => item.id === id);

        if (isOverlapping(x, y, bed.width, bed.height, id)) {
            alert("Items cannot overlap");
            return;
        }

        setBeds(beds.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };
    const updateTablePosition = (id, x, y) => {
        const table = tables.find((item) => item.id === id);

        if (isOverlapping(x, y, table.width, table.height, id)) {
            alert("Items cannot overlap");
            return;
        }
        setTables(tables.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };
    const updateCupboardPosition = (id, x, y) => {
        const cupboard = cupboards.find((item) => item.id === id);

        if (isOverlapping(x, y, cupboard.width, cupboard.height, id)) {
            alert("Items cannot overlap");
            return;
        }

        setCupboards(cupboards.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };
    const updateDoorPosition = (id, x, y) => {
        const door = doors.find((item) => item.id === id);

        if (isOverlapping(x, y, door.width, door.height, id)) {
            alert("Items cannot overlap");
            return;
        }

        setDoors(doors.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };
    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold"> Add New Room </h1>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            value={roomData.roomNumber}
                            readOnly
                            className=" border p-3 rounded-lg bg-gray-100 cursor-not-allowed "
                        />
                        <select
                            value={roomData.roomType}
                            onChange={(e) => setRoomData({ ...roomData, roomType: e.target.value })}
                            className="border p-3 rounded-lg"
                        >
                            <option value="Single Room"> Single Room </option>
                            <option value="Twin Room"> Twin Room </option>
                            <option value="Triple Room"> Triple Room </option>
                            <option value="Quad Room"> Quad Room </option>
                            <option value="Common Room"> Common Room </option>
                        </select>

                        <div className="flex gap-2">
                            <select
                                value={roomData.bedCount}
                                onChange={(e) => {
                                    const count = Math.min(6, Number(e.target.value));
                                    setRoomData({ ...roomData, bedCount: count, roomType: getRoomType(count) });
                                }}
                                className="border p-3 rounded-lg flex-1"
                            >
                                {" "}
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <option key={num} value={num}>
                                        {" "}
                                        {num} Beds{" "}
                                    </option>
                                ))}{" "}
                            </select>
                            <input
                                type="number"
                                min="1"
                                max="6 "
                                value={roomData.bedCount}
                                onChange={(e) => {
                                    const count = Math.min(6, Math.max(1, Number(e.target.value)));
                                    setRoomData({ ...roomData, bedCount: count, roomType: getRoomType(count) });
                                }}
                                className="border p-3 rounded-lg w-24"
                            />
                        </div>
                        <input
                            type="number"
                            min="400"
                            value={roomData.canvasWidth}
                            onChange={(e) =>
                                setRoomData({ ...roomData, canvasWidth: Math.max(400, Number(e.target.value)) })
                            }
                            placeholder="Canvas Width"
                            className="border p-3 rounded-lg"
                        />
                        <input
                            type="number"
                            min="300"
                            value={roomData.canvasHeight}
                            onChange={(e) =>
                                setRoomData({ ...roomData, canvasHeight: Math.max(300, Number(e.target.value)) })
                            }
                            placeholder="Canvas Height"
                            className="border p-3 rounded-lg"
                        />
                    </div>
                    <div className="mt-5 flex gap-3">
                        <button onClick={generateLayout} className="bg-blue-600 text-white px-5 py-3 rounded-lg">
                            {" "}
                            Generate Layout{" "}
                        </button>
                        <button onClick={saveRoom} className="bg-green-600 text-white px-5 py-3 rounded-lg">
                            {" "}
                            Save Room{" "}
                        </button>
                    </div>
                </div>
                {beds.length > 0 && (
                    <div className="bg-white p-6 rounded-xl shadow">
                        <h2 className="font-bold text-xl mb-5"> Room Preview </h2>
                        <div className="flex justify-center">
                            {beds.length > 0 && (
                                <div className="bg-white p-6 rounded-xl shadow">
                                    <RoomCanvas
                                        beds={beds}
                                        tables={tables}
                                        cupboards={cupboards}
                                        doors={doors}
                                        selectedItem={selectedItem}
                                        setSelectedItem={setSelectedItem}
                                        updateBedPosition={updateBedPosition}
                                        updateTablePosition={updateTablePosition}
                                        updateCupboardPosition={updateCupboardPosition}
                                        updateDoorPosition={updateDoorPosition}
                                        canvasWidth={roomData.canvasWidth}
                                        canvasHeight={roomData.canvasHeight}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
};
export default RoomAdd;
