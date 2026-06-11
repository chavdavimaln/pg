import React from "react";

const RoomToolbar = ({ addBed, removeBed, addTable, removeTable, addCupboard, removeCupboard, bedCount, tableCount, cupboardCount }) => {

    return (
        <div className="bg-white rounded-xl shadow p-4">

            <div className="flex flex-wrap gap-3">
                <button onClick={addBed} disabled={bedCount >= 6} className="px-4 py-2 bg-blue-600 text-white rounded-lg">
                    Add Bed
                </button>
                <button onClick={removeBed} disabled={bedCount <= 1} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                    Remove Bed
                </button>
                <button onClick={addTable} className="px-4 py-2 bg-amber-600 text-white rounded-lg">
                    Add Table
                </button>
                <button onClick={removeTable} disabled={tableCount <= 0} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                    Remove Table
                </button>
                <button onClick={addCupboard} className="px-4 py-2 bg-green-700 text-white rounded-lg">
                    Add Cupboard
                </button>
                <button onClick={removeCupboard} disabled={cupboardCount <= 0} className="px-4 py-2 bg-red-600 text-white rounded-lg">
                    Remove Cupboard
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-5 font-semibold">
                <span>Beds : {bedCount}</span>
                <span>Tables : {tableCount}</span>
                <span>Cupboards : {cupboardCount}</span>
            </div>
        </div>
    );
};

export default RoomToolbar;