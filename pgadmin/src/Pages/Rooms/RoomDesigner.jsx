// pgadmin/src/Pages/Rooms/RoomDesigner.jsx

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import AdminLayout from "../../Components/Layout/AdminLayout";
import RoomCanvas from "../../Components/Rooms/RoomCanvas";
import RoomToolbar from "../../Components/Rooms/RoomToolbar";
import roomLayout from "../../Data/RoomLayout";
// import { calculateResponsiveLayout } from "../../Utils/roomLayoutEngine";

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
    const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
    const roomData = rooms.find((room) => String(room.id) === String(id));
    const [beds, setBeds] = useState([]);
    const [tables, setTables] = useState([]);
    const [cupboards, setCupboards] = useState([]);
    const [doors, setDoors] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(600);
    const [canvasHeight, setCanvasHeight] = useState(400);

    // setDoors(room.doors || []);

    useEffect(() => {
        const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        const room = rooms.find((item) => String(item.id) === String(id));
        if (!room) return;
        setBeds(room.beds || []);
        setTables(room.tables || []);
        setCupboards(room.cupboards || []);
        setCanvasWidth(room.canvasWidth || 600);
        setCanvasHeight(room.canvasHeight || 400);
    }, [id]);

    const addBed = () => {
        if (beds.length >= 6) return;
        const pos = getNextPosition([...beds, ...tables, ...cupboards], 70, 140);
        setBeds([
            ...beds,
            {
                id: Date.now(),
                label: `Bed-${beds.length + 1}`,
                width: 80,
                height: 120,
                ...pos,
            },
        ]);
    };

    const removeBed = () => {
        if (beds.length <= 1) return;
        const updatedBeds = beds.slice(0, -1).map((item, index) => ({ ...item, label: `Bed-${index + 1}` }));
        setBeds(updatedBeds);
    };

    const addTable = () => {
        if (tables.length >= 6) {
            alert("Maximum 6 tables allowed");
            return;
        }
        const pos = getNextPosition([...beds, ...tables, ...cupboards], 60, 50);
        setTables([
            ...tables,
            {
                id: Date.now(),
                label: `Table-${tables.length + 1}`,
                width: 60,
                height: 60,
                ...pos,
            },
        ]);
    };

    const removeTable = () => {
        if (tables.length <= 1) return;
        const updatedTables = tables.slice(0, -1).map((item, index) => ({
            ...item,
            label: `Table-${index + 1}`,
        }));
        setTables(updatedTables);
    };

    const addCupboard = () => {
        if (cupboards.length >= 6) {
            alert("Maximum 6 cupboards allowed");
            return;
        }
        const pos = getNextPosition([...beds, ...tables, ...cupboards], 70, 60);
        setCupboards([
            ...cupboards,
            {
                id: Date.now(),
                label: `Cupboard-${cupboards.length + 1}`,
                width: 80,
                height: 60,
                ...pos,
            },
        ]);
    };
    const addDoor = () => {
        if (doors.length >= 1) {
            alert("Only one door allowed");
            return;
        }
        setDoors([
            {
                id: Date.now(),
                label: "Door",
                x: 0,
                y: canvasHeight - 40,
                width: 80,
                height: 20,
                rotation: 0,
            },
        ]);
    };

    const removeCupboard = () => {
        if (cupboards.length <= 1) return;
        const updatedCupboards = cupboards.slice(0, -1).map((item, index) => ({
            ...item,
            label: `Cupboard-${index + 1}`,
        }));
        setCupboards(updatedCupboards);
    };

    const deleteSelectedItem = () => {
        if (!selectedItem) return;
        if (selectedItem.type === "bed") {
            if (beds.length <= 1) {
                alert("At least one bed required");

                return;
            }

            setBeds(beds.filter((item) => item.id !== selectedItem.id));
        }

        if (selectedItem.type === "table") {
            setTables(tables.filter((item) => item.id !== selectedItem.id));
        }

        if (selectedItem.type === "cupboard") {
            setCupboards(cupboards.filter((item) => item.id !== selectedItem.id));
        }

        if (
            selectedItem.type === "door"
        ) {
            setDoors(
                doors.filter(
                    (item) =>
                        item.id !== selectedItem.id
                )
            );
        }
        setSelectedItem(null);
    };

    const rotateSelectedItem = () => {

        if (!selectedItem) {
            alert("Select item");
            return;
        }

        const updateRotation = (
            items,
            setter
        ) => {
            setter(
                items.map((item) =>
                    item.id === selectedItem.id
                        ? {
                            ...item,
                            rotation:
                                ((item.rotation || 0) +
                                    90) %
                                360,
                        }
                        : item
                )
            );
        };

        if (
            selectedItem.type === "bed"
        )
            updateRotation(
                beds,
                setBeds
            );

        if (
            selectedItem.type === "table"
        )
            updateRotation(
                tables,
                setTables
            );

        if (
            selectedItem.type === "cupboard"
        )
            updateRotation(
                cupboards,
                setCupboards
            );

        if (
            selectedItem.type === "door"
        )
            updateRotation(
                doors,
                setDoors
            );
    };
    const updateBedPosition = (id, x, y) => {
        if (isOverlapping(x, y, 70, 140, id)) {
            alert("Cannot overlap another item");
            return;
        }

        setBeds(beds.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };

    const updateTablePosition = (id, x, y) => {
        if (isOverlapping(x, y, 60, 50, id)) {
            alert("Cannot overlap another item");
            return;
        }
        setTables(tables.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };

    const updateCupboardPosition = (id, x, y) => {
        if (isOverlapping(x, y, 70, 60, id)) {
            alert("Cannot overlap another item");
            return;
        }

        setCupboards(cupboards.map((item) => (item.id === id ? { ...item, x, y } : item)));
    };

    const updateDoorPosition = (
        id, x, y) => {
        setDoors(
            doors.map((item) =>
                item.id === id
                    ? { ...item, x, y }
                    : item
            )
        );
    };
    const saveLayout = () => {
        const rooms = JSON.parse(localStorage.getItem("rooms")) || [];
        const updatedRooms = rooms.map((room) => {
            if (String(room.id) === String(id)) {
                return {
                    ...room,
                    roomType: getRoomType(
                        beds.length
                    ),
                    canvasWidth,
                    canvasHeight,
                    beds,
                    tables,
                    cupboards,
                    doors,
                };
            }
        });

        localStorage.setItem("rooms", JSON.stringify(updatedRooms));

        alert("Layout Updated Successfully");

    };

    // const ITEM_GAP = 20;
    const GRID_SIZE = 40;

    const getNextPosition = (existingItems, itemWidth, itemHeight) => {
        const cols = Math.floor(canvasWidth / GRID_SIZE);
        for (let row = 0; row < 100; row++) {
            for (let col = 0; col < cols; col++) {
                const x = col * GRID_SIZE;
                const y = row * GRID_SIZE;
                const occupied = existingItems.some((item) => item.x === x && item.y === y);
                if (!occupied) {
                    return { x, y };
                }
            }
        }
        return { x: 0, y: 0 };
    };
    const isOverlapping = (x, y, width, height, currentId) => {
        const items = [...beds, ...tables, ...cupboards];
        return items.some((item) => {
            if (item.id === currentId) return false;
            const w = item.width || 60;
            const h = item.height || 60;
            return x < item.x + w && x + width > item.x && y < item.y + h && y + height > item.y;
        });
    };


    return (
        <AdminLayout>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Room Designer - Room {roomData?.roomNumber}</h1>
                    <button onClick={saveLayout} className="bg-indigo-600 text-white px-5 py-3 rounded-lg">
                        Save Layout
                    </button>
                </div>
                <div className="bg-white rounded-xl shadow p-5">
                    <div className="grid md:grid-cols-3 gap-4">
                        <input
                            type="text"
                            value={getRoomType(beds.length)}
                            readOnly
                            className="border rounded-lg p-3 bg-gray-100"
                        />
                        <input
                            type="text"
                            value={`Beds : ${beds.length}`}
                            readOnly
                            className="border rounded-lg p-3 bg-gray-100"
                        />
                    </div>
                </div>
                <div className="bg-white rounded-xl shadow p-5 canvas-size-input">
                    <h3 className="font-semibold mb-4">Canvas Size</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">Width (Min 400)</label>
                            <input
                                type="number"
                                min="400"
                                value={canvasWidth}
                                onChange={(e) => setCanvasWidth(Math.max(400, Number(e.target.value)))}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>
                        <div>
                            <label className="block mb-2">Height (Min 300)</label>
                            <input
                                type="number"
                                min="300"
                                value={canvasHeight}
                                onChange={(e) => setCanvasHeight(Math.max(300, Number(e.target.value)))}
                                className="w-full border rounded-lg p-3"
                            />
                        </div>
                    </div>
                </div>
                <RoomToolbar
                    addBed={addBed}
                    removeBed={removeBed}
                    addTable={addTable}
                    removeTable={removeTable}
                    addCupboard={addCupboard}
                    removeCupboard={removeCupboard}
                    deleteSelectedItem={deleteSelectedItem}
                    bedCount={beds.length}
                    tableCount={tables.length}
                    cupboardCount={cupboards.length}
                    rotateSelectedItem={rotateSelectedItem}
                    addDoor={addDoor}
                    doorCount={doors.length}
                />
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
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                />
            </div>
        </AdminLayout>
    );
};

export default RoomDesigner;
