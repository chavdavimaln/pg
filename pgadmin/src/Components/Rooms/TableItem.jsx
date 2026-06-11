import React, { useRef } from "react";
import Draggable from "react-draggable";

const TableItem = ({ item, onDrag }) => {

    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={{ x: item.x, y: item.y }} onStop={(e, data) => onDrag(item.id, data.x, data.y)}>
            <div ref={nodeRef} className="absolute w-12 h-18 bg-amber-600 text-white rounded-lg flex items-center justify-center cursor-move">
                Table
            </div>
        </Draggable>
    );
};

export default TableItem;