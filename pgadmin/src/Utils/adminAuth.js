const ADMIN_USERS_KEY = "adminUsers";
const CURRENT_ADMIN_KEY = "currentAdmin";

export const adminRoles = {
    SUPER: "super-admin",
    SINGLE: "single-admin",
    SUB: "sub-admin",
};

export const privilegeOptions = [
    { key: "dashboard", label: "Dashboard" },
    { key: "rooms", label: "Rooms" },
    { key: "profiles", label: "Profiles" },
    { key: "allocation", label: "Student Allocation" },
    { key: "allotments", label: "Allotment Reports" },
    { key: "payments", label: "Payment Management" },
    { key: "adminProfile", label: "Admin Profile" },
    { key: "adminUsers", label: "Admin Users" },
];

const defaultSuperAdmin = {
    id: 1,
    name: "Main Administrator",
    username: "superadmin",
    email: "admin@example.com",
    mobile: "",
    role: adminRoles.SUPER,
    password: "admin123",
    privileges: privilegeOptions.map((option) => option.key),
    active: true,
    createdAt: new Date().toLocaleDateString(),
};

const parseStoredArray = (key) => {
    try {
        const value = JSON.parse(localStorage.getItem(key));
        return Array.isArray(value) ? value.filter(Boolean) : [];
    } catch {
        return [];
    }
};

export const saveAdminUsers = (admins) => {
    localStorage.setItem(ADMIN_USERS_KEY, JSON.stringify(admins.filter(Boolean)));
};

export const getAdminUsers = () => {
    const admins = parseStoredArray(ADMIN_USERS_KEY);
    if (admins.length) return admins;

    saveAdminUsers([defaultSuperAdmin]);
    return [defaultSuperAdmin];
};

export const getCurrentAdmin = () => {
    try {
        const admin = JSON.parse(localStorage.getItem(CURRENT_ADMIN_KEY));
        return admin?.id ? admin : null;
    } catch {
        return null;
    }
};

export const setCurrentAdmin = (admin) => {
    localStorage.setItem(CURRENT_ADMIN_KEY, JSON.stringify(admin));
};

export const logoutAdmin = () => {
    localStorage.removeItem(CURRENT_ADMIN_KEY);
};

export const isSuperAdmin = (admin = getCurrentAdmin()) => admin?.role === adminRoles.SUPER;

export const hasPrivilege = (admin, privilege) => {
    if (!admin) return false;
    if (admin.role === adminRoles.SUPER) return true;
    if (privilege === "payments" && admin.role === adminRoles.SINGLE) return true;
    if (privilege === "adminUsers") return false;
    return (admin.privileges || []).includes(privilege);
};

export const getRoutePrivilege = (path = "") => {
    if (path === "/") return "dashboard";
    if (path.startsWith("/rooms") || path.startsWith("/beds")) return "rooms";
    if (path.startsWith("/students")) return "profiles";
    if (path.startsWith("/student-allocation")) return "allocation";
    if (path.startsWith("/tables") || path.startsWith("/cupboards")) return "allotments";
    if (path.startsWith("/payments")) return "payments";
    if (path.startsWith("/admin/users") || path.startsWith("/admin/passwords")) return "adminUsers";
    if (path.startsWith("/admin/profile")) return "adminProfile";
    return "dashboard";
};

export const sanitizeAdminForSession = (admin) => ({
    id: admin.id,
    name: admin.name,
    username: admin.username,
    email: admin.email,
    mobile: admin.mobile,
    role: admin.role,
    privileges: admin.privileges || [],
    active: admin.active !== false,
});
