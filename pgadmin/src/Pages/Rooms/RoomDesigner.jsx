// pgadmin/src/Pages/Rooms/RoomDesigner.jsx

import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Pencil, Save, UserPlus } from "lucide-react";
import AdminLayout from "../../Components/Layout/AdminLayout";
import ResponsiveSortableTable from "../../Components/Common/ResponsiveSortableTable";
import RoomCanvas from "../../Components/Rooms/RoomCanvas";
import RoomToolbar from "../../Components/Rooms/RoomToolbar";
import { GRID_SIZE } from "../../Utils/gridConfig";
import { getRotatedSize } from "../../Utils/gridConfig";
import {
    CANVAS_PADDING,
    DEFAULT_SIZES,
    normalizeRoomItems,
} from "../../Utils/roomLayoutEngine";
import {
    getAllocationForItem,
    getStoredAllocations,
    getStoredRooms,
    getStoredStudents,
    isOccupied,
    saveStoredAllocations,
    saveStoredRooms,
} from "../../Utils/allocationHelper";
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
    const rooms = getStoredRooms();
    const roomData = rooms.find((room) => String(room.id) === String(id));
    const [beds, setBeds] = useState([]);
    const [tables, setTables] = useState([]);
    const [cupboards, setCupboards] = useState([]);
    const [doors, setDoors] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [canvasWidth, setCanvasWidth] = useState(600);
    const [canvasHeight, setCanvasHeight] = useState(400);
    const [allocations, setAllocations] = useState([]);
    const [students, setStudents] = useState([]);
    const [roomStatus, setRoomStatus] = useState("Available");

    // setDoors(room.doors || []);

    useEffect(() => {
        const rooms = getStoredRooms();
        const room = rooms.find((item) => String(item.id) === String(id));
        if (!room) return;
        setBeds(normalizeRoomItems(room.beds || [], "bed"));
        setTables(normalizeRoomItems(room.tables || [], "table"));
        setCupboards(normalizeRoomItems(room.cupboards || [], "cupboard"));
        setDoors(normalizeRoomItems(room.doors || [], "door"));
        setCanvasWidth(room.canvasWidth || 600);
        setCanvasHeight(room.canvasHeight || 400);
        setRoomStatus(room.status === "Under Maintenance" ? "Under Maintenance" : "Available");
        setAllocations(getStoredAllocations());
        setStudents(getStoredStudents());
    }, [id]);

    const addBed = () => {
        if (beds.length >= 6) return;
        const pos = getNextPosition([...beds, ...tables, ...cupboards, ...doors], DEFAULT_SIZES.bed.width, DEFAULT_SIZES.bed.height);
        setBeds([
            ...beds,
            {
                id: Date.now(),
                label: `Bed-${beds.length + 1}`,
                ...DEFAULT_SIZES.bed,
                ...pos,
            },
        ]);
    };

    const removeBed = () => {
        if (beds.length <= 1) return;
        const bed = beds[beds.length - 1];
        if (isOccupied("bed", bed.id, id)) {
            alert("Cannot remove an occupied bed. Delete the student allocation first.");
            return;
        }
        const updatedBeds = beds.slice(0, -1).map((item, index) => ({ ...item, label: `Bed-${index + 1}` }));
        setBeds(updatedBeds);
    };

    const addTable = () => {
        if (tables.length >= 6) {
            alert("Maximum 6 tables allowed");
            return;
        }
        const pos = getNextPosition([...beds, ...tables, ...cupboards, ...doors], DEFAULT_SIZES.table.width, DEFAULT_SIZES.table.height);
        setTables([
            ...tables,
            {
                id: Date.now(),
                label: `Table-${tables.length + 1}`,
                ...DEFAULT_SIZES.table,
                ...pos,
            },
        ]);
    };

    const removeTable = () => {
        if (tables.length <= 1) return;
        const table = tables[tables.length - 1];
        if (isOccupied("table", table.id, id)) {
            alert("Cannot remove an allotted table. Delete the student allocation first.");
            return;
        }
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
        const pos = getNextPosition([...beds, ...tables, ...cupboards, ...doors], DEFAULT_SIZES.cupboard.width, DEFAULT_SIZES.cupboard.height);
        setCupboards([
            ...cupboards,
            {
                id: Date.now(),
                label: `Cupboard-${cupboards.length + 1}`,
                ...DEFAULT_SIZES.cupboard,
                ...pos,
            },
        ]);
    };
    const addDoor = () => {
        if (doors.length >= 1) {
            alert("Only one door allowed");
            return;
        }
        const pos = getNextPosition([...beds, ...tables, ...cupboards], DEFAULT_SIZES.door.width, DEFAULT_SIZES.door.height);
        setDoors([
            {
                id: Date.now(),
                label: "Door",
                ...pos,
                ...DEFAULT_SIZES.door,
                rotation: 0,
            },
        ]);
    };

    const removeCupboard = () => {
        if (cupboards.length <= 1) return;
        const cupboard = cupboards[cupboards.length - 1];
        if (isOccupied("cupboard", cupboard.id, id)) {
            alert("Cannot remove an allotted cupboard. Delete the student allocation first.");
            return;
        }
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
            if (isOccupied("bed", selectedItem.id, id)) {
                alert("Cannot delete an occupied bed. Delete the student allocation first.");
                return;
            }

            setBeds(beds.filter((item) => item.id !== selectedItem.id));
        }

        if (selectedItem.type === "table") {
            if (isOccupied("table", selectedItem.id, id)) {
                alert("Cannot delete an allotted table. Delete the student allocation first.");
                return;
            }
            setTables(tables.filter((item) => item.id !== selectedItem.id));
        }

        if (selectedItem.type === "cupboard") {
            if (isOccupied("cupboard", selectedItem.id, id)) {
                alert("Cannot delete an allotted cupboard. Delete the student allocation first.");
                return;
            }
            setCupboards(cupboards.filter((item) => item.id !== selectedItem.id));
        }

        if (selectedItem.type === "door") {
            setDoors(doors.filter((item) => item.id !== selectedItem.id));
        }
        setSelectedItem(null);
    };

    // const rotateSelectedItem = () => {
    //     if (!selectedItem) {
    //         alert("Select item");
    //         return;
    //     }
    //     const updateRotation = (items, setter) => {
    //         setter(
    //             items.map((item) =>
    //                 item.id === selectedItem.id
    //                     ? {
    //                           ...item,
    //                           rotation: ((item.rotation || 0) + 90) % 360,
    //                       }
    //                     : item,
    //             ),
    //         );
    //     };
    //     if (selectedItem.type === "bed") updateRotation(beds, setBeds);
    //     if (selectedItem.type === "table") updateRotation(tables, setTables);
    //     if (selectedItem.type === "cupboard") updateRotation(cupboards, setCupboards);
    //     if (selectedItem.type === "door") updateRotation(doors, setDoors);
    // };
    const rotateSelectedItem = () => {
        if (!selectedItem) return;

        const rotateCollection = (collection, setter) => {
            setter(
                collection.map((item) => {
                    if (item.id !== selectedItem.id) return item;

                    const rotation = ((item.rotation || 0) + 90) % 360;

                    const size = getRotatedSize(item.width, item.height, rotation);

                    let x = item.x;
                    let y = item.y;

                    const overlap = isOverlapping(x, y, size.width, size.height, item.id);

                    if (overlap) {
                        const pos = getNextPosition(
                            [...beds, ...tables, ...cupboards, ...doors],
                            size.width,
                            size.height,
                        );

                        x = pos.x;
                        y = pos.y;
                    }

                    return {
                        ...item,
                        width: size.width,
                        height: size.height,
                        rotation,
                        x,
                        y,
                    };
                }),
            );
        };
        if (selectedItem.type === "bed") rotateCollection(beds, setBeds);
        if (selectedItem.type === "table") rotateCollection(tables, setTables);
        if (selectedItem.type === "cupboard") rotateCollection(cupboards, setCupboards);
        if (selectedItem.type === "door") rotateCollection(doors, setDoors);
    };
    const updateBedPosition = (id, x, y) => {
        const bed = beds.find((item) => item.id === id);
        if (!bed) return;

        if (isOutOfBounds(x, y, bed.width, bed.height) || isOverlapping(x, y, bed.width, bed.height, id)) {
            alert("Cannot overlap another item");
            return;
        }

        setBeds(beds.map((item) => (item.id === id ? { ...item, x, y } : item)));
        setSelectedItem({ ...bed, x, y, type: "bed" });
    };

    const updateTablePosition = (id, x, y) => {
        const table = tables.find((item) => item.id === id);
        if (!table) return;

        if (isOutOfBounds(x, y, table.width, table.height) || isOverlapping(x, y, table.width, table.height, id)) {
            alert("Cannot overlap another item");
            return;
        }
        setTables(tables.map((item) => (item.id === id ? { ...item, x, y } : item)));
        setSelectedItem({ ...table, x, y, type: "table" });
    };

    const updateCupboardPosition = (id, x, y) => {
        const cupboard = cupboards.find((item) => item.id === id);
        if (!cupboard) return;

        if (
            isOutOfBounds(x, y, cupboard.width, cupboard.height) ||
            isOverlapping(x, y, cupboard.width, cupboard.height, id)
        ) {
            alert("Cannot overlap another item");
            return;
        }

        setCupboards(cupboards.map((item) => (item.id === id ? { ...item, x, y } : item)));
        setSelectedItem({ ...cupboard, x, y, type: "cupboard" });
    };

    const updateDoorPosition = (id, x, y) => {
        const door = doors.find((item) => item.id === id);
        if (!door) return;

        if (isOutOfBounds(x, y, door.width, door.height) || isOverlapping(x, y, door.width, door.height, id)) {
            alert("Cannot overlap another item");
            return;
        }

        setDoors(doors.map((item) => (item.id === id ? { ...item, x, y } : item)));
        setSelectedItem({ ...door, x, y, type: "door" });
    };
    const saveLayout = () => {
        const rooms = getStoredRooms();
        const updatedRooms = rooms.map((room) => {
            if (String(room.id) === String(id)) {
                return {
                    ...room,
                    roomType: getRoomType(beds.length),
                    canvasWidth,
                    canvasHeight,
                    status: roomStatus,
                    beds,
                    tables,
                    cupboards,
                    doors,
                };
            }
            return room;
        });

        saveStoredRooms(updatedRooms);

        alert("Layout Updated Successfully");
    };

    // const ITEM_GAP = 20;
    // const GRID_SIZE = 40;

    // const getNextPosition = (existingItems, itemWidth, itemHeight) => {
    //     const cols = Math.floor(canvasWidth / GRID_SIZE);
    //     for (let row = 0; row < 100; row++) {
    //         for (let col = 0; col < cols; col++) {
    //             const x = col * GRID_SIZE;
    //             const y = row * GRID_SIZE;
    //             const occupied = existingItems.some((item) => item.x === x && item.y === y);
    //             if (!occupied) {
    //                 return { x, y };
    //             }
    //         }
    //     }
    //     return { x: 0, y: 0 };
    // };
    const getNextPosition = (existingItems, itemWidth, itemHeight) => {
        let width = canvasWidth;
        let height = canvasHeight;

        // Search grid cells with room padding first; if full, grow the canvas and search again.
        for (let attempt = 0; attempt < 12; attempt++) {
            const maxX = width - CANVAS_PADDING - itemWidth;
            const maxY = height - CANVAS_PADDING - itemHeight;

            for (let y = CANVAS_PADDING; y <= maxY; y += GRID_SIZE) {
                for (let x = CANVAS_PADDING; x <= maxX; x += GRID_SIZE) {
                    const occupied = existingItems.some((item) => {
                        const w = item.width || GRID_SIZE;
                        const h = item.height || GRID_SIZE;

                        return x < item.x + w && x + itemWidth > item.x && y < item.y + h && y + itemHeight > item.y;
                    });

                    if (!occupied) {
                        if (width !== canvasWidth) setCanvasWidth(width);
                        if (height !== canvasHeight) setCanvasHeight(height);
                        return { x, y };
                    }
                }
            }

            if (width <= height * 1.6) {
                width += GRID_SIZE * 2;
            } else {
                height += GRID_SIZE * 2;
            }
        }

        setCanvasWidth(width);
        setCanvasHeight(height);
        return { x: CANVAS_PADDING, y: CANVAS_PADDING };
    };
    const isOutOfBounds = (x, y, width, height) =>
        x < 0 || y < 0 || x + width > canvasWidth || y + height > canvasHeight;

    const isOverlapping = (x, y, width, height, currentId) => {
        const items = [...beds, ...tables, ...cupboards, ...doors];
        return items.some((item) => {
            if (item.id === currentId) return false;
            const w = item.width || 80;
            const h = item.height || 80;
            return x < item.x + w && x + width > item.x && y < item.y + h && y + height > item.y;
        });
    };

    const getCurrentSelectedItem = () => {
        if (!selectedItem) return null;

        const collection = {
            bed: beds,
            table: tables,
            cupboard: cupboards,
            door: doors,
        }[selectedItem.type];

        return collection?.find((item) => item.id === selectedItem.id)
            ? { ...collection.find((item) => item.id === selectedItem.id), type: selectedItem.type }
            : null;
    };

    const moveSelectedItem = (deltaX, deltaY) => {
        const item = getCurrentSelectedItem();
        if (!item) return;

        const x = item.x + deltaX;
        const y = item.y + deltaY;

        if (item.type === "bed") updateBedPosition(item.id, x, y);
        if (item.type === "table") updateTablePosition(item.id, x, y);
        if (item.type === "cupboard") updateCupboardPosition(item.id, x, y);
        if (item.type === "door") updateDoorPosition(item.id, x, y);
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const tagName = event.target.tagName?.toLowerCase();
            if (!selectedItem || ["input", "select", "textarea", "button"].includes(tagName)) return;

            const moves = {
                ArrowUp: [0, -GRID_SIZE],
                ArrowDown: [0, GRID_SIZE],
                ArrowLeft: [-GRID_SIZE, 0],
                ArrowRight: [GRID_SIZE, 0],
            };

            const move = moves[event.key];
            if (!move) return;

            event.preventDefault();
            moveSelectedItem(move[0], move[1]);
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedItem, beds, tables, cupboards, doors, canvasWidth, canvasHeight]);

    const getItemStatus = (type, item) => {
        const allocation = getAllocationForItem(type, item.id, id, allocations);
        return {
            id: item.id,
            allocation,
            status: allocation ? "Allocated" : "Vacant",
            student: allocation?.studentName || "-",
            label: item.label,
        };
    };

    const roomItems = [
        ...beds.map((item) => ({ type: "bed", ...getItemStatus("bed", item) })),
        ...tables.map((item) => ({ type: "table", ...getItemStatus("table", item) })),
        ...cupboards.map((item) => ({ type: "cupboard", ...getItemStatus("cupboard", item) })),
    ];

    const changeAllocationProfile = (allocationId, studentId) => {
        const student = students.find((item) => String(item.id) === String(studentId));
        if (!student) return;

        const updatedAllocations = allocations.map((allocation) =>
            allocation.id === allocationId
                ? {
                      ...allocation,
                      studentId: student.id,
                      studentName: student.name,
                      photo: student.photo || "",
                      phone: student.phone || "",
                      email: student.email || "",
                  }
                : allocation,
        );

        saveStoredAllocations(updatedAllocations);
        setAllocations(updatedAllocations);
    };

    const getAllocateLink = (item) => {
        const params = new URLSearchParams({ roomId: id });

        if (item.type === "bed") params.set("bedId", item.id);
        if (item.type === "table") params.set("tableId", item.id);
        if (item.type === "cupboard") params.set("cupboardId", item.id);

        return `/student-allocation?${params.toString()}`;
    };

    const allocationColumns = [
            { key: "label", header: "Item", accessor: "label" },
            { key: "type", header: "Type", accessor: "type" },
            { key: "status", header: "Status", accessor: "status" },
            { key: "student", header: "Student / Person", accessor: "student" },
            {
                key: "action",
                header: "Action",
                sortable: false,
                searchable: false,
                render: (item) =>
                    item.allocation ? (
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                            <select
                                value={item.allocation.studentId || ""}
                                onChange={(e) => changeAllocationProfile(item.allocation.id, e.target.value)}
                                className="min-w-40 rounded border p-2"
                            >
                                <option value="">Select Profile</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name}
                                    </option>
                                ))}
                            </select>
                            <Link
                                to={`/student-allocation?allocationId=${item.allocation.id}`}
                                className="flex h-9 w-9 items-center justify-center rounded bg-indigo-600 text-white"
                                title="Edit allocation"
                                aria-label="Edit allocation"
                            >
                                <Pencil className="h-4 w-4" />
                            </Link>
                        </div>
                    ) : (
                        <Link
                            to={getAllocateLink(item)}
                            className="flex h-9 w-9 items-center justify-center rounded bg-green-600 text-white"
                            title="Allocate item"
                            aria-label="Allocate item"
                        >
                            <UserPlus className="h-4 w-4" />
                        </Link>
                    ),
            },
    ];

    return (
        <AdminLayout>
            <div className="space-y-5">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Room Designer - Room {roomData?.roomNumber}</h1>
                    <button
                        type="button"
                        onClick={saveLayout}
                        className="flex h-11 w-11 items-center justify-center rounded-lg bg-indigo-600 text-white"
                        title="Save layout"
                        aria-label="Save layout"
                    >
                        <Save className="h-5 w-5" />
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
                        <select
                            value={roomStatus}
                            onChange={(e) => setRoomStatus(e.target.value)}
                            className="border rounded-lg p-3"
                        >
                            <option value="Available">Available</option>
                            <option value="Under Maintenance">Under Maintenance</option>
                        </select>
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
                    roomId={id}
                />
                <div className="bg-white rounded-xl shadow p-5">
                    <h2 className="text-xl font-bold mb-4">Room Allocation Status</h2>
                    <ResponsiveSortableTable
                        columns={allocationColumns}
                        rows={roomItems}
                        rowKey={(item) => `${item.type}-${item.id}`}
                        searchPlaceholder="Search allocation status..."
                        pageSize={5}
                        maxHeight="20rem"
                    />
                </div>
            </div>
        </AdminLayout>
    );
};

export default RoomDesigner;
