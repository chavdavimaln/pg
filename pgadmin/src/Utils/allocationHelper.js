export const isOccupied = (
    type,
    itemId
) => {

    const allocations =
        JSON.parse(
            localStorage.getItem(
                "allocations"
            )
        ) || [];

    return allocations.some((a) => {

        if (type === "bed")
            return a.bedId === itemId;

        if (type === "table")
            return a.tableId === itemId;

        if (type === "cupboard")
            return a.cupboardId === itemId;

        return false;
    });
};