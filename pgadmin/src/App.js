import {
    Routes,
    Route,
    // Navigate,
} from "react-router-dom";
import AdminLayout from "./Components/Layout/AdminLayout";
import Dashboard from "./Pages/Dashboard/Dashboard";

import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<AdminLayout />}>
                    <Route index element={<Dashboard />} />
                </Route>
                test
            </Routes>
        </div>
    );
}

export default App;
