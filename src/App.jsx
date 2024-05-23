import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom";
import Index from "./pages/Index.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import TableVisualizationPage from "./pages/TableVisualizationPage.jsx";
import Navbar from "./components/Navbar.jsx";

import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.setItem("isAuthenticated", "false");
  };
  return (
    <Router>
      <Navbar isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route exact path="/upload" element={isAuthenticated ? <UploadPage /> : <Navigate to="/login" />} />
        <Route exact path="/table" element={isAuthenticated ? <TableVisualizationPage /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;