import React from 'react';
import { Draggable } from 'react-draggable';
import { BedDouble } from "lucide-react";

const BedItem = ({ bed, updatePosition }) => {
    return (
        <Draggable
            position={{ x: bed.x, y: bed.y }}
            bounds="parent"
            onStop={(e, data) => updatePosition(bed.id, data.x, data.y)}
        >
            <div className="absolute cursor-move">
                <div className="w-24 h-14 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg">
                    <BedDouble size={24} />
                </div>
                <div className="text-center text-xs mt-1">Bed {bed.id}</div>
            </div>
        </Draggable>
    );
};

export default BedItem;