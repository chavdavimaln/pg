// pgadmin/src/Components/Rooms/BedItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";

const BedItem = ({ item, onDrag }) => {

    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={{ x: item.x, y: item.y }} onStop={(e, data) => onDrag(item.id, data.x, data.y)}>
            <div ref={nodeRef} className="absolute w-13 h-16 bg-blue-600 text-white rounded-lg flex items-center justify-center cursor-move">
                {item.label}
            </div>
        </Draggable>
    );
};

export default BedItem;