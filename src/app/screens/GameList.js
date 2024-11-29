import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  orderBy,
  doc,
  updateDoc,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { Users, PlayCircle, Clock, Calendar, Activity } from 'lucide-react';
import Game from './Game';

const GamesList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roster = location.state?.roster;
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentGame, setCurrentGame] = useState(null);
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    if (!roster?.id) {
      navigate('/roster');
      return;
    }
    loadGames();
  }, [roster?.id]);

  // Subscribe to real-time updates for the current game
  useEffect(() => {
    if (!currentGame?.id) return;

    const unsubscribe = onSnapshot(
      doc(db, 'games', currentGame.id),
      (doc) => {
        if (doc.exists()) {
          setCurrentGame(prev => ({
            ...prev,
            ...doc.data()
          }));
        }
      },
      (error) => {
        console.error("Error listening to game updates:", error);
        setError("Failed to get real-time game updates");
      }
    );

    return () => unsubscribe();
  }, [currentGame?.id]);

  const loadGames = async () => {
    try {
      const gamesQuery = query(
        collection(db, 'games'),
        where('rosterId', '==', roster.id),
        orderBy('startedAt', 'desc')
      );

      const snapshot = await getDocs(gamesQuery);
      const gamesData = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          swapHistory: data.swapHistory ? JSON.parse(data.swapHistory) : []
        };
      });
      setGames(gamesData);
    } catch (err) {
      setError('Failed to load games');
      console.error('Error loading games:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateGame = async () => {
    try {
      const gameData = {
        rosterId: roster.id,
        rosterName: roster.name,
        roster: roster.players,
        startedAt: serverTimestamp(),
        gameState: 'not_started',
        createdBy: auth.currentUser.uid,
        playerStats: {},
        swapHistory: [],
        gameTime: 0,
        activePlayers: [],
        currentTimes: {},
        totalActiveTimes: {},
        totalBenchedTimes: {},
        config: {
          countUp: true,
          gameDuration: 2400,
          activePlayersLimit: 5,
          consecutiveActiveWarning: 2,
          consecutiveBenchWarning: 2
        }
      };

      const docRef = await addDoc(collection(db, 'games'), gameData);
      const newGame = { id: docRef.id, ...gameData };
      setCurrentGame(newGame);
      setShowGame(true);
    } catch (err) {
      setError('Failed to create new game');
      console.error('Error creating game:', err);
    }
  };

  const handleGameUpdated = async (update) => {
    try {
        console.log(update);
      const gameRef = doc(db, 'games', currentGame.id);
      await updateDoc(gameRef, {
        ...update,
        swapHistory: JSON.stringify(update.swapHistory),
        lastUpdatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating game:', err);
    }
  };

  const handleViewGame = (game) => {
    setCurrentGame(game);
    setShowGame(true);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (showGame && currentGame) {
    return (
      <Game
        initialGame={currentGame}
        onGameUpdated={handleGameUpdated}
        onError={setError}
      />
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-semibold">Loading games...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Users size={32} className="text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{roster.name}</h1>
              <p className="text-sm text-gray-500">{roster.players.length} players</p>
            </div>
          </div>
          <button
            onClick={handleCreateGame}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <PlayCircle size={20} className="mr-2" />
            Start New Game
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">Game History</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {games.map(game => (
              <div 
                key={game.id} 
                className="p-4 hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleViewGame(game)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        game.status === 'in_progress' ? 'bg-green-100 text-green-800' :
                        game.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {game.status}
                      </span>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar size={16} className="mr-1" />
                        {formatDate(game.startedAt)}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {game.gameTime != null && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock size={16} className="mr-1" />
                          {Math.floor(game.gameTime / 60)}m {game.gameTime % 60}s
                        </div>
                      )}
                      {game.totalSubstitutions != null && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Activity size={16} className="mr-1" />
                          {game.totalSubstitutions} substitutions
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-blue-600">
                    <span className="text-sm">View Details →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamesList;