import {
    Routes,
    Route,
    // Navigate,
} from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import Profile from "./Pages/Profile/Profile";

import RoomList from "./Pages/Rooms/RoomList";
import RoomDesigner from "./Pages/Rooms/RoomDesigner";

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
                <Route
                    path="/rooms"
                    element={<RoomList />}
                />
                <Route
                    path="/rooms/add"
                    element={<RoomList />}
                />

                <Route
                    path="/rooms/designer/:id"
                    element={<RoomDesigner />}
                />
            </Routes>
        </div>
    );
}

export default App;
