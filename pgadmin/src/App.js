import {
    Routes,
    Route,
    // Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import Profile from "./Pages/Profile/Profile";

import RoomList from "./Pages/Rooms/RoomList";
import RoomDesigner from "./Pages/Rooms/RoomDesigner";
import RoomAdd from "./Pages/Rooms/RoomAdd";

import OccupiedRooms from "./Pages/Rooms/OccupiedRooms";
import VacantRooms from "./Pages/Rooms/VacantRooms";

import OccupiedBeds from "./Pages/Rooms/OccupiedBeds";
import VacantBeds from "./Pages/Rooms/VacantBeds";

import TableAllotment from "./Pages/Rooms/TableAllotment";
import CupboardAllotment from "./Pages/Rooms/CupboardAllotment";

import StudentAllocation from "./Pages/Rooms/StudentAllocation";
import StudentProfiles from "./Pages/Students/StudentProfiles";

import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                {/* <Route
                    path="/admin/profile"
                    element={<Profile />}
                /> */}
                <Route path="/rooms" element={<RoomList />} />
                <Route path="/rooms/add" element={<RoomAdd />} />
                <Route path="/rooms/designer/:id" element={<RoomDesigner />} />
                <Route path="/rooms/occupied" element={<OccupiedRooms />} />
                <Route path="/rooms/vacant" element={<VacantRooms />} />
                <Route path="/beds/occupied" element={<OccupiedBeds />} />
                <Route path="/beds/vacant" element={<VacantBeds />} />
                <Route path="/tables/allotment" element={<TableAllotment />} />
                <Route path="/cupboards/allotment" element={<CupboardAllotment />} />
                <Route path="/student-allocation" element={<StudentAllocation />} />
                <Route path="/students" element={<StudentProfiles />} />
            </Routes>
        </div>
    );
}

export default App;
