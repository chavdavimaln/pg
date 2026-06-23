import React, { useRef } from "react";
import Draggable from "react-draggable";
import { DoorOpen } from "lucide-react";
import { GRID_SIZE } from "../../Utils/gridConfig";

const DoorItem = ({ item, onDrag, selected, onSelect, scale = 1 }) => {
    const nodeRef = useRef(null);
    const doorWidth = item.width || GRID_SIZE - 5;
    const doorHeight = item.height || GRID_SIZE - 5;

    return (
        <Draggable
            nodeRef={nodeRef}
            bounds="parent"
            grid={[GRID_SIZE, GRID_SIZE]}
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
            <div
                ref={nodeRef}
                onClick={onSelect}
                title="Door"
                className={`absolute flex cursor-move flex-col items-center justify-center rounded-lg bg-slate-800 text-[11px] text-white shadow
                ${selected ? "border-2 border-red-500" : "border-2 border-slate-950"}`}
                style={{
                    // Doors always occupy one grid cell so old saved layouts still render at the current grid size.
                    width: doorWidth,
                    height: doorHeight,
                    transform: `rotate(${item.rotation || 0}deg)`,
                }}
            >
                <DoorOpen className="h-5 w-5" />
                <span>{item.label || "Door"}</span>
            </div>
        </Draggable>
    );
};

export default DoorItem;
