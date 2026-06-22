// pgadmin/src/Components/Rooms/TableItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { isOccupied } from "../../Utils/allocationHelper";
const TableItem = ({ item, onDrag, selected, onSelect }) => {
    const nodeRef = useRef(null);
    const occupied =
        isOccupied("table", item.id);
    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            position={{ x: item.x, y: item.y }}
            grid={[40, 40]}
            onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                className={`absolute text-white text-[11px] rounded-lg flex items-center justify-center cursor-move 
                    ${occupied ? "bg-orange-600 border-2 border-orange-800"
                        : "bg-amber-600 border-2 border-amber-800"
                    }${selected ? "ring-4 ring-yellow-400" : ""}`}
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

export default TableItem;
