import { Routes, Route } from "react-router-dom";

import RoomList from "../pages/rooms/RoomList";
import RoomDesigner from "../pages/rooms/RoomDesigner";

const RoomRoutes = () => {
    return (
        <Routes>

            <Route
                path="/rooms"
                element={<RoomList />}
            />

            <Route
                path="/rooms/designer/:id"
                element={<RoomDesigner />}
            />

        </Routes>
    );
};

export default RoomRoutes;