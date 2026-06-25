import React, { useRef } from "react";
import Draggable from "react-draggable";
import { DoorOpen } from "lucide-react";
import doorHalfOpen from "../../Assets/rooms/door-half-open-cropped.png";

const DoorItem = ({ item, onDrag, selected, onSelect, scale = 1 }) => {
    const nodeRef = useRef(null);
    const doorWidth = item.width || 74;
    const doorHeight = item.height || 50;
    const rotation = item.rotation || 0;
    const isSideways = Math.abs(rotation) % 180 === 90;
    const visualWidth = isSideways ? doorHeight : doorWidth;
    const visualHeight = isSideways ? doorWidth : doorHeight;

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            grid={[1, 1]}
            scale={scale}
            position={{
                x: item.x,
                y: item.y,
            }}
            onStop={(e, data) => {
                if (data.x !== item.x || data.y !== item.y) {
                    onDrag(item.id, data.x, data.y);
                }
            }}
        >
            <button
                type="button"
                ref={nodeRef}
                onClick={onSelect}
                title="Door"
                className={`absolute cursor-move overflow-visible rounded-none border-0 p-0 text-[#4a2b0f] ${
                    selected ? "z-20" : ""
                }`}
                style={{
                    width: doorWidth,
                    height: doorHeight,
                }}
            >
                <div
                    className="absolute left-1/2 top-1/2 overflow-hidden rounded-none bg-[#d5a66a]"
                    style={{
                        width: visualWidth,
                        height: visualHeight,
                        transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
                        boxShadow: selected ? "inset 0 0 0 3px #facc15" : "inset 0 -4px 0 #6f451c",
                    }}
                >
                    <img
                        src={doorHalfOpen}
                        alt=""
                        className="absolute inset-0 h-full w-full object-fill opacity-80"
                        draggable="false"
                    />
                    <span className="absolute inset-0 z-10 flex items-center justify-center gap-1 text-[9px] font-bold leading-none">
                        <DoorOpen className="h-3 w-3" />
                        Door
                    </span>
                </div>
            </button>
        </Draggable>
    );
};

export default DoorItem;
