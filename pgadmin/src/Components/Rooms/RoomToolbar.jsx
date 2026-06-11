import React  from 'react';

const RoomToolbar = ({ addBed, removeBed, bedCount }) => {
    return (
        <div className="flex items-center space-x-4 mb-4 gap-4">
            <button onClick={addBed} disabled={bedCount >= 5} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Add Bed
            </button>
            <button onClick={removeBed} disabled={bedCount <= 2} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                Remove Bed
            </button>
            <div className="text-lg font-bold py-2 px-4 rounded">
                Beds: {bedCount}
            </div>
        </div>
    );
}

export default RoomToolbar;