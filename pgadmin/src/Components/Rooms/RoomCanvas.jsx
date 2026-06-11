import React from 'react';
import BedItem from './BedItem';

const RoomCanvas = ({ beds, updateBedPosition }) => {
    return (
        <div className="relative w-full h-[600px] border-4 border-gray-400 bg-gray-50 rounded-lg overflow-hidden">
            {beds.map((bed) => (
                <BedItem key={bed.id} bed={bed} updatePosition={updateBedPosition} />
            ))}
        </div>
    );
}

export default RoomCanvas;