import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import TableVisualizationPage from "./pages/TableVisualizationPage.jsx";
import Navbar from "./components/Navbar.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/upload" element={<UploadPage />} />
        <Route exact path="/table" element={<TableVisualizationPage />} />
      </Routes>
    </Router>
  );
}

export default App;