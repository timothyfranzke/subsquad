import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, User } from "lucide-react";
import { initializeApp } from "firebase/app";
import Header from "./Header";
import SubHistoryMatrix from "./components/SubHistoryMatrix";
import ConfigurationEditor from "./components/ConfigEditor";
import PlayerCard from "./components/PlayerCard";
import Modal from "./components/Modal";
import PlayerSwapModal from "./components/PlayerSwapModal";

const generateGameId = () =>
  `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

const saveGameToStorage = (gameId, gameData) => {
  localStorage.setItem(
    gameId,
    JSON.stringify({
      ...gameData,
      lastUpdated: new Date().toISOString(),
    })
  );
};

const loadGameFromStorage = (gameId) => {
  const gameData = localStorage.getItem(gameId);
  return gameData ? JSON.parse(gameData) : null;
};

const findActiveGame = () => {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("game_")) {
      const gameData = JSON.parse(localStorage.getItem(key));
      if (gameData.gameState === "in_progress") {
        return { id: key, ...gameData };
      }
    }
  }
  return null;
};

const Game = () => {
  const [roster, setRoster] = useState([]);
  const [gameTime, setGameTime] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const [activePlayers, setActivePlayers] = useState([]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [currentTimes, setCurrentTimes] = useState({});
  const [swapHistory, setSwapHistory] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showSwapPreview, setShowSwapPreview] = useState(false);
  const [consecutiveCounts, setConsecutiveCounts] = useState({});
  const [totalActiveTimes, setTotalActiveTimes] = useState({});
  const [totalBenchedTimes, setTotalBenchedTimes] = useState({});
  const [currentGameId, setCurrentGameId] = useState(null);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);
  const [sectionSwaps, setSectionSwaps] = useState({});
  const isUpdatingFromSnapshot = useRef(false);
  const pendingUpdate = useRef(null);
  const updateTimeoutRef = useRef(null);

  const [config, setConfig] = useState({
    countUp: true,
    gameDuration: 2400,
    activePlayersLimit: 5,
    consecutiveActiveWarning: 2,
    consecutiveBenchWarning: 2,
  });
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [gameState, setGameState] = useState("not_started"); // 'not_started', 'in_progress', 'ended'

  useEffect(() => {
    const activeGame = findActiveGame();
    if (activeGame) {
      setCurrentGameId(activeGame.id);
      setGameState(activeGame.gameState);
      setRoster(activeGame.roster);
      setGameTime(activeGame.gameTime);
      setActivePlayers(activeGame.activePlayers);
      setCurrentTimes(activeGame.currentTimes || {});
      setTotalActiveTimes(activeGame.totalActiveTimes || {});
      setTotalBenchedTimes(activeGame.totalBenchedTimes || {});
      setSwapHistory(activeGame.swapHistory || []);
      setConfig(activeGame.config);
      setIsGameActive(activeGame.isGameActive);
    }
  }, []);

  // Save game state when it changes
  useEffect(() => {
    if (currentGameId && gameState === "in_progress") {
      saveGameToStorage(currentGameId, {
        gameState,
        roster,
        gameTime,
        activePlayers,
        currentTimes,
        totalActiveTimes,
        totalBenchedTimes,
        swapHistory,
        isGameActive,
        config,
      });
    }
  }, [gameTime, activePlayers, swapHistory, gameState, currentGameId]);

  // Timer effect
  useEffect(() => {
    let interval;
    if (isGameActive && gameState === "in_progress") {
      interval = setInterval(() => {
        setGameTime((prevTime) => {
          const newTime = config.countUp ? prevTime + 1 : prevTime - 1;
          return config.countUp ? newTime : Math.max(0, newTime);
        });

        setCurrentTimes((prevTimes) => {
          const newTimes = { ...prevTimes };
          activePlayers.forEach((id) => {
            newTimes[id] = (newTimes[id] || 0) + 1;
          });
          return newTimes;
        });

        setTotalActiveTimes((prevTimes) => {
          const newTimes = { ...prevTimes };
          activePlayers.forEach((id) => {
            newTimes[id] = (newTimes[id] || 0) + 1;
          });
          return newTimes;
        });

        setTotalBenchedTimes((prevTimes) => {
          const newTimes = { ...prevTimes };
          roster.forEach((player) => {
            if (!activePlayers.includes(player.id)) {
              newTimes[player.id] = (newTimes[player.id] || 0) + 1;
            }
          });
          return newTimes;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isGameActive, activePlayers, config.countUp, roster, gameState]);

  const applySwap = () => {
    if (selectedPlayers.length !== 5) {
      alert("Invalid lineup. Please select exactly 5 players.");
      return;
    }

    const newHistory = [...swapHistory, selectedPlayers];
    setSwapHistory(newHistory);
    setActivePlayers(selectedPlayers);

    selectedPlayers.forEach((id) => {
      setCurrentTimes((prev) => ({ ...prev, [id]: 0 }));
    });

    // Reset swap tracking for the new section
    setSectionSwaps((prev) => ({
      ...prev,
      [newHistory.length - 1]: [],
    }));

    setSelectedPlayers([]);
    setShowSwapPreview(false);
  };

  const addPlayer = () => {
    if (newPlayerName.trim()) {
      const newPlayer = { id: Date.now(), name: newPlayerName.trim() };
      setRoster((prev) => [...prev, newPlayer]);
      setCurrentTimes((prev) => ({ ...prev, [newPlayer.id]: 0 }));
      setNewPlayerName("");
    }
  };

  const handlePlayerSwap = (activePlayerId, benchedPlayerId) => {
    setActivePlayers((prev) => [
      ...prev.filter((id) => id !== activePlayerId),
      benchedPlayerId,
    ]);

    setCurrentTimes((prev) => ({
      ...prev,
      [activePlayerId]: 0,
      [benchedPlayerId]: 0,
    }));

    // Record the swap in the current section
    const currentSection = swapHistory.length - 1;
    setSectionSwaps((prev) => ({
      ...prev,
      [currentSection]: [
        ...(prev[currentSection] || []),
        {
          out: activePlayerId,
          in: benchedPlayerId,
          time: gameTime,
        },
      ],
    }));
  };

  const toggleGameActive = () => {
    if (gameState === "in_progress") {
      setIsGameActive(!isGameActive);
    }
  };
  const startGame = () => {
    if (roster.length < 5) {
      alert("You need at least 5 players to start the game!");
      return;
    }

    const newGameId = generateGameId();
    const initialActivePlayers = roster.slice(0, 5).map((p) => p.id);

    const gameData = {
      gameState: "in_progress",
      roster,
      gameTime: 0,
      activePlayers: initialActivePlayers,
      currentTimes: {},
      totalActiveTimes: {},
      totalBenchedTimes: {},
      swapHistory: [initialActivePlayers],
      isGameActive: true,
      config,
      startedAt: new Date().toISOString(),
    };

    saveGameToStorage(newGameId, gameData);
    setCurrentGameId(newGameId);
    setSwapHistory([initialActivePlayers]);
    setActivePlayers(initialActivePlayers);
    setGameState("in_progress");
    setIsGameActive(true);
  };
  const endGame = () => {
    if (currentGameId) {
      const gameData = loadGameFromStorage(currentGameId);
      if (gameData) {
        gameData.gameState = "ended";
        gameData.isGameActive = false;
        gameData.endedAt = new Date().toISOString();
        saveGameToStorage(currentGameId, gameData);
      }
    }
    setIsGameActive(false);
    setGameState("ended");
  };

  const resetGame = () => {
    setGameTime(0);
    setIsGameActive(false);
    setGameState("not_started");
    setCurrentTimes({});
    setActivePlayers([]);
    setSelectedPlayers([]);
    setSwapHistory([]);
    setCurrentGameId(null);
  };

  const togglePlayerSelection = (playerId) => {
    setSelectedPlayers((prev) =>
      prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId]
    );
    setShowSwapPreview(true);
  };

  const cancelSwap = () => {
    setSelectedPlayers([]);
    setShowSwapPreview(false);
  };

  const handleDragStart = (e, playerId) => {
    e.dataTransfer.setData("text/plain", playerId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetPlayerId) => {
    e.preventDefault();
    const draggedPlayerId = parseInt(e.dataTransfer.getData("text"));
    const targetPlayer = roster.find((p) => p.id === targetPlayerId);

    if (
      activePlayers.includes(targetPlayerId) &&
      !activePlayers.includes(draggedPlayerId)
    ) {
      setActivePlayers((prev) => [
        ...prev.filter((id) => id !== targetPlayerId),
        draggedPlayerId,
      ]);

      setCurrentTimes((prev) => ({
        ...prev,
        [draggedPlayerId]: 0,
        [targetPlayerId]: 0,
      }));

      // Show a temporary notification
      const notification = document.createElement("div");
      notification.textContent = `Swapped ${
        roster.find((p) => p.id === draggedPlayerId).name
      } with ${targetPlayer.name}`;
      notification.className =
        "fixed bottom-4 right-4 bg-blue-500 text-white px-4 py-2 rounded shadow-lg";
      document.body.appendChild(notification);
      setTimeout(() => document.body.removeChild(notification), 3000);
    }
  };

  return (
    <div>
      <Header
        gameTime={gameTime}
        isGameActive={isGameActive}
        onStartStop={toggleGameActive}
        onOpenConfig={() => setIsConfigOpen(true)}
        onStartGame={startGame}
        onEndGame={endGame}
        gameState={gameState}
      />
      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="mb-4 flex justify-between">
          <div className="flex flex-1">
            <input
              type="text"
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder="Enter player name"
              className="border p-2 flex-grow rounded-l"
            />
            <button
              onClick={addPlayer}
              className="px-4 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {gameState === "in_progress" && (
            <button
              onClick={() => setIsSwapModalOpen(true)}
              className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Swap Players
            </button>
          )}
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-800">On Court</h2>
          <div className="grid grid-cols-2 gap-2">
            {roster
              .filter((player) => activePlayers.includes(player.id))
              .map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCourt={true}
                  currentTime={currentTimes[player.id] || 0}
                  totalActiveTime={totalActiveTimes[player.id] || 0}
                  totalBenchedTime={totalBenchedTimes[player.id] || 0}
                  onSelect={togglePlayerSelection}
                  isSelected={selectedPlayers.includes(player.id)}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isGameInProgress={gameState === "in_progress"}
                  swapHistory={swapHistory}
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-800">On Bench</h2>
          <div className="grid grid-cols-2 gap-2">
            {roster
              .filter((player) => !activePlayers.includes(player.id))
              .map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCourt={false}
                  currentTime={currentTimes[player.id] || 0}
                  totalActiveTime={totalActiveTimes[player.id] || 0}
                  totalBenchedTime={totalBenchedTimes[player.id] || 0}
                  onSelect={togglePlayerSelection}
                  isSelected={selectedPlayers.includes(player.id)}
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  isGameInProgress={gameState != "ended"}
                  swapHistory={swapHistory}
                />
              ))}
          </div>
        </div>
        <SubHistoryMatrix
  swapHistory={swapHistory}
  roster={roster}
  activePlayers={activePlayers}
  sectionSwaps={sectionSwaps}
  totalActiveTimes={totalActiveTimes}  // Add this prop
/>
        {showSwapPreview && (
          <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Next Lineup Preview</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPlayers.map((playerId) => {
                const player = roster.find((p) => p.id === playerId);
                return (
                  <div key={playerId} className="bg-blue-100 px-2 py-1 rounded">
                    {player.name}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={cancelSwap}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={applySwap}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Sub
              </button>
            </div>
          </div>
        )}
        {gameState === "ended" && (
          <button
            onClick={resetGame}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start New Game
          </button>
        )}
      </div>
      <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)}>
        <ConfigurationEditor config={config} setConfig={setConfig} />
      </Modal>
      <PlayerSwapModal
        isOpen={isSwapModalOpen}
        onClose={() => setIsSwapModalOpen(false)}
        activePlayers={activePlayers}
        benchedPlayers={roster
          .filter((p) => !activePlayers.includes(p.id))
          .map((p) => p.id)}
        roster={roster}
        onSwap={handlePlayerSwap}
      />
    </div>
  );
};

export default Game;
