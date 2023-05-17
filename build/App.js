import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import "./App.css";
import { Suspense, useRef } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedRoutes } from "./routers";
import { Layout } from "./components";
import Staff from "./pages/staff/Staff";
import StaffDetail from "./pages/staff-detail/StaffDetail";
import Task from "./pages/task/Task";
import History from "./pages/history/History";
import HistoryDetail from "./pages/history-detail/HistoryDetail";
import StandUp from "./pages/stand-up/StandUp";
import Home from "./pages/home/Home";
import StandUpDetail from "./pages/standUp-detail/StandUpDetail";
import Login from "./pages/login/Login";
import ResetPassword from "./pages/reset-password/ResetPassword";
import UnProtectedRoutes from "./routers/UnProtectedRoutes";
import UnAuthLayout from "./components/layout/UnAuthLayout";
import StandUpDetailEnd from "./pages/standUp-detail/StandUpDetailEnd";
import Statistics from "./pages/statistics/Statistics";
const App = () => {
    const twentyFourHoursInMs = 1000 * 60 * 60 * 24;
    const ref = useRef();
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                refetchOnMount: false,
                refetchOnReconnect: false,
                retry: false,
                staleTime: twentyFourHoursInMs,
            },
        },
    });
    ref.current = queryClient;
    return (_jsx(_Fragment, { children: _jsxs(QueryClientProvider, { client: ref.current, children: [_jsx(ToastContainer, {}), _jsx(Suspense, { fallback: "Loading", children: _jsxs(Routes, { children: [_jsx(Route, { element: _jsx(UnAuthLayout, {}), children: _jsxs(Route, { element: _jsx(UnProtectedRoutes, {}), children: [_jsx(Route, { path: "/", element: _jsx(Login, {}) }), _jsx(Route, { path: "/reset", element: _jsx(ResetPassword, {}) })] }) }), _jsx(Route, { element: _jsx(ProtectedRoutes, {}), children: _jsxs(Route, { element: _jsx(Layout, {}), children: [_jsx(Route, { path: "/home", element: _jsx(Home, {}) }), _jsx(Route, { path: "/staff", element: _jsx(Staff, {}) }), _jsx(Route, { path: "/staff/:id", element: _jsx(StaffDetail, {}) }), _jsx(Route, { path: "/task", element: _jsx(Task, {}) }), _jsx(Route, { path: "/history", element: _jsx(History, {}) }), _jsx(Route, { path: "/history/:id", element: _jsx(HistoryDetail, {}) }), _jsx(Route, { path: "/stand-up", element: _jsx(StandUp, {}) }), _jsx(Route, { path: "/stand-up/start-standup", element: _jsx(StandUpDetail, {}) }), _jsx(Route, { path: "/stand-up/:id", element: _jsx(StandUpDetailEnd, {}) }), _jsx(Route, { path: "/statistics", element: _jsx(Statistics, {}) })] }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/" }) })] }) })] }) }));
};
export default App;
