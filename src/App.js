import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Layout/Home";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import WorkSchedule from "./pages/WorkSchedule";
import CreateEvent from "./pages/WorkSchedule/CreateEvent";
import DetailEvent from "./pages/WorkSchedule/DetailEvent";

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Home />} />
                <Route
                    path="/company-work-schedule"
                    element={<WorkSchedule />}
                />
                <Route
                    path="/company-work-schedule/create"
                    element={<CreateEvent />}
                />
                <Route
                    path="/company-work-schedule/view/:schedule_code"
                    element={<DetailEvent />}
                />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
