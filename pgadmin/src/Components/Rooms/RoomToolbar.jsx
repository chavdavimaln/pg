// pgadmin/src/Components/Rooms/RoomToolbar.jsx

import React from "react";

const RoomToolbar = ({
    addBed,
    removeBed,
    addTable,
    removeTable,
    addCupboard,
    removeCupboard,
    deleteSelectedItem,
    bedCount,
    tableCount,
    cupboardCount,
}) => {
    return (
        <div className="bg-white rounded-xl shadow p-4">
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={addBed}
                    disabled={bedCount >= 6}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Add Bed
                </button>

                <button
                    onClick={removeBed}
                    disabled={bedCount <= 1}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Remove Last Bed
                </button>

                <button
                    onClick={addTable}
                    disabled={tableCount >= 6}
                    className={`px-4 py-2 text-white rounded-lg ${
                        tableCount >= 6 ? "bg-gray-400 cursor-not-allowed" : "bg-amber-600 hover:bg-amber-700"
                    }`}
                >
                    Add Table
                </button>

                <button
                    onClick={removeTable}
                    disabled={tableCount <= 0}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Remove Last Table
                </button>

                <button
                    onClick={addCupboard}
                    disabled={cupboardCount >= 6}
                    className={`px-4 py-2 text-white rounded-lg ${
                        cupboardCount >= 6 ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
                    }`}
                >
                    Add Cupboard
                </button>

                <button
                    onClick={removeCupboard}
                    disabled={cupboardCount <= 0}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                    Remove Last Cupboard
                </button>

                <button
                    onClick={deleteSelectedItem}
                    className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800"
                >
                    Delete Selected Item
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-sm md:text-base font-semibold">
                <span className="text-blue-600">Beds : {bedCount}/6</span>

                <span className="text-amber-600">Tables : {tableCount}/6</span>

                <span className="text-green-700">Cupboards : {cupboardCount}/6</span>
            </div>
        </div>
    );
};

export default RoomToolbar;
