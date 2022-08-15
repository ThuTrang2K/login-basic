import "./App.css";
import Login from "./pages/Login";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </div>
    );
}

export default App;
