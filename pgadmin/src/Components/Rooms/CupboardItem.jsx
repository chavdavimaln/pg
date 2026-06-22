// pgadmin/src/Components/Rooms/CupboardItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";

const CupboardItem = ({ item, onDrag, selected, onSelect }) => {

    const nodeRef = useRef(null);

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
                className={`absolute bg-green-700 text-white text-[11px] rounded-lg flex items-center justify-center cursor-move ${selected ? "border-2 border-red-500" : "border-green-800"}`}
                style={{
                    width: item.width || 120,
                    height: item.height || 80,
                    transform: `rotate(${item.rotation || 0}deg)`
                }}
            >
                {item.label}
            </div>
        </Draggable>
    );
};

export default CupboardItem;