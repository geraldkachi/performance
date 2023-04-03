import './App.css'
import { Suspense, useRef } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from './routers';
import { Layout,  } from './components';
import Staff from './pages/staff/Staff';
import StaffDetail from './pages/staff-detail/StaffDetail';
import Task from './pages/task/Task';
import History from './pages/history/History';
import HistoryDetail from './pages/history-detail/HistoryDetail';
import StandUp from './pages/stand-up/StandUp';
import Home from './pages/home/Home';
import StandUpDetail from './pages/standUp-detail/StandUpDetail';

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
  })
  ref.current = queryClient;



  return (
    <>
      <QueryClientProvider client={ref.current}>
        <ToastContainer />
        <Suspense fallback={"Loading"}>
          <Routes>
            {/* <Route element={<ProtectedRoutes />}> */}
            <Route path="/" element={<Layout />} >
              <Route path="/home" element={<Home />} />
              <Route path="/staff" element={<Staff />} />
              <Route path="/staff/:id" element={<StaffDetail />} />
              <Route path="/task" element={<Task />} />
              <Route path="/history" element={<History />} />
              <Route path="/history/:id" element={<HistoryDetail />} />
              <Route path="/stand-up" element={<StandUp />} />
              <Route path="/stand-up/:id" element={<StandUpDetail />} />
            </Route>
            {/* </Route> */}
            {/* 404 page */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>

      </QueryClientProvider>
    </>
  )
}

export default App
