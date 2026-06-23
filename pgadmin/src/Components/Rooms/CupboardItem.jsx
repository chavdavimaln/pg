// pgadmin/src/Components/Rooms/CupboardItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { isOccupied } from "../../Utils/allocationHelper";
const CupboardItem = ({ item, onDrag, selected, onSelect, roomId, scale = 1 }) => {
    const nodeRef = useRef(null);
    const occupied = isOccupied("cupboard", item.id, roomId);
    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            position={{ x: item.x, y: item.y }}
            grid={[40, 40]}
            scale={scale}
            onStop={(e, data) => {
                if (data.x !== item.x || data.y !== item.y) {
                    onDrag(item.id, data.x, data.y);
                }
            }}
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                title={occupied ? `${item.label} allocated` : `${item.label} vacant`}
                className={`absolute text-white text-[11px] rounded-lg flex items-center justify-center cursor-move 
                    ${
                        occupied ? "bg-red-700 border-2 border-red-950" : "bg-green-700 border-2 border-green-900"
                    }${selected ? "ring-4 ring-red-500" : ""}`}
                style={{
                    width: item.width,
                    height: item.height,
                    transform: `rotate(${item.rotation || 0}deg)`,
                }}
            >
                {item.label}
            </div>
        </Draggable>
    );
};

export default CupboardItem;
