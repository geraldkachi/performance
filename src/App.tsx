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

const App: React.FC = () => {
  const twentyFourHoursInMs = 1000 * 60 * 60 * 24;

  const ref = useRef<QueryClient>();
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

  return (
    <>
      <QueryClientProvider client={ref.current}>
        <ToastContainer />
        <Suspense fallback={"Loading"}>
          <Routes>
            <Route element={<UnAuthLayout />}>
              <Route element={<UnProtectedRoutes />}>
                <Route path="/" element={<Login />} />
                <Route path="/reset" element={<ResetPassword />} />
              </Route>
            </Route>

            {/* Protected Roues */}
            <Route element={<ProtectedRoutes />}>
              <Route element={<Layout />}>
                <Route path="/home" element={<Home />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/staff/:id" element={<StaffDetail />} />
                <Route path="/task" element={<Task />} />
                <Route path="/history" element={<History />} />
                <Route path="/history/:id" element={<HistoryDetail />} />
                <Route path="/stand-up" element={<StandUp />} />
                <Route
                  path="/stand-up/start-standup"
                  element={<StandUpDetail />}
                />
                <Route path="/stand-up/:id" element={<StandUpDetailEnd />} />
                <Route path="/statistics" element={<Statistics />} />
              </Route>
            </Route>
            {/* 404 page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </QueryClientProvider>
    </>
  );
};

export default App;
