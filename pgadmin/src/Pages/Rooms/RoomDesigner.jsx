import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../Components/Layout/AdminLayout";
import RoomCanvas from "../../Components/Rooms/RoomCanvas";
import RoomToolbar from "../../Components/Rooms/RoomToolbar";
import roomLayout from "../../Data/RoomLayout";

const getRoomType = (beds) => {
    if (beds === 1) return "Single Room";
    if (beds === 2) return "Twin Room";
    if (beds === 3) return "Triple Room";
    if (beds === 4) return "Quad Room";
    if (beds >= 5) return "Common Room";
    return "Room";
};

const RoomDesigner = () => {

    const { id } = useParams();
    const roomData = roomLayout.find(room => room.id === Number(id));
    const [roomName, setRoomName] = useState("");
    const [beds, setBeds] = useState([]);
    const [tables, setTables] = useState([]);
    const [cupboards, setCupboards] = useState([]);
    useEffect(() => {

        const saved = localStorage.getItem(`room-layout-${id}`);
        if (saved) {
            const layout = JSON.parse(saved);
            setRoomName(layout.roomName);
            setBeds(layout.beds || []);
            setTables(layout.tables || []);
            setCupboards(layout.cupboards || []);
        } else {
            setRoomName(roomData?.roomName || "");
            setBeds(roomData?.beds || []);
            setTables([
                {
                    id: "table-1",
                    x: 300,
                    y: 100
                }
            ]);

            setCupboards([
                {
                    id: "cupboard-1",
                    x: 450,
                    y: 100
                }
            ]);
        }
    }, [id, roomData]);

    const addBed = () => {
        if (beds.length >= 6) return;
        setBeds([
            ...beds,
            {
                id: Date.now(),
                x: 50,
                y: 50
            }
        ]);
    };

    const removeBed = () => {
        if (beds.length <= 1) return;
        setBeds(beds.slice(0, -1));
    };

    const addTable = () => {
        setTables([
            ...tables,
            {
                id: `table-${Date.now()}`,
                x: 250,
                y: 120
            }
        ]);
    };

    const removeTable = () => {
        if (tables.length === 0) return;
        setTables(tables.slice(0, -1));
    };

    const addCupboard = () => {
        setCupboards([
            ...cupboards,
            {
                id: `cupboard-${Date.now()}`,
                x: 450,
                y: 120
            }
        ]);
    };

    const removeCupboard = () => {
        if (cupboards.length === 0) return;
        setCupboards(cupboards.slice(0, -1));
    };

    const updateBedPosition = (id, x, y) => {

        setBeds(
            beds.map(item =>
                item.id === id
                    ? { ...item, x, y }
                    : item
            )
        );
    };

    const updateTablePosition = (id, x, y) => {
        setTables(
            tables.map(item =>
                item.id === id
                    ? { ...item, x, y }
                    : item
            )
        );
    };

    const updateCupboardPosition = (id, x, y) => {
        setCupboards(
            cupboards.map(item =>
                item.id === id
                    ? { ...item, x, y }
                    : item
            )
        );
    };

    const saveLayout = () => {

        const layout = {
            roomId: id,
            roomName,
            roomType: getRoomType(beds.length),
            beds,
            tables,
            cupboards
        };

        localStorage.setItem(
            `room-layout-${id}`,
            JSON.stringify(layout)
        );

        alert("Layout Saved Successfully");
    };

    return (
        <AdminLayout>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                        Room Designer - Room {roomData?.roomNumber}
                    </h1>
                    <button onClick={saveLayout} className="bg-indigo-600 text-white px-5 py-3 rounded-lg">
                        Save Layout
                    </button>
                </div>

                <div className="bg-white rounded-xl shadow p-5">
                    <div className="grid md:grid-cols-3 gap-4">
                        <input type="text" value={roomName} onChange={e => setRoomName(e.target.value)} className="border rounded-lg p-3" />
                        <input type="text" value={getRoomType(beds.length)} readOnly className="border rounded-lg p-3 bg-gray-100" />
                        <input type="text" value={`Beds : ${beds.length}`} readOnly className="border rounded-lg p-3 bg-gray-100" />
                    </div>
                </div>
                <RoomToolbar
                    addBed={addBed}
                    removeBed={removeBed}
                    addTable={addTable}
                    removeTable={removeTable}
                    addCupboard={addCupboard}
                    removeCupboard={removeCupboard}
                    bedCount={beds.length}
                    tableCount={tables.length}
                    cupboardCount={cupboards.length}
                />

                <RoomCanvas
                    beds={beds}
                    tables={tables}
                    cupboards={cupboards}
                    updateBedPosition={updateBedPosition}
                    updateTablePosition={updateTablePosition}
                    updateCupboardPosition={updateCupboardPosition}
                />
            </div>
        </AdminLayout>
    );
};

export default RoomDesigner;