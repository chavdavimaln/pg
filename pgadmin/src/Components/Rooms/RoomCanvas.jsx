// pgadmin/src/Components/Rooms/RoomCanvas.jsx

import React from "react";
import BedItem from "./BedItem";
import TableItem from "./TableItem";
import CupboardItem from "./CupboardItem";
import DoorItem from "./DoorItem";

const RoomCanvas = ({
    beds,
    tables,
    cupboards,
    selectedItem,
    setSelectedItem,
    updateBedPosition,
    updateTablePosition,
    updateCupboardPosition,
    canvasWidth,
    canvasHeight,
    doors,
    updateDoorPosition,
}) => {
    const GRID_SIZE = 80;

    const rows = Math.ceil(canvasHeight / GRID_SIZE);
    const cols = Math.ceil(canvasWidth / GRID_SIZE);
    return (
        <div className="w-full overflow-auto">
            <div className="flex justify-center">
                <div
                    className="relative border-2 border-gray-300 rounded-xl shadow-lg bg-white overflow-hidden"
                    style={{
                        width: canvasWidth,
                        height: canvasHeight,
                        // backgroundImage: `
                        // linear-gradient(#dbe3ee 1px, transparent 1px),
                        // linear-gradient(90deg, #dbe3ee 1px, transparent 1px)
                        // `,
                        // backgroundImage: `
                        //     linear-gradient(to right, #d1d5db 1px, transparent 1px),
                        //     linear-gradient(to bottom, #d1d5db 1px, transparent 1px)
                        // `,
                        // backgroundSize: "80px 80px",
                        minWidth: 400,
                        minHeight: 300,
                    }}
                >
                    {/* Real Grid */}
                    <div className="absolute inset-0 pointer-events-none">
                        {Array.from({ length: rows }).map((_, row) =>
                            Array.from({ length: cols }).map((_, col) => (
                                <div
                                    key={`${row}-${col}`}
                                    className="absolute border border-gray-200"
                                    style={{
                                        width: GRID_SIZE,
                                        height: GRID_SIZE,
                                        left: col * GRID_SIZE,
                                        top: row * GRID_SIZE,
                                    }}
                                />
                            )),
                        )}
                    </div>
                    {beds.map((item) => (
                        <BedItem
                            key={item.id}
                            item={item}
                            selected={selectedItem?.id === item.id}
                            onSelect={() => setSelectedItem({ ...item, type: "bed" })}
                            onDrag={updateBedPosition}
                        />
                    ))}
                    {tables.map((item) => (
                        <TableItem
                            key={item.id}
                            item={item}
                            selected={selectedItem?.id === item.id}
                            onSelect={() => setSelectedItem({ ...item, type: "table" })}
                            onDrag={updateTablePosition}
                        />
                    ))}
                    {cupboards.map((item) => (
                        <CupboardItem
                            key={item.id}
                            item={item}
                            selected={selectedItem?.id === item.id}
                            onSelect={() => setSelectedItem({ ...item, type: "cupboard" })}
                            onDrag={updateCupboardPosition}
                        />
                    ))}
                    {doors?.map((item) => (
                        <DoorItem
                            key={item.id}
                            item={item}
                            selected={selectedItem?.id === item.id}
                            onSelect={() =>
                                setSelectedItem({
                                    ...item,
                                    type: "door",
                                })
                            }
                            onDrag={updateDoorPosition}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RoomCanvas;
