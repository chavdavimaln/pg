import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import {
    getAdminUsers,
    sanitizeAdminForSession,
    setCurrentAdmin,
} from "../../Utils/adminAuth";

const AdminLogin = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ username: "", password: "" });

    const login = () => {
        const username = formData.username.trim();
        const password = formData.password;

        if (!username || !password) {
            alert("Please enter username and password");
            return;
        }

        const admin = getAdminUsers().find(
            (item) =>
                item.active !== false &&
                item.username.toLowerCase() === username.toLowerCase() &&
                item.password === password,
        );

        if (!admin) {
            alert("Invalid admin login details");
            return;
        }

        setCurrentAdmin(sanitizeAdminForSession(admin));
        navigate(location.state?.from || "/", { replace: true });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
            <div className="w-full max-w-md rounded-lg bg-white p-6 text-left shadow">
                <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
                <p className="mt-2 text-sm text-gray-600">Default super-admin: superadmin / admin123</p>

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="mb-2 block font-medium" htmlFor="admin-username">
                            Username
                        </label>
                        <input
                            id="admin-username"
                            type="text"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                            className="w-full rounded-lg border p-3"
                            autoComplete="username"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block font-medium" htmlFor="admin-password">
                            Password
                        </label>
                        <input
                            id="admin-password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full rounded-lg border p-3"
                            autoComplete="current-password"
                            onKeyDown={(event) => {
                                if (event.key === "Enter") login();
                            }}
                        />
                    </div>
                </div>

                <button
                    type="button"
                    onClick={login}
                    className="mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 font-medium text-white"
                >
                    <LogIn className="h-5 w-5" />
                    Login
                </button>
            </div>
        </div>
    );
};

export default AdminLogin;
