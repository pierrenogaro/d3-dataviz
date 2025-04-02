import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from "./pages/Home.jsx";
import Histogram from "./components/Histogram.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/histogram" element={<Histogram />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App