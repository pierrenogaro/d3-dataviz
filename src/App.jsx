import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from "./pages/Home.jsx";
import Histogram from "./components/Histogram.jsx";
import Pie from "./components/Pie.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/histogram" element={<Histogram />} />
                <Route path="/pie" element={<Pie />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App