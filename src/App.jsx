// src/components/App.jsx
import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"; // Asegúrate de que la ruta sea correcta
import Yo from "./pages/yo.jsx";
import Index from "./pages/index.jsx";
import Proyectos from "./pages/proyectos.jsx";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar /> {/* Navbar dentro del Router */}
                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/yo" element={<Yo />} />
                        <Route path="/proyectos" element={<Proyectos />} />
                        {/* Agrega más rutas según sea necesario */}
                    </Routes>
                </main>
            </div>
        </Router>
    );
};

export default App;
