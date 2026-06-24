import {
    Routes,
    Route,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminProfile from "./Pages/Admin/AdminProfile";
import AdminUsers from "./Pages/Admin/AdminUsers";

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
    const protect = (component) => <ProtectedRoute>{component}</ProtectedRoute>;

    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/" element={protect(<Dashboard />)} />
                <Route path="/admin/profile" element={protect(<AdminProfile />)} />
                <Route path="/admin/users" element={protect(<AdminUsers />)} />
                <Route path="/admin/passwords" element={protect(<AdminUsers />)} />
                <Route path="/rooms" element={protect(<RoomList />)} />
                <Route path="/rooms/add" element={protect(<RoomAdd />)} />
                <Route path="/rooms/designer/:id" element={protect(<RoomDesigner />)} />
                <Route path="/rooms/occupied" element={protect(<OccupiedRooms />)} />
                <Route path="/rooms/vacant" element={protect(<VacantRooms />)} />
                <Route path="/beds/occupied" element={protect(<OccupiedBeds />)} />
                <Route path="/beds/vacant" element={protect(<VacantBeds />)} />
                <Route path="/tables/allotment" element={protect(<TableAllotment />)} />
                <Route path="/cupboards/allotment" element={protect(<CupboardAllotment />)} />
                <Route path="/student-allocation" element={protect(<StudentAllocation />)} />
                <Route path="/students" element={protect(<StudentProfiles />)} />
            </Routes>
        </div>
    );
}

export default App;
