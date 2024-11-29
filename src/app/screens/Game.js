import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, RotateCcw, User } from "lucide-react";
import Header from "../components/Header";
import SubHistoryMatrix from "../components/SubHistoryMatrix";
import ConfigurationEditor from "../components/ConfigEditor";
import PlayerCard from "../components/PlayerCard";
import Modal from "../components/Modal";
import PlayerSwapModal from "../components/PlayerSwapModal";

// Default game configuration remains the same...
const DEFAULT_GAME_STATE = {
  gameState: "not_started",
  roster: [],
  gameTime: 0,
  activePlayers: [],
  currentTimes: {},
  totalActiveTimes: {},
  totalBenchedTimes: {},
  swapHistory: [],
  sectionSwaps: {},
  sectionTimes: [],
  isGameActive: false,
  config: {
    countUp: true,
    gameDuration: 2400,
    activePlayersLimit: 5,
    consecutiveActiveWarning: 2,
    consecutiveBenchWarning: 2,
  },
};

const Game = ({ initialGame = DEFAULT_GAME_STATE, onGameUpdated }) => {
  const [game, setGame] = useState(initialGame);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [showSwapPreview, setShowSwapPreview] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [isSwapModalOpen, setIsSwapModalOpen] = useState(false);

  // Helper function to update game state and emit update
  const updateGame = (updates) => {
    setGame((currentGame) => {
      const newGame = { ...currentGame, ...updates };
      onGameUpdated?.(newGame);
      return newGame;
    });
  };

  // Fixed timer effect
  useEffect(() => {
    let interval;
    if (game.isGameActive && game.gameState === "in_progress") {
      interval = setInterval(() => {
        setGame((currentGame) => {
          // Calculate new game time
          const newGameTime = currentGame.config.countUp
            ? currentGame.gameTime + 1
            : Math.max(0, currentGame.gameTime - 1);

          // Create new time tracking objects
          const newCurrentTimes = { ...currentGame.currentTimes };
          const newTotalActiveTimes = { ...currentGame.totalActiveTimes };
          const newTotalBenchedTimes = { ...currentGame.totalBenchedTimes };

          // Update active players' times
          currentGame.activePlayers.forEach((id) => {
            newCurrentTimes[id] = (newCurrentTimes[id] || 0) + 1;
            newTotalActiveTimes[id] = (newTotalActiveTimes[id] || 0) + 1;
          });

          // Update benched players' times
          currentGame.roster.forEach((player) => {
            if (!currentGame.activePlayers.includes(player.id)) {
              newTotalBenchedTimes[player.id] =
                (newTotalBenchedTimes[player.id] || 0) + 1;
            }
          });

          // Create new game state object
          const newGame = {
            ...currentGame,
            gameTime: newGameTime,
            currentTimes: newCurrentTimes,
            totalActiveTimes: newTotalActiveTimes,
            totalBenchedTimes: newTotalBenchedTimes,
          };

          // Notify parent of update
          // if game time is modulo of 60
          if (newGameTime % 60 === 0) {
            onGameUpdated?.(newGame);
          }
          // onGameUpdated?.(newGame);

          return newGame;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [game.isGameActive, game.gameState]);

  // Rest of the component remains the same...
  const startGame = () => {
    if (game.roster.length < game.config.activePlayersLimit) return;

    const initialActivePlayers = game.roster
      .slice(0, game.config.activePlayersLimit)
      .map((p) => p.id);

    updateGame({
      gameState: "in_progress",
      isGameActive: true,
      activePlayers: initialActivePlayers,
      swapHistory: [initialActivePlayers],
      sectionTimes: [0], // First section starts at 0
    });
  };

  const handlePlayerSwap = (activePlayerId, benchedPlayerId) => {
    const newActivePlayers = game.activePlayers.map((id) =>
      id === activePlayerId ? benchedPlayerId : id
    );

    const currentSection = game.swapHistory.length - 1;
    const newSectionSwaps = {
      ...game.sectionSwaps,
      [currentSection]: [
        ...(game.sectionSwaps[currentSection] || []),
        {
          out: activePlayerId,
          in: benchedPlayerId,
          time: game.gameTime,
        },
      ],
    };

    updateGame({
      activePlayers: newActivePlayers,
      sectionSwaps: newSectionSwaps,
      currentTimes: {
        ...game.currentTimes,
        [activePlayerId]: 0,
        [benchedPlayerId]: 0,
      },
    });
  };

  const applySwap = () => {
    if (selectedPlayers.length !== game.config.activePlayersLimit) return;

    const newHistory = [...game.swapHistory, selectedPlayers];
    const newSectionIndex = newHistory.length - 1;
    const newSectionTimes = [...game.sectionTimes, game.gameTime];

    updateGame({
      swapHistory: newHistory,
      activePlayers: selectedPlayers,
      currentTimes: Object.fromEntries(selectedPlayers.map((id) => [id, 0])),
      sectionSwaps: {
        ...game.sectionSwaps,
        [newSectionIndex]: [],
      },
      sectionTimes: newSectionTimes,
    });

    setSelectedPlayers([]);
    setShowSwapPreview(false);
  };

  const handleConfigUpdate = (newConfig) => {
    updateGame({ config: newConfig });
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

  const endGame = () => {
    updateGame({
      gameState: "ended",
      isGameActive: false,
    });
  };

  const toggleGameActive = () => {
    if (game.gameState === "in_progress") {
      updateGame({
        isGameActive: !game.isGameActive,
      });
    }
  };

  return (
    <div>
      <Header
        gameTime={game.gameTime}
        isGameActive={game.isGameActive}
        onStartStop={toggleGameActive}
        onOpenConfig={() => setIsConfigOpen(true)}
        onStartGame={startGame}
        onEndGame={endGame}
        gameState={game.gameState}
      />

      <div className="p-4 bg-gray-100 min-h-screen">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-800">On Court</h2>
          <div className="grid grid-cols-2 gap-2">
            {game.roster
              .filter((player) => game.activePlayers.includes(player.id))
              .map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCourt={true}
                  currentTime={game.currentTimes[player.id] || 0}
                  totalActiveTime={game.totalActiveTimes[player.id] || 0}
                  totalBenchedTime={game.totalBenchedTimes[player.id] || 0}
                  onSelect={() => togglePlayerSelection(player.id)}
                  isSelected={selectedPlayers.includes(player.id)}
                  isGameInProgress={game.gameState === "in_progress"}
                  swapHistory={game.swapHistory}
                />
              ))}
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-blue-800">On Bench</h2>
          <div className="grid grid-cols-2 gap-2">
            {game.roster
              .filter((player) => !game.activePlayers.includes(player.id))
              .map((player) => (
                <PlayerCard
                  key={player.id}
                  player={player}
                  onCourt={false}
                  currentTime={game.currentTimes[player.id] || 0}
                  totalActiveTime={game.totalActiveTimes[player.id] || 0}
                  totalBenchedTime={game.totalBenchedTimes[player.id] || 0}
                  onSelect={() => togglePlayerSelection(player.id)}
                  isSelected={selectedPlayers.includes(player.id)}
                  isGameInProgress={game.gameState === "in_progress"}
                  swapHistory={game.swapHistory}
                />
              ))}
          </div>
        </div>

        <SubHistoryMatrix
          swapHistory={game.swapHistory}
          roster={game.roster}
          activePlayers={game.activePlayers}
          sectionSwaps={game.sectionSwaps}
          totalActiveTimes={game.totalActiveTimes}
          sectionTimes={game.sectionTimes} // Add this line
        />

        {showSwapPreview && (
          <div className="fixed inset-x-0 bottom-0 bg-white p-4 shadow-lg">
            <h3 className="text-lg font-bold mb-2">Next Lineup Preview</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedPlayers.map((playerId) => {
                const player = game.roster.find((p) => p.id === playerId);
                return (
                  <div key={playerId} className="bg-blue-100 px-2 py-1 rounded">
                    {player.name}
                  </div>
                );
              })}
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedPlayers([]);
                  setShowSwapPreview(false);
                }}
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

        <Modal isOpen={isConfigOpen} onClose={() => setIsConfigOpen(false)}>
          <ConfigurationEditor
            config={game.config}
            setConfig={handleConfigUpdate}
          />
        </Modal>

        <PlayerSwapModal
          isOpen={isSwapModalOpen}
          onClose={() => setIsSwapModalOpen(false)}
          activePlayers={game.activePlayers}
          benchedPlayers={game.roster
            .filter((p) => !game.activePlayers.includes(p.id))
            .map((p) => p.id)}
          roster={game.roster}
          onSwap={handlePlayerSwap}
        />
      </div>
    </div>
  );
};

export default Game;
