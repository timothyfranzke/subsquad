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
import Login from "./marketing-site/components/Login";
import Game from "./app/screens/Game";
import { useState, useEffect } from "react";
import RosterManagement from "./app/screens/RosterManagement";
import GamesList from "./app/screens/GameList";
import MarketingPage from "./marketing-site/Marketing";
import BetaFeedback from "./components/BetaFeedback";
import AdminDashboard from "./admin/Admin";
import { useAnalytics } from "./hooks/useAnlyticsHook";
import AdminFeedback from "./admin/Feedback";

const PrivateRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        trackEvent('user_authenticated', {
          user_id: user.uid
        });
      }
    });

    return unsubscribe;
  }, [trackEvent]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
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

  return user && user.email === "timothyfranzke@gmail.com" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
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
        <Route path="/" element={<MarketingPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/roster"
          element={
            <PrivateRoute>
              <RosterManagementWrapper />
            </PrivateRoute>
          }
        />
        <Route
          path="/games"
          element={
            <PrivateRoute>
              <GamesList />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/feedback" element={<AdminFeedback />} />
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
