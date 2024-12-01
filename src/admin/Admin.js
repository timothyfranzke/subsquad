import React, { useState, useEffect } from 'react';
import { 
  Users, Activity, ClipboardList, Calendar,
  TrendingUp, UserPlus, LogIn, BarChart,
  Clock, Award
} from 'lucide-react';
import { 
  collection, 
  query, 
  getDocs,
  where,
  orderBy,
  limit,
  startAfter,
  endBefore,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalRosters: 0,
    publicRosters: 0,
    totalGames: 0,
    activeGames: 0,
    averageGameDuration: 0,
    averagePlayersPerRoster: 0,
    totalLogins: 0,
    newUsersToday: 0
  });

  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadMetrics();
    loadActivityData();
  }, []);

  const loadMetrics = async () => {
    try {
      // Get total users
      const usersSnapshot = await getDocs(collection(db, 'users'));
      const totalUsers = usersSnapshot.size;

      // Get today's new users
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = Timestamp.fromDate(today);
      
      const newUsersQuery = query(
        collection(db, 'users'),
        where('createdAt', '>=', todayTimestamp)
      );
      const newUsersSnapshot = await getDocs(newUsersQuery);
      const newUsersToday = newUsersSnapshot.size;

      // Get rosters metrics
      const rostersSnapshot = await getDocs(collection(db, 'rosters'));
      const rosters = rostersSnapshot.docs.map(doc => doc.data());
      const totalRosters = rostersSnapshot.size;
      const publicRosters = rosters.filter(roster => roster.isPublic).length;
      const totalPlayers = rosters.reduce((acc, roster) => acc + (roster.players?.length || 0), 0);
      const averagePlayersPerRoster = totalRosters > 0 ? (totalPlayers / totalRosters).toFixed(1) : 0;

      // Get games metrics
      const gamesSnapshot = await getDocs(collection(db, 'games'));
      const games = gamesSnapshot.docs.map(doc => doc.data());
      const totalGames = gamesSnapshot.size;
      const activeGames = games.filter(game => 
        game.gameState === 'in_progress' || game.gameState === 'not_started'
      ).length;

      // Calculate average game duration
      const completedGames = games.filter(game => game.gameState === 'ended' && game.gameTime);
      const avgDuration = completedGames.length > 0
        ? completedGames.reduce((acc, game) => acc + (game.gameTime || 0), 0) / completedGames.length
        : 0;

      setMetrics({
        totalUsers,
        activeUsers: Math.floor(totalUsers * 0.7), // This would need to be calculated based on your definition of active
        totalRosters,
        publicRosters,
        totalGames,
        activeGames,
        averageGameDuration: Math.floor(avgDuration / 60), // Convert to minutes
        averagePlayersPerRoster,
        totalLogins: totalUsers * 5, // This would need to be tracked separately
        newUsersToday
      });
    } catch (err) {
      console.error('Error loading metrics:', err);
      setError('Failed to load metrics');
    }
  };

  const loadActivityData = async () => {
    try {
      // This would need to be adjusted based on how you're tracking daily activity
      const mockData = [
        { date: '2024-03-01', users: 45, games: 23, rosters: 12 },
        { date: '2024-03-02', users: 52, games: 28, rosters: 15 },
        { date: '2024-03-03', users: 49, games: 25, rosters: 13 },
        { date: '2024-03-04', users: 63, games: 32, rosters: 18 },
        { date: '2024-03-05', users: 58, games: 30, rosters: 16 },
        { date: '2024-03-06', users: 71, games: 36, rosters: 20 },
        { date: '2024-03-07', users: 67, games: 34, rosters: 19 },
      ];
      setActivityData(mockData);
    } catch (err) {
      console.error('Error loading activity data:', err);
      setError('Failed to load activity data');
    } finally {
      setLoading(false);
    }
  };

  const MetricCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className="text-sm text-gray-500">Last 30 days</span>
      </div>
      <h3 className="text-2xl font-bold mb-1">{value}</h3>
      <p className="text-gray-600 text-sm">{title}</p>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl font-semibold">Loading metrics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Platform metrics and analytics</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Total Users"
            value={metrics.totalUsers}
            icon={Users}
            color="bg-blue-500"
          />
          <MetricCard
            title="New Users Today"
            value={metrics.newUsersToday}
            icon={UserPlus}
            color="bg-green-500"
          />
          <MetricCard
            title="Total Rosters"
            value={metrics.totalRosters}
            icon={ClipboardList}
            color="bg-purple-500"
          />
          <MetricCard
            title="Total Games"
            value={metrics.totalGames}
            icon={Activity}
            color="bg-orange-500"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Activity Chart */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Platform Activity</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#3B82F6" name="Users" />
                  <Line type="monotone" dataKey="games" stroke="#EF4444" name="Games" />
                  <Line type="monotone" dataKey="rosters" stroke="#8B5CF6" name="Rosters" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Additional Metrics */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Additional Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-purple-500 mr-2" />
                  <span>Active Users</span>
                </div>
                <span className="font-semibold">{metrics.activeUsers}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <BarChart className="w-5 h-5 text-blue-500 mr-2" />
                  <span>Public Rosters</span>
                </div>
                <span className="font-semibold">{metrics.publicRosters}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="w-5 h-5 text-green-500 mr-2" />
                  <span>Active Games</span>
                </div>
                <span className="font-semibold">{metrics.activeGames}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-orange-500 mr-2" />
                  <span>Avg. Game Duration</span>
                </div>
                <span className="font-semibold">{metrics.averageGameDuration} minutes</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="w-5 h-5 text-indigo-500 mr-2" />
                  <span>Avg. Players per Roster</span>
                </div>
                <span className="font-semibold">{metrics.averagePlayersPerRoster}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Growth */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">User Growth</h3>
              <TrendingUp className="w-6 h-6 text-green-500" />
            </div>
            <div className="text-3xl font-bold mb-2">
              +{((metrics.newUsersToday / metrics.totalUsers) * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Growth rate today</p>
          </div>

          {/* Login Activity */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Login Activity</h3>
              <LogIn className="w-6 h-6 text-blue-500" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {metrics.totalLogins}
            </div>
            <p className="text-sm text-gray-600">Total logins</p>
          </div>

          {/* Game Completion */}
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Game Completion</h3>
              <Calendar className="w-6 h-6 text-purple-500" />
            </div>
            <div className="text-3xl font-bold mb-2">
              {((metrics.totalGames - metrics.activeGames) / metrics.totalGames * 100).toFixed(1)}%
            </div>
            <p className="text-sm text-gray-600">Games completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;