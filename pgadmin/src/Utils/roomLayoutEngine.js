// pgadmin/src/Utils/roomLayoutEngine.js

import { GRID_SIZE } from "./gridConfig";

export const ITEM_SHRINK = 5;
export const CANVAS_PADDING = GRID_SIZE;

export const DEFAULT_SIZES = {
    bed: {
        width: GRID_SIZE - ITEM_SHRINK,
        height: GRID_SIZE * 2 - ITEM_SHRINK,
    },
    table: {
        width: GRID_SIZE - ITEM_SHRINK,
        height: GRID_SIZE - ITEM_SHRINK,
    },
    cupboard: {
        width: 120 - ITEM_SHRINK,
        height: GRID_SIZE - ITEM_SHRINK,
    },
    door: {
        width: GRID_SIZE - ITEM_SHRINK,
        height: GRID_SIZE - ITEM_SHRINK,
    },
};

const getRoomGrid = (bedCount) => {
    if (bedCount <= 2) return { cols: 1, rows: bedCount };
    if (bedCount <= 4) return { cols: 2, rows: Math.ceil(bedCount / 2) };
    return { cols: 3, rows: Math.ceil(bedCount / 3) };
};

export const normalizeRoomItems = (items = [], type) =>
    items.map((item) => ({
        ...item,
        width: DEFAULT_SIZES[type]?.width || item.width,
        height: DEFAULT_SIZES[type]?.height || item.height,
    }));

export const calculateResponsiveLayout = (bedCount, canvasWidth, canvasHeight) => {
    const count = Math.min(6, Math.max(1, Number(bedCount)));
    const { cols, rows } = getRoomGrid(count);
    const bayWidth = GRID_SIZE * 4;
    const bayHeight = GRID_SIZE * 3;

    // The generated canvas grows from the item grid, so all 19 possible room items fit with breathing room.
    const width = Math.max(Number(canvasWidth) || 0, CANVAS_PADDING * 2 + cols * bayWidth);
    const height = Math.max(Number(canvasHeight) || 0, CANVAS_PADDING * 2 + rows * bayHeight + GRID_SIZE);

    const beds = [];
    const tables = [];
    const cupboards = [];

    for (let i = 0; i < count; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const startX = CANVAS_PADDING + col * bayWidth;
        const startY = CANVAS_PADDING + row * bayHeight;

        beds.push({
            id: `bed-${i + 1}`,
            label: `Bed-${i + 1}`,
            x: startX,
            y: startY,
            ...DEFAULT_SIZES.bed,
            rotation: 0,
        });

        tables.push({
            id: `table-${i + 1}`,
            label: `Table-${i + 1}`,
            x: startX + GRID_SIZE,
            y: startY,
            ...DEFAULT_SIZES.table,
            rotation: 0,
        });

        cupboards.push({
            id: `cupboard-${i + 1}`,
            label: `Cupboard-${i + 1}`,
            x: startX + GRID_SIZE,
            y: startY + GRID_SIZE,
            ...DEFAULT_SIZES.cupboard,
            rotation: 0,
        });
    }

    const doors = [
        {
            id: "door-1",
            label: "Door",
            x: width - CANVAS_PADDING - DEFAULT_SIZES.door.width,
            y: height - CANVAS_PADDING - DEFAULT_SIZES.door.height,
            ...DEFAULT_SIZES.door,
            rotation: 0,
        },
    ];

    return {
        beds,
        tables,
        cupboards,
        doors,
        canvasWidth: width,
        canvasHeight: height,
    };
};
