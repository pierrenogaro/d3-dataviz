import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from "./pages/Home.jsx";
import Histogram from "./components/Histogram.jsx";
import Pie from "./components/Pie.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-5"></div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/histogram" element={<Histogram />} />
                <Route path="/pie" element={<Pie />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App