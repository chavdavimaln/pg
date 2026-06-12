// pgadmin/src/Components/Rooms/RoomCanvas.jsxq
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
    updateCupboardPosition
}) => {
    return (
        <div className="flex justify-center">
            <div className="relative w-full max-w-4xl aspect-[4/3] bg-white border-4 border-gray-400 rounded-xl overflow-hidden shadow-lg">
                {beds.map(item => (
                    <BedItem key={item.id} item={item} selected={selectedItem?.id === item.id} onSelect={() =>setSelectedItem({ ...item, type: "bed"})} onDrag={updateBedPosition} />
                ))}
                {tables.map(item => (
                    <TableItem key={item.id} item={item} selected={selectedItem?.id === item.id} onSelect={() =>setSelectedItem({ ...item, type: "table"})} onDrag={updateTablePosition} />
                ))}
                {cupboards.map(item => (
                    <CupboardItem key={item.id} item={item} selected={selectedItem?.id === item.id} onSelect={() =>setSelectedItem({ ...item, type: "cupboard"})} onDrag={updateCupboardPosition} />
                ))}
            </div>
        </div>
    );
};

export default RoomCanvas;