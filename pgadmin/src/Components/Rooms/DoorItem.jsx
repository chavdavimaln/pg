import React, { useRef } from "react";
import Draggable from "react-draggable";

const DoorItem = ({
    item,
    onDrag,
    selected,
    onSelect,
}) => {
    const nodeRef = useRef(null);

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            grid={[40, 40]}
            position={{
                x: item.x,
                y: item.y,
            }}
            onStop={(e, data) =>
                onDrag(item.id, data.x, data.y)
            }
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                className={`absolute bg-gray-800 text-white text-[11px]
                rounded flex items-center justify-center cursor-move
                ${selected
                        ? "border-2 border-red-500"
                        : "border border-black"
                    }`}
                style={{
                    width: 80,
                    height: 40,
                    transform: `rotate(${item.rotation || 0}deg)`
                }}
            >
                Door
            </div>
        </Draggable>
    );
};

export default DoorItem;