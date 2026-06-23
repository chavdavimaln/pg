// pgadmin/src/Components/Rooms/RoomToolbar.jsx

import React from "react";
import { Bed, DoorOpen, Minus, Plus, RotateCw, Square, Trash2, Warehouse } from "lucide-react";

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
    rotateSelectedItem,
    addDoor,
    doorCount,
}) => {
    const iconButtonClass =
        "flex h-10 w-10 items-center justify-center rounded-lg text-white transition disabled:cursor-not-allowed disabled:bg-gray-400";

    return (
        <div className="bg-white rounded-xl shadow p-4">
            <div className="flex flex-wrap gap-3">
                <button
                    type="button"
                    onClick={addBed}
                    disabled={bedCount >= 6}
                    className={`${iconButtonClass} bg-blue-600 hover:bg-blue-700`}
                    title="Add bed"
                    aria-label="Add bed"
                >
                    <Bed className="h-5 w-5" />
                    <Plus className="-ml-1 h-3 w-3" />
                </button>

                <button
                    type="button"
                    onClick={removeBed}
                    disabled={bedCount <= 1}
                    className={`${iconButtonClass} bg-red-500 hover:bg-red-600`}
                    title="Remove last bed"
                    aria-label="Remove last bed"
                >
                    <Bed className="h-5 w-5" />
                    <Minus className="-ml-1 h-3 w-3" />
                </button>

                <button
                    type="button"
                    onClick={addTable}
                    disabled={tableCount >= 6}
                    className={`${iconButtonClass} ${tableCount >= 6 ? "bg-gray-400" : "bg-amber-600 hover:bg-amber-700"}`}
                    title="Add table"
                    aria-label="Add table"
                >
                    <Square className="h-5 w-5" />
                    <Plus className="-ml-1 h-3 w-3" />
                </button>

                <button
                    type="button"
                    onClick={removeTable}
                    disabled={tableCount <= 0}
                    className={`${iconButtonClass} bg-red-500 hover:bg-red-600`}
                    title="Remove last table"
                    aria-label="Remove last table"
                >
                    <Square className="h-5 w-5" />
                    <Minus className="-ml-1 h-3 w-3" />
                </button>

                <button
                    type="button"
                    onClick={addCupboard}
                    disabled={cupboardCount >= 6}
                    className={`${iconButtonClass} ${
                        cupboardCount >= 6 ? "bg-gray-400" : "bg-green-700 hover:bg-green-800"
                    }`}
                    title="Add cupboard"
                    aria-label="Add cupboard"
                >
                    <Warehouse className="h-5 w-5" />
                    <Plus className="-ml-1 h-3 w-3" />
                </button>

                <button
                    type="button"
                    onClick={removeCupboard}
                    disabled={cupboardCount <= 0}
                    className={`${iconButtonClass} bg-red-500 hover:bg-red-600`}
                    title="Remove last cupboard"
                    aria-label="Remove last cupboard"
                >
                    <Warehouse className="h-5 w-5" />
                    <Minus className="-ml-1 h-3 w-3" />
                </button>

                <button
                    type="button"
                    onClick={deleteSelectedItem}
                    className={`${iconButtonClass} bg-red-700 hover:bg-red-800`}
                    title="Delete selected item"
                    aria-label="Delete selected item"
                >
                    <Trash2 className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    onClick={rotateSelectedItem}
                    className={`${iconButtonClass} bg-purple-600 hover:bg-purple-700`}
                    title="Rotate selected item"
                    aria-label="Rotate selected item"
                >
                    <RotateCw className="h-5 w-5" />
                </button>

                <button
                    type="button"
                    onClick={addDoor}
                    disabled={doorCount >= 1}
                    className={`${iconButtonClass} ${doorCount >= 1 ? "bg-gray-400" : "bg-gray-700 hover:bg-gray-800"}`}
                    title="Add door"
                    aria-label="Add door"
                >
                    <DoorOpen className="h-5 w-5" />
                    <Plus className="-ml-1 h-3 w-3" />
                </button>
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-sm md:text-base font-semibold">
                <span className="text-blue-600">Beds : {bedCount}/6</span>
                <span className="text-amber-600">Tables : {tableCount}/6</span>
                <span className="text-green-700">Cupboards : {cupboardCount}/6</span>
                <span className="text-gray-700">Door : {doorCount}/1</span>
            </div>
        </div>
    );
};

export default RoomToolbar;
