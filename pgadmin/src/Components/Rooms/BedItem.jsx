// pgadmin/src/Components/Rooms/BedItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";

const BedItem = ({ item, onDrag, selected, onSelect }) => {

    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={{ x: item.x, y: item.y }} onStop={(e, data) => onDrag(item.id, data.x, data.y)}>
            <div ref={nodeRef} onClick={onSelect} className={`absolute w-[50px] sm:w-[60px] md:w-[70px] h-[140px] bg-blue-600 text-white text-[11px] rounded-lg flex items-center justify-center cursor-move border-2 ${selected ? "border-red-500" : "border-blue-700"}`}>
                {item.label}
            </div>
        </Draggable>
    );
};

export default BedItem;