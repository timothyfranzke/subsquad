import React, { useState, useEffect } from 'react';
import { X, Plus, Trash2, Save } from 'lucide-react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';

const EditRosterModal = ({ roster, isOpen, onClose, onUpdate }) => {
  const [editedRoster, setEditedRoster] = useState({
    name: '',
    players: [],
    isPublic: false
  });
  const [newPlayerName, setNewPlayerName] = useState('');
  const [error, setError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // Update editedRoster when the roster prop changes
  useEffect(() => {
    if (roster) {
      setEditedRoster({
        name: roster.name,
        players: roster.players,
        isPublic: roster.isPublic
      });
    }
  }, [roster]);

  if (!isOpen) return null;

  const handleAddPlayer = () => {
    if (!newPlayerName.trim()) {
      setError('Player name cannot be empty');
      return;
    }

    if (editedRoster.players.some(p => p.name.toLowerCase() === newPlayerName.toLowerCase())) {
      setError('Player already exists in roster');
      return;
    }

    setEditedRoster(prev => ({
      ...prev,
      players: [
        ...prev.players,
        {
          id: Date.now(),
          name: newPlayerName.trim(),
          addedAt: new Date().toISOString()
        }
      ]
    }));
    setNewPlayerName('');
    setError('');
  };

  const handleRemovePlayer = (playerId) => {
    setEditedRoster(prev => ({
      ...prev,
      players: prev.players.filter(p => p.id !== playerId)
    }));
  };

  const handleSave = async () => {
    if (!editedRoster.name.trim()) {
      setError('Roster name is required');
      return;
    }

    if (editedRoster.players.length < 5) {
      setError('Roster must have at least 5 players');
      return;
    }

    try {
      setIsSaving(true);
      const rosterRef = doc(db, 'rosters', roster.id);
      await updateDoc(rosterRef, {
        ...editedRoster,
        updatedAt: serverTimestamp()
      });
      
      onUpdate(editedRoster);
      onClose();
    } catch (err) {
      setError('Failed to update roster');
      console.error('Error updating roster:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold">Edit Roster</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Roster Name
            </label>
            <input
              type="text"
              value={editedRoster.name}
              onChange={e => setEditedRoster(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter roster name"
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={editedRoster.isPublic}
                onChange={e => setEditedRoster(prev => ({ ...prev, isPublic: e.target.checked }))}
                className="rounded text-blue-600"
              />
              <span>Make this roster public</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Players
            </label>
            <div className="flex space-x-2 mb-4">
              <input
                type="text"
                value={newPlayerName}
                onChange={e => setNewPlayerName(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter player name"
                onKeyPress={e => e.key === 'Enter' && handleAddPlayer()}
              />
              <button
                onClick={handleAddPlayer}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Add
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto border rounded-md">
              {editedRoster.players.map(player => (
                <div
                  key={player.id}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 border-b last:border-b-0"
                >
                  <span>{player.name}</span>
                  <button
                    onClick={() => handleRemovePlayer(player.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              {editedRoster.players.length === 0 && (
                <div className="p-4 text-center text-gray-500 italic">
                  No players added yet
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t bg-gray-50 rounded-b-lg">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
          >
            <Save size={20} className="mr-2" />
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRosterModal;