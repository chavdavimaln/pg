// pgadmin/src/Components/Rooms/RoomCanvas.jsx

import React from "react";
import BedItem from "./BedItem";
import TableItem from "./TableItem";
import CupboardItem from "./CupboardItem";

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
}) => {
    return (
        <div className="w-full overflow-auto">
            <div className="flex justify-center">
                <div
                    className="relative border-4 border-gray-300 rounded-xl shadow-lg"
                    style={{
                        width: canvasWidth,
                        height: canvasHeight,

                        backgroundImage: `
                        linear-gradient(#dbe3ee 1px, transparent 1px),
                        linear-gradient(90deg, #dbe3ee 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",

                        minWidth: 400,
                        minHeight: 300,
                    }}
                >
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
                </div>
            </div>
        </div>
    );
};

export default RoomCanvas;
