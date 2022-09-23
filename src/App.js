import { Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./components/Layout/Home";
import DetailIncomingPage from "./pages/Documents/InternalDocuments/DetailIncomingPage";
import IncomingCreatePage from "./pages/Documents/InternalDocuments/IncomingCreatePage";
import IncomingDocPage from "./pages/Documents/InternalDocuments/IncomingDocPage";
import OutgoingDocPage from "./pages/Documents/InternalDocuments/OutgoingDocPage";
import SignDocPage from "./pages/Documents/InternalDocuments/SignDocPage";
import HomePage from "./pages/HomePage";
import Login from "./pages/LoginPage";
import ListAccountsPage from "./pages/Management/UserAccounts/ListAccountsPage";
import ListCommandAccountsPage from "./pages/Management/UserAccounts/ListCommandAccountsPage";
import NotFoundPage from "./pages/NotFoundPage";
import ContactsPage from "./pages/Utility/Contacts";
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
                    path="/utility/general-notifications/view/:news_id"
                    element={<DetailNews />}
                />
                <Route
                    path="/utility/general-notifications/update/:news_id"
                    element={<UpdateNews />}
                />
                <Route
                    path="/utility/general-notifications/create"
                    element={<CreateNews />}
                />
                <Route
                    path="/utility/contacts"
                    element={<ContactsPage/>}
                />
                <Route
                    path="/admin/user-account-management"
                    element={<ListAccountsPage/>}
                />
                <Route
                    path="/admin/user-app-management"
                    element={<ListCommandAccountsPage/>}
                />
                <Route
                    path="/internal-document/incoming-document"
                    element={<IncomingDocPage/>}
                />
                <Route
                    path="/internal-document/outgoing-document"
                    element={<OutgoingDocPage/>}
                />
                <Route
                    path="/internal-document/sign-document"
                    element={<SignDocPage/>}
                />
                <Route
                    path="/internal-document/incoming-document/create"
                    element={<IncomingCreatePage/>}
                />
                <Route
                    path="/internal-document/incoming-document/view/:id"
                    element={<DetailIncomingPage/>}
                />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default App;
