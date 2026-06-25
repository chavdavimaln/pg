// pgadmin/src/Components/Rooms/BedItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { isOccupied } from "../../Utils/allocationHelper";
import bedReal from "../../Assets/rooms/bed-real.png";
const BedItem = ({ item, onDrag, selected, onSelect, roomId, scale = 1 }) => {
    const nodeRef = useRef(null);
    const occupied = isOccupied("bed", item.id, roomId);
    const rotation = item.rotation || 0;
    const isSideways = Math.abs(rotation) % 180 === 90;
    const visualWidth = isSideways ? item.height : item.width;
    const visualHeight = isSideways ? item.width : item.height;

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            grid={[1, 1]}
            scale={scale}
            position={{ x: item.x, y: item.y }}
            onStop={(e, data) => {
                if (data.x !== item.x || data.y !== item.y) {
                    onDrag(item.id, data.x, data.y);
                }
            }}
        // onStop={(e, data) => onDrag(item.id, data.x, data.y)}
        >
            <div
                ref={nodeRef}
                onClick={onSelect}
                title={occupied ? `${item.label} allocated` : `${item.label} vacant`}
                className={`absolute cursor-move overflow-visible text-[10px] font-semibold text-indigo-950 ${
                    selected ? "z-20" : ""
                }`}
                style={{
                    width: item.width,
                    height: item.height,
                }}
            >
                <div
                    className="absolute left-1/2 top-1/2 flex items-center justify-center overflow-hidden rounded-md bg-gray-100"
                    style={{
                        width: visualWidth,
                        height: visualHeight,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        boxShadow: selected ? "inset 0 0 0 4px #facc15" : "none",
                    }}
                >
                    <img
                        src={bedReal}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-fill ${
                            occupied ? "opacity-70" : ""
                        }`}
                        draggable="false"
                    />
                </div>
                <span className="absolute bottom-[2px] left-1/2 z-10 max-w-full -translate-x-1/2 truncate bg-white/80 px-1 py-0 text-center leading-none">
                    {item.label}
                </span>
            </div>
        </Draggable>
    );
};

export default BedItem;
