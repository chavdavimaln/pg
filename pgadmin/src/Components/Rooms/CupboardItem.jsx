import React, { useRef } from "react";
import Draggable from "react-draggable";

const CupboardItem = ({ item, onDrag }) => {

    const nodeRef = useRef(null);

    return (
        <Draggable nodeRef={nodeRef} bounds="parent" defaultPosition={{ x: item.x, y: item.y }} onStop={(e, data) => onDrag(item.id, data.x, data.y)}>
            <div ref={nodeRef} className="absolute w-20 h-36 bg-green-700 text-white rounded-lg flex items-center justify-center cursor-move">
                Cupboard
            </div>
        </Draggable>
    );
};

export default CupboardItem;