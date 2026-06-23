// pgadmin/src/Routes/RoomRoutes.jsx

import { Routes, Route } from "react-router-dom";

import RoomList from "../pages/rooms/RoomList";
import RoomDesigner from "../pages/rooms/RoomDesigner";
import StudentAllocation from "./Pages/Rooms/StudentAllocation";
const RoomRoutes = () => {
    return (
        <Routes>
            <Route path="/rooms" element={<RoomList />} />
            <Route path="/rooms/designer/:id" element={<RoomDesigner />} />
            <Route path="/student-allocation" element={<StudentAllocation />} />
        </Routes>
    );
};

export default RoomRoutes;
