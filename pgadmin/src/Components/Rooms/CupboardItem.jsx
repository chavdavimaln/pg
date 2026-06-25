// pgadmin/src/Components/Rooms/CupboardItem.jsx
import React, { useRef } from "react";
import Draggable from "react-draggable";
import { isOccupied } from "../../Utils/allocationHelper";
import cupboardReal from "../../Assets/rooms/cupboard-real.png";
const CupboardItem = ({ item, onDrag, selected, onSelect, roomId, scale = 1 }) => {
    const nodeRef = useRef(null);
    const occupied = isOccupied("cupboard", item.id, roomId);
    const rotation = item.rotation || 0;
    const isSideways = Math.abs(rotation) % 180 === 90;
    const visualWidth = isSideways ? item.height : item.width;
    const visualHeight = isSideways ? item.width : item.height;

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            position={{ x: item.x, y: item.y }}
            grid={[1, 1]}
            scale={scale}
            onStop={(e, data) => {
                if (data.x !== item.x || data.y !== item.y) {
                    onDrag(item.id, data.x, data.y);
                }
            }}
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
                    className="absolute left-1/2 top-1/2 flex items-center justify-center overflow-hidden rounded bg-green-100"
                    style={{
                        width: visualWidth,
                        height: visualHeight,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        boxShadow: selected ? "inset 0 0 0 4px #facc15" : "none",
                    }}
                >
                    <img
                        src={cupboardReal}
                        alt=""
                        className={`absolute inset-0 h-full w-full object-fill ${occupied ? "opacity-70" : ""}`}
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

export default CupboardItem;
