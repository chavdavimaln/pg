// pgadmin/src/Components/Rooms/TableItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";

const TableItem = ({ item, onDrag, selected, onSelect }) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            defaultPosition={{ x: item.x, y: item.y }}
            onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                className={`absolute bg-amber-600 text-white text-[11px] rounded-lg flex items-center justify-center cursor-move    ${selected ? "border-2 border-red-500" : "border-amber-800"}`}
                style={{ width: item.width || 40, height: item.height || 40 }}
            >
                {item.label}
            </div>
        </Draggable>
    );
};

export default TableItem;
