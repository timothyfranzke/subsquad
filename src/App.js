import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import Login from "./components/Login";
import Game from "./Game/Game";
import { useState, useEffect } from "react";
import RosterManagement from "./Game/RosterManagement";
import GamesList from "./Game/GameList";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

// Wrapper component for RosterManagement to handle navigation
const RosterManagementWrapper = () => {
  const navigate = useNavigate();

  return (
    <RosterManagement
      onRosterSelect={(roster) => navigate("/games", { state: { roster } })}
    />
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/roster" element={<PrivateRoute><RosterManagementWrapper /></PrivateRoute>} />
        <Route path="/games" element={<PrivateRoute><GamesList /></PrivateRoute>} />
        <Route
          path="/game"
          element={
            <PrivateRoute>
              <Game />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to="/roster" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;