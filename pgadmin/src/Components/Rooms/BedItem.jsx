// pgadmin/src/Components/Rooms/BedItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";

const BedItem = ({ item, onDrag, selected, onSelect }) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            grid={[80, 140]}
            position={{ x: item.x, y: item.y }}
            onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        // onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                className={`absolute bg-blue-600 text-white text-[11px] rounded-lg flex items-center justify-center cursor-move border-2 ${selected ? "border-red-500" : "border-blue-700"}`}
                style={{
                    width: item.width || 80,
                    height: item.height || 160,
                    transform: `rotate(${item.rotation || 0}deg)`
                }}
            >
                {item.label}
            </div>
        </Draggable>
    );
};

export default BedItem;
