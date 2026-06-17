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
    const roomData = roomLayout.find(room => room.id === Number(id));
    const [roomName, setRoomName] = useState("");
    const [beds, setBeds] = useState([]);
    const [tables, setTables] = useState([]);
    const [cupboards, setCupboards] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(600);
    const [canvasHeight, setCanvasHeight] = useState(400);

    // useEffect(() => {
    //     const saved = localStorage.getItem(`room-layout-${id}`);
    //     if (saved) {
    //         const layout = JSON.parse(saved);
    //         setRoomName(layout.roomName || "");
    //         setBeds( (layout.beds || []).map((item, index) => ({ ...item, label: item.label || `Bed-${index + 1}` })) );
    //         setTables( (layout.tables || []).map((item, index) => ({ ...item, label: item.label || `Table-${index + 1}` })) );
    //         setCupboards( (layout.cupboards || []).map((item, index) => ({ ...item, label: item.label || `Cupboard-${index + 1}` })) );
    //     } else {
    //         setRoomName(roomData?.roomName || "");
    //         setBeds(
    //             (roomData?.beds || [
    //                 {
    //                     id: "bed-1",
    //                     x: 50,
    //                     y: 50
    //                 }
    //             ]).map((item, index) => ({
    //                 ...item,
    //                 label: `Bed-${index + 1}`
    //             }))
    //         );

    //         setTables([
    //             {
    //                 id: "table-1",
    //                 label: "Table-1",
    //                 x: 300,
    //                 y: 100
    //             }
    //         ]);

    //         setCupboards([
    //             {
    //                 id: "cupboard-1",
    //                 label: "Cupboard-1",
    //                 x: 450,
    //                 y: 100
    //             }
    //         ]);
    //     }

    // }, [id, roomData]);

    // useEffect(() => {
    //     const result =
    //         calculateResponsiveLayout(
    //             beds,
    //             tables,
    //             cupboards,
    //             canvasWidth,
    //             canvasHeight
    //         );
    //     const updatedBeds =
    //         result.items.filter(
    //             item =>
    //                 item.type === "bed"
    //         );
    //     const updatedTables =
    //         result.items.filter(
    //             item =>
    //                 item.type === "table"
    //         );
    //     const updatedCupboards =
    //         result.items.filter(
    //             item =>
    //                 item.type === "cupboard"
    //         );
    //     setBeds(updatedBeds);
    //     setTables(updatedTables);
    //     setCupboards(updatedCupboards);
    //     if (
    //         result.canvasHeight >
    //         canvasHeight
    //     ) {
    //         setCanvasHeight(
    //             result.canvasHeight
    //         );
    //     }

    // }, [canvasWidth]);
    useEffect(() => {

        const saved =
            localStorage.getItem(
                `room-layout-${id}`
            );

        if (saved) {

            const layout =
                JSON.parse(saved);

            setRoomName(
                layout.roomName || ""
            );

            setBeds(
                layout.beds || []
            );

            setTables(
                layout.tables || []
            );

            setCupboards(
                layout.cupboards || []
            );

            setCanvasWidth(
                layout.canvasWidth || 600
            );

            setCanvasHeight(
                layout.canvasHeight || 400
            );

        } else {

            const room =
                roomData;

            if (room) {

                setRoomName(
                    room.roomName
                );

                setBeds(
                    room.beds || []
                );

                setTables(
                    room.tables || []
                );

                setCupboards(
                    room.cupboards || []
                );

                setCanvasWidth(
                    room.canvasWidth || 600
                );

                setCanvasHeight(
                    room.canvasHeight || 400
                );

            }

        }

    }, [id, roomData]);
    const addBed = () => {
        if (beds.length >= 6) return;
        const pos = getNextPosition([...beds, ...tables, ...cupboards], 70, 140);
        setBeds([...beds, {
            id: Date.now(),
            label: `Bed-${beds.length + 1}`,
            ...pos
        }
        ]);
    };

    // const removeBed = () => {
    //     if (beds.length <= 1) return;
    //     setBeds(beds.slice(0, -1));
    // };
    // const removeBed = () => {
    //     if (beds.length <= 1) return;
    //     const updatedBeds = beds.slice(0, -1).map((bed, index) => ({ ...bed, label: `Bed-${index + 1}` }));
    //     setBeds(updatedBeds);
    // }
    const removeBed = () => {
        if (beds.length <= 1) return;
        const updatedBeds = beds.slice(0, -1).map((item, index) => ({ ...item, label: `Bed-${index + 1}` }));
        setBeds(updatedBeds);
    };

    const addTable = () => {
        const pos = getNextPosition([...beds, ...tables, ...cupboards], 60, 50);
        setTables([...tables, {
            id: Date.now(),
            label: `Table-${tables.length + 1}`,
            ...pos
        }
        ]);
    };

    const removeTable = () => {

        if (tables.length <= 1) return;

        const updatedTables = tables
            .slice(0, -1)
            .map((item, index) => ({
                ...item,
                label: `Table-${index + 1}`
            }));

        setTables(updatedTables);
    };


    const addCupboard = () => {
        const pos = getNextPosition([...beds, ...tables, ...cupboards], 70, 60);
        setCupboards([...cupboards, {
            id: Date.now(),
            label: `Cupboard-${cupboards.length + 1}`,
            ...pos
        }
        ]);
    };

    const removeCupboard = () => {

        if (cupboards.length <= 1) return;

        const updatedCupboards = cupboards
            .slice(0, -1)
            .map((item, index) => ({
                ...item,
                label: `Cupboard-${index + 1}`
            }));

        setCupboards(updatedCupboards);
    };

    // const deleteSelectedItem = () => {
    //     if (selectedItem.type === "bed" && beds.length === 1) {
    //         alert("At least one Bed is required");
    //         return;
    //     }
    //     if (selectedItem.type === "table" && tables.length === 1) {
    //         alert("At least one Table is required");
    //         return;
    //     }
    //     if (selectedItem.type === "cupboard" && cupboards.length === 1) {
    //         alert("At least one Cupboard is required");
    //         return;
    //     }
    //     // setSelectedItem(null);
    // };
    const deleteSelectedItem = () => {

        if (!selectedItem)
            return;

        if (
            selectedItem.type === "bed"
        ) {

            if (beds.length <= 1) {

                alert(
                    "At least one bed required"
                );

                return;
            }

            setBeds(
                beds.filter(
                    item =>
                        item.id !== selectedItem.id
                )
            );
        }

        if (
            selectedItem.type === "table"
        ) {

            setTables(
                tables.filter(
                    item =>
                        item.id !== selectedItem.id
                )
            );
        }

        if (
            selectedItem.type === "cupboard"
        ) {

            setCupboards(
                cupboards.filter(
                    item =>
                        item.id !== selectedItem.id
                )
            );
        }

        setSelectedItem(null);

    };

    const updateBedPosition = (
        id,
        x,
        y
    ) => {

        if (
            isOverlapping(
                x,
                y,
                70,
                140,
                id
            )
        ) {
            alert(
                "Cannot overlap another item"
            );
            return;
        }

        setBeds(
            beds.map(item =>
                item.id === id
                    ? { ...item, x, y }
                    : item
            )
        );
    };

    const updateTablePosition = (
        id, x, y) => {
        if (isOverlapping(x, y, 60, 50, id)) {
            alert("Cannot overlap another item");
            return;
        }
        setTables(
            tables.map(item =>
                item.id === id
                    ? { ...item, x, y }
                    : item
            )
        );
    };

    const updateCupboardPosition = (
        id,
        x,
        y
    ) => {

        if (
            isOverlapping(
                x,
                y,
                70,
                60,
                id
            )
        ) {
            alert(
                "Cannot overlap another item"
            );
            return;
        }

        setCupboards(
            cupboards.map(item => item.id === id ? { ...item, x, y } : item)
        );
    };

    // const saveLayout = () => {

    //     const layout = {
    //         roomId: id,
    //         roomName,
    //         roomType: getRoomType(beds.length),
    //         beds,
    //         tables,
    //         cupboards
    //     };

    //     localStorage.setItem(
    //         `room-layout-${id}`,
    //         JSON.stringify(layout)
    //     );

    //     alert("Layout Saved Successfully");
    // };
    const saveLayout = () => {

        const layout = {

            roomId: id,

            roomName,

            roomType:
                getRoomType(
                    beds.length
                ),

            canvasWidth,
            canvasHeight,

            beds,
            tables,
            cupboards

        };

        localStorage.setItem(
            `room-layout-${id}`,
            JSON.stringify(layout)
        );

        alert(
            "Layout Saved Successfully"
        );

    };

    const ITEM_GAP = 20;

    const getNextPosition = (existingItems, itemWidth, itemHeight) => {
        const cols = Math.floor(canvasWidth / (itemWidth + ITEM_GAP)) || 1;
        const index = existingItems.length;
        const col = index % cols;
        const row = Math.floor(index / cols);
        return {
            x: col * (itemWidth + ITEM_GAP),
            y: row * (itemHeight + ITEM_GAP)
        };
    };
    const isOverlapping = (
        x,
        y,
        width,
        height,
        currentId
    ) => {

        const items = [
            ...beds,
            ...tables,
            ...cupboards
        ];

        return items.some(item => {

            if (item.id === currentId)
                return false;

            const w =
                item.label.includes("Bed")
                    ? 70
                    : 60;

            const h =
                item.label.includes("Bed")
                    ? 140
                    : 60;

            return (
                x < item.x + w &&
                x + width > item.x &&
                y < item.y + h &&
                y + height > item.y
            );
        });
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

                <div className="bg-white rounded-xl shadow p-5 canvas-size-input">
                    <h3 className="font-semibold mb-4">
                        Canvas Size
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2">
                                Width (Min 400)
                            </label>
                            <input type="number" min="400" value={canvasWidth} onChange={(e) => setCanvasWidth(Math.max(400, Number(e.target.value)))} className="w-full border rounded-lg p-3" />
                        </div>
                        <div>
                            <label className="block mb-2">
                                Height (Min 300)
                            </label>
                            <input type="number" min="300" value={canvasHeight} onChange={(e) => setCanvasHeight(Math.max(300, Number(e.target.value)))} className="w-full border rounded-lg p-3" />
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
                />
                <RoomCanvas
                    beds={beds}
                    tables={tables}
                    cupboards={cupboards}
                    selectedItem={selectedItem}
                    setSelectedItem={setSelectedItem}
                    updateBedPosition={updateBedPosition}
                    updateTablePosition={updateTablePosition}
                    updateCupboardPosition={updateCupboardPosition}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                />

            </div>
        </AdminLayout>
    );
};

export default RoomDesigner;