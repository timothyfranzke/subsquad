import React, { useState } from 'react';
import { User, CheckCircle, X } from 'lucide-react';

const PlayerSelectionModal = ({ isOpen, onClose, roster, onConfirm }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [isCreating, setIsCreating] = useState(false);

  if (!isOpen) return null;

  const handlePlayerToggle = (playerId) => {
    setSelectedPlayers(prev => 
      prev.includes(playerId)
        ? prev.filter(id => id !== playerId)
        : [...prev, playerId]
    );
  };

  const handleConfirm = async () => {
    if (selectedPlayers.length < 5) {
      alert('Please select at least 5 players');
      return;
    }
    setIsCreating(true);
    await onConfirm(selectedPlayers);
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Select Available Players</h2>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X size={24} />
            </button>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Select the players who are present for today's game. You need at least 5 players.
          </p>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            {roster.map(player => (
              <button
                key={player.id}
                onClick={() => handlePlayerToggle(player.id)}
                className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                  selectedPlayers.includes(player.id)
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <User size={20} className="text-gray-400 mr-2" />
                  <span className="font-medium">{player.name}</span>
                </div>
                {selectedPlayers.includes(player.id) && (
                  <CheckCircle size={20} className="text-green-500" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              {selectedPlayers.length} players selected
            </span>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                disabled={selectedPlayers.length < 5 || isCreating}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isCreating ? 'Creating Game...' : 'Start Game'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSelectionModal;