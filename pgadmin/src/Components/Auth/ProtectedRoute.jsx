import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentAdmin, getRoutePrivilege, hasPrivilege } from "../../Utils/adminAuth";

const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    const admin = getCurrentAdmin();

    if (!admin) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    const privilege = getRoutePrivilege(location.pathname);
    if (!hasPrivilege(admin, privilege)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
