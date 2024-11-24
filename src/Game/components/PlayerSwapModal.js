import React, { useState } from 'react';
import { ArrowDownUp } from 'lucide-react';

const PlayerSwapModal = ({ isOpen, onClose, activePlayers, benchedPlayers, roster, onSwap }) => {
  const [selectedActive, setSelectedActive] = useState(null);
  const [selectedBenched, setSelectedBenched] = useState(null);

  const handleSwap = () => {
    if (selectedActive && selectedBenched) {
      onSwap(selectedActive, selectedBenched);
      setSelectedActive(null);
      setSelectedBenched(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  const getPlayerById = (id) => roster.find(p => p.id === id);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Swap Players</h2>
          <p className="text-sm text-gray-500">Select one player from each group to swap</p>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h3 className="font-semibold mb-2 text-green-700">Active Players</h3>
            <div className="grid grid-cols-1 gap-2">
              {activePlayers.map(playerId => (
                <button
                  key={playerId}
                  onClick={() => setSelectedActive(playerId)}
                  className={`p-2 rounded text-left ${
                    selectedActive === playerId
                      ? 'bg-green-100 border-2 border-green-500'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {getPlayerById(playerId)?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowDownUp className="text-blue-500" size={24} />
          </div>

          <div>
            <h3 className="font-semibold mb-2 text-yellow-700">Benched Players</h3>
            <div className="grid grid-cols-1 gap-2">
              {benchedPlayers.map(playerId => (
                <button
                  key={playerId}
                  onClick={() => setSelectedBenched(playerId)}
                  className={`p-2 rounded text-left ${
                    selectedBenched === playerId
                      ? 'bg-yellow-100 border-2 border-yellow-500'
                      : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {getPlayerById(playerId)?.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4 border-t">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Cancel
            </button>
            <button
              onClick={handleSwap}
              disabled={!selectedActive || !selectedBenched}
              className={`px-4 py-2 rounded ${
                selectedActive && selectedBenched
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Swap Players
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerSwapModal;