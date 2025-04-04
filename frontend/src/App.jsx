// App.jsx - Main application component that sets up routing and context providers.

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TasksPage from "./pages/TasksPage";
import NotFoundPage from "./pages/NotFoundPage";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import { AuthProvider } from "./context/AuthContext";
import { TaskProvider } from "./context/TaskContext";
import { NotificationProvider } from "./context/NotificationContext";

import "./styles/globals.css";

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <NotificationProvider>
          <TaskProvider>
            <Router>
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
              <Footer />
            </Router>
          </TaskProvider>
        </NotificationProvider>
      </AuthProvider>
    </div>
  );
}

export default App;

