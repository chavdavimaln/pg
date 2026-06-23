// pgadmin/src/Utils/roomLayoutEngine.js

export const DEFAULT_SIZES = {
    bed: {
        width: 80,
        height: 160,
    },
    table: {
        width: 80,
        height: 80,
    },
    cupboard: {
        width: 120,
        height: 80,
    },
};

const GAP = 15;

export const calculateResponsiveLayout = (bedCount, canvasWidth, canvasHeight) => {
    const minWidth = 400;
    const minHeight = 300;

    let width = Math.max(minWidth, Number(canvasWidth));
    let height = Math.max(minHeight, Number(canvasHeight));
    let cols = width >= 1200 ? 3 : width >= 800 ? 2 : 1;
    let rows = Math.ceil(bedCount / cols);
    const sectionWidth = (width - (cols + 1) * GAP) / cols;
    const scale = Math.min(1, sectionWidth / 220);
    const bedHeight = DEFAULT_SIZES.bed.height * scale;
    const requiredHeight = rows * (bedHeight + 60) + GAP * (rows + 1);

    if (requiredHeight > height) {
        height = requiredHeight + 30;
    }

    const beds = [];
    const tables = [];
    const cupboards = [];
    const doors = [];
    for (let i = 0; i < bedCount; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const startX = GAP + col * (sectionWidth + GAP);
        const startY = GAP + row * (bedHeight + 60);

        // beds.push({
        //     id: `bed-${i + 1}`,
        //     label: `Bed-${i + 1}`,
        //     x: startX,
        //     y: startY,
        //     width: bedWidth,
        //     height: bedHeight,
        // });

        // tables.push({
        //     id: `table-${i + 1}`,
        //     label: `Table-${i + 1}`,
        //     x: startX + bedWidth + 10,
        //     y: startY,
        //     width: tableWidth,
        //     height: tableHeight,
        // });

        // cupboards.push({
        //     id: `cupboard-${i + 1}`,
        //     label: `Cupboard-${i + 1}`,
        //     x: startX + bedWidth + tableWidth + 20,
        //     y: startY,
        //     width: cupboardWidth,
        //     height: cupboardHeight,
        // });

        beds.push({
            id: `bed-${i + 1}`,
            label: `Bed-${i + 1}`,
            x: Math.round(startX / 80) * 80,
            y: Math.round(startY / 80) * 80,
            width: 80,
            height: 160,
            rotation: 0,
        });

        tables.push({
            id: `table-${i + 1}`,
            label: `Table-${i + 1}`,
            x: Math.round((startX + 90) / 80) * 80,
            y: Math.round(startY / 80) * 80,
            width: 80,
            height: 80,
            rotation: 0,
        });

        cupboards.push({
            id: `cupboard-${i + 1}`,
            label: `Cupboard-${i + 1}`,
            x: Math.round((startX + 180) / 80) * 80,
            y: Math.round(startY / 80) * 80,
            width: 120,
            height: 80,
            rotation: 0,
        });

        doors.push({
            id: `door-${i + 1}`,
            label: `Door-${i + 1}`,
            x: Math.round((startX + 320) / 80) * 80,
            y: Math.round(startY / 80) * 80,
            width: 40,
            height: 40,
            rotation: 0,
        });
    }

    return {
        beds,
        tables,
        cupboards,
        doors,
        canvasWidth: width,
        canvasHeight: height,
    };
};
