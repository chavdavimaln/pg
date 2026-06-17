import { useState } from "react";
import React, { useReact } from React;
import AdminLayout from "../../Components/Layout/AdminLayout";
import RoomCanvas from "../../Components/Rooms/RoomCanvas";

const RoomAdd = () => {
    const [roomData, setRoomData] = useState({
        roomNumber: "",
        roomName: "",
        roomType: "",
        bedCount: 1,
        canvasWidth: 600,
        canvasHeight: 400,
    });
    const [beds, setBeds] = useState([]);
    const [tables, setTables] = useState([]);
    const [cupboards, setCupboards] = useState([]);

    const generateLayout = () => {
        const totalBeds = Number(roomData.bedCount);
        const generateBeds = [];
        const generateTabled = [];
        const generateCupboards = [];

        let x = 20;
        let y = 20;

        for (let i = 0; i < totalBeds; i++) {
            generateBeds.push({ id: `bed-${i + 1}`, label: `Bed-${i + 1}`, x, y });
            generateTables.push({ id: `table-${i + 1}`, label: `Table-${i + 1}`, x: x + 90, y });
            generateCupboards.push({ id: `cupboadr-${i + 1}`, label: `Cupboard-${i + 1}`, x: x + 150, y });
            y += 170;
            if (y > 250) { y = 20; x += 250; }
        }
        setBeds(generateBeds);
        setTables(generateTables);
        setCupboards(generateCupboards);
    };

    const saveRoom = () => {
        if (!roomData.roomNumber || !roomData.roomName || !roomData.roomType) {
            alert("please fill all fields");
            return;
        }
        const room = { id: Date.now(), ...roomData, beds, tables, cupboards };
        const existingRoom = JSON.parse(localStorage.getItem("rooms")) || [];
        existingRoom.push(room);

        localStorage.setItem("rooms", JSON.stringify(existingRoom));
        alert("Room added Successfully.");
        setRoomData({ roomNumber: "", roomName: "", roomType: "", bedCount: 1, canvasWidth: 600, canvasHeight: 400 });
        setBeds([]);
        setTables([]);
        setCupboards([]);
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                <h1 className="text-3xl font-bold">Add New Room</h1>
                <div className="bg-white p-6 rounded-xl shadow">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div>
                            <label className="block mb-2">Room Number</label>
                            <input type="text" placeholder="Room Number" value={roomData.roomNumber} onChange={(e) => setRoomData({ ...roomData, roomNumber: e.target.value })} className="border p-3 rounded-lg" />
                        </div>
                        <div>
                            <label className="block mb-2">Room Name</label>
                            <input type="text" placeholder="Room Name" value={roomData.roomName} onChange={(e) => setRoomData({ ...roomData, roomName: e.target.value })} className="border p-3 rounded-lg" />
                        </div>
                        <div>
                            <label className="block mb-2">Room Type</label>
                            <select value={roomData.roomType} onChange={(e) => setRoomData({ ...roomData, roomType: e.target.value })} className="border p-3 rounded-lg" >
                                <option value="">
                                    Select Room Type
                                </option>

                                <option value="Single Room">
                                    Single Room
                                </option>

                                <option value="Twin Room">
                                    Twin Room
                                </option>

                                <option value="Triple Room">
                                    Triple Room
                                </option>

                                <option value="Quad Room">
                                    Quad Room
                                </option>

                                <option value="Common Room">
                                    Common Room
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Beds</label>
                            <select value={roomData.bedCount} onChange={(e) => setRoomData({ ...roomData, bedCount: Number(e.target.value) })} className="border p-3 rounded-lg" >
                                <option value="1">
                                    1 Bed
                                </option>

                                <option value="2">
                                    2 Beds
                                </option>

                                <option value="3">
                                    3 Beds
                                </option>

                                <option value="4">
                                    4 Beds
                                </option>

                                <option value="5">
                                    5 Beds
                                </option>

                                <option value="6">
                                    6 Beds
                                </option>
                            </select>
                        </div>
                        <div>
                            <label className="block mb-2">Canvas Width</label>
                            <input type="number" min="400" value={roomData.canvasWidth} onChange={(e) => setRoomData({ ...roomData, canvasWidth: Number(e.target.value) })} placeholder="Canvas Width" className="border p-3 rounded-lg" />
                        </div>
                        <div>
                            <label className="block mb-2">Canvas height</label>
                            <input type="number" min="400" value={roomData.canvasHeight} onChange={(e) => setRoomData({ ...roomData, canvasHeight: Number(e.target.value) })} placeholder="Canvas Height" className="border p-3 rounded-lg" />
                        </div>
                        <div className="mt-5 flex gap-3">
                            <button onClick={generateLayout} className="bg-blue-600 text-white px-5 py-3 rounded-lg" >Generate Layout</button>
                            <button onClick={saveRoom} className="bg-green-600 text-white px-5 py-3 rounded-lg" >Save Room</button>
                        </div>
                    </div>
                </div>
                {beds.length > 0 && (

                    <div className="bg-white p-6 rounded-xl shadow">

                        <h2 className="font-bold text-xl mb-5">
                            Room Preview
                        </h2>

                        <div className="flex justify-center">

                            <div
                                className="relative bg-white border-4 border-gray-400 rounded-xl overflow-hidden shadow-lg w-full max-w-4xl"
                                style={{
                                    minHeight:
                                        roomData.canvasHeight,
                                    height:
                                        roomData.canvasHeight
                                }}
                            >

                                <RoomCanvas
                                    beds={beds}
                                    tables={tables}
                                    cupboards={cupboards}
                                    selectedItem={null}
                                    setSelectedItem={() => { }}
                                    updateBedPosition={() => { }}
                                    updateTablePosition={() => { }}
                                    updateCupboardPosition={() => { }}
                                />

                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    )
}
export default RoomAdd;