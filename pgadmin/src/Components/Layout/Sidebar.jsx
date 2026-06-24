import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CreditCard, LayoutDashboard, BedDouble, User, X, ChevronDown, ChevronRight } from "lucide-react";
import { adminRoles, getCurrentAdmin, hasPrivilege, isSuperAdmin } from "../../Utils/adminAuth";
import { isPaymentModuleEnabled } from "../../Utils/paymentHelper";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const location = useLocation();
    const currentAdmin = getCurrentAdmin();

    const [roomMenuOpen, setRoomMenuOpen] = useState(
        location.pathname.startsWith("/rooms") ||
        location.pathname.startsWith("/tables") ||
        location.pathname.startsWith("/cupboards")
    );
    const [profileMenuOpen, setProfileMenuOpen] = useState(
        location.pathname.startsWith("/students") ||
        location.pathname.startsWith("/student-allocation") ||
        location.pathname.startsWith("/admin")
    );

    const navLinkClass = (active) =>
        `block rounded-md px-4 py-2 text-start text-sm transition ${
            active ? "bg-gray-800 text-white" : "text-gray-300 hover:bg-gray-800"
        }`;

    const closeMobileSidebar = () => setSidebarOpen(false);
    const hasRoomMenu = hasPrivilege(currentAdmin, "rooms") || hasPrivilege(currentAdmin, "allotments");
    const canManagePaymentModule = isSuperAdmin(currentAdmin) || currentAdmin?.role === adminRoles.SINGLE;
    const showPaymentMenu =
        hasPrivilege(currentAdmin, "payments") && (isPaymentModuleEnabled() || canManagePaymentModule);
    const hasProfileMenu =
        hasPrivilege(currentAdmin, "profiles") ||
        hasPrivilege(currentAdmin, "allocation") ||
        hasPrivilege(currentAdmin, "adminProfile") ||
        isSuperAdmin(currentAdmin);

    return (
        <>
            {sidebarOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
            )}

            <aside
                className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="h-16 flex items-center justify-between px-5 border-b border-gray-700">
                    <h2 className="text-xl font-bold">PG Admin</h2>
                    <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
                        <X size={24} />
                    </button>
                </div>

                <nav className="p-4">
                    <ul className="space-y-2">
                        {hasPrivilege(currentAdmin, "dashboard") && (
                            <li>
                                <Link
                                    to="/"
                                    onClick={closeMobileSidebar}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                        location.pathname === "/" ? "bg-gray-800 text-white" : "hover:bg-gray-800"
                                    }`}
                                >
                                    <LayoutDashboard size={20} />
                                    <span>Dashboard</span>
                                </Link>
                            </li>
                        )}

                        {hasProfileMenu && (
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition ${
                                        location.pathname.startsWith("/students") ||
                                        location.pathname.startsWith("/student-allocation") ||
                                        location.pathname.startsWith("/admin")
                                            ? "bg-gray-800 text-white"
                                            : "hover:bg-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <User size={20} />
                                        <span>Profiles</span>
                                    </div>

                                    {profileMenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </button>

                                {profileMenuOpen && (
                                    <ul className="mt-2 space-y-1 pl-5">
                                        {hasPrivilege(currentAdmin, "profiles") && (
                                            <li>
                                                <Link
                                                    to="/students"
                                                    onClick={closeMobileSidebar}
                                                    className={navLinkClass(location.pathname === "/students")}
                                                >
                                                    Profile Lists
                                                </Link>
                                            </li>
                                        )}
                                        {hasPrivilege(currentAdmin, "allocation") && (
                                            <li>
                                                <Link
                                                    to="/student-allocation"
                                                    onClick={closeMobileSidebar}
                                                    className={navLinkClass(
                                                        location.pathname === "/student-allocation",
                                                    )}
                                                >
                                                    Student Allocation
                                                </Link>
                                            </li>
                                        )}
                                        {isSuperAdmin(currentAdmin) && (
                                            <li>
                                                <Link
                                                    to="/admin/users"
                                                    onClick={closeMobileSidebar}
                                                    className={navLinkClass(location.pathname === "/admin/users")}
                                                >
                                                    Admin Users
                                                </Link>
                                            </li>
                                        )}
                                        {hasPrivilege(currentAdmin, "adminProfile") && (
                                            <li>
                                                <Link
                                                    to="/admin/profile"
                                                    onClick={closeMobileSidebar}
                                                    className={navLinkClass(location.pathname === "/admin/profile")}
                                                >
                                                    Admin Profile
                                                </Link>
                                            </li>
                                        )}
                                    </ul>
                                )}
                            </li>
                        )}
                        {hasRoomMenu && (
                            <li>
                                <button
                                    type="button"
                                    onClick={() => setRoomMenuOpen(!roomMenuOpen)}
                                    className={`flex w-full items-center justify-between rounded-lg px-4 py-3 transition ${
                                        location.pathname.startsWith("/rooms") ||
                                        location.pathname.startsWith("/tables") ||
                                        location.pathname.startsWith("/cupboards")
                                            ? "bg-gray-800 text-white"
                                            : "hover:bg-gray-800"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <BedDouble size={20} />
                                        <span>Rooms</span>
                                    </div>

                                    {roomMenuOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                                </button>

                                {roomMenuOpen && (
                                    <ul className="mt-2 space-y-1 pl-5">
                                        {hasPrivilege(currentAdmin, "rooms") && (
                                            <>
                                                <li>
                                                    <Link
                                                        to="/rooms"
                                                        onClick={closeMobileSidebar}
                                                        className={navLinkClass(location.pathname === "/rooms")}
                                                    >
                                                        All Rooms
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/rooms/add"
                                                        onClick={closeMobileSidebar}
                                                        className={navLinkClass(location.pathname === "/rooms/add")}
                                                    >
                                                        Add Room
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/rooms/occupied"
                                                        onClick={closeMobileSidebar}
                                                        className={navLinkClass(
                                                            location.pathname === "/rooms/occupied",
                                                        )}
                                                    >
                                                        Occupied Rooms
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/rooms/vacant"
                                                        onClick={closeMobileSidebar}
                                                        className={navLinkClass(location.pathname === "/rooms/vacant")}
                                                    >
                                                        Vacant Rooms
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        {hasPrivilege(currentAdmin, "allotments") && (
                                            <>
                                                <li>
                                                    <Link
                                                        to="/tables/allotment"
                                                        onClick={closeMobileSidebar}
                                                        className={navLinkClass(
                                                            location.pathname === "/tables/allotment",
                                                        )}
                                                    >
                                                        Table Allotment
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        to="/cupboards/allotment"
                                                        onClick={closeMobileSidebar}
                                                        className={navLinkClass(
                                                            location.pathname === "/cupboards/allotment",
                                                        )}
                                                    >
                                                        Cupboard Allotment
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                    </ul>
                                )}
                            </li>
                        )}

                        {showPaymentMenu && (
                            <li>
                                <Link
                                    to="/payments"
                                    onClick={closeMobileSidebar}
                                    className={`flex items-center gap-3 rounded-lg px-4 py-3 transition ${
                                        location.pathname === "/payments"
                                            ? "bg-gray-800 text-white"
                                            : "hover:bg-gray-800"
                                    }`}
                                >
                                    <CreditCard size={20} />
                                    <span>Payment Management</span>
                                </Link>
                            </li>
                        )}
                    </ul>
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
