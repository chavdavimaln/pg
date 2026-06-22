// pgadmin/src/Components/Rooms/CupboardItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { isOccupied }
    from "../../Utils/allocationHelper";
const CupboardItem = ({ item, onDrag, selected, onSelect }) => {

    const nodeRef = useRef(null);
    const occupied =
        isOccupied(
            "cupboard",
            item.id
        );
    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            position={{ x: item.x, y: item.y }}
            grid={[40, 40]}
            onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        >
            <div
                ref={nodeRef} onClick={onSelect}
                className={`absolute text-white text-[11px]rounded-lg flex items-center justify-centercursor-move 
                    ${occupied ? "bg-yellow-500 border-2 border-yellow-700"
                        : "bg-green-700 border-2 border-green-900"
                    }${selected
                        ? "ring-4 ring-red-500"
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

export default CupboardItem;