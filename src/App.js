import { Route, Routes } from "react-router-dom";
import "./App.css";
import CreateEvent from "./components/CreateEvent";
import DetailEvent from "./components/DetailEvent";
import Home from "./components/Layout/Home";
import WorkSchedule from "./components/Layout/WorkSchedule";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";

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
        </Routes>
    );
}

export default App;
