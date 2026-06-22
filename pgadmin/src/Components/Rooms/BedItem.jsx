// pgadmin/src/Components/Rooms/BedItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { isOccupied } from "../../Utils/allocationHelper";
const BedItem = ({ item, onDrag, selected, onSelect }) => {
    const nodeRef = useRef(null);
    const occupied = isOccupied("bed", item.id);
    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            grid={[40, 40]}
            position={{ x: item.x, y: item.y }}
            onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        // onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                className={`absolute text-white text-[11px] rounded-lg flex items-center justify-center cursor-move border-2 
                    ${occupied
                        ? "bg-red-600 border-red-800"
                        : "bg-blue-600 border-blue-800"
                    }${selected
                        ? "ring-4 ring-yellow-400"
                        : ""
                    }`}
                style={{
                    width: item.width,
                    height: item.height,
                    transform: `rotate(${item.rotation || 0}deg)`
                }}
            >
                {item.label}
            </div>
        </Draggable>
    );
};

export default BedItem;
