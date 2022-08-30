import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Layout/Home";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import NotFoundPage from "./pages/NotFoundPage";
import GeneralNotifications from "./pages/Utility/GeneralNotifications";
import CreateNews from "./pages/Utility/GeneralNotifications/CreateNews";
import DetailNews from "./pages/Utility/GeneralNotifications/DetailNews";
import UpdateNews from "./pages/Utility/GeneralNotifications/UpdateNews";
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
                <Route
                    path="/utility/general-notifications"
                    element={<GeneralNotifications />}
                />
                <Route
                    path="/utility/general-notifications/view/:id"
                    element={<DetailNews />}
                />
                <Route
                    path="/utility/general-notifications/update/68"
                    element={<UpdateNews />}
                />
                <Route
                    path="/utility/general-notifications/create"
                    element={<CreateNews />}
                />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
