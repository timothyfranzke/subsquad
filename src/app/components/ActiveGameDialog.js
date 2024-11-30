import React from 'react';
import { AlertCircle } from 'lucide-react';

const ActiveGamesDialog = ({ isOpen, onClose, activeGamesCount, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex items-start mb-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-yellow-500" />
          </div>
          <div className="ml-3">
            <h3 className="text-lg font-medium text-gray-900">Active Games Found</h3>
            <p className="mt-2 text-sm text-gray-500">
              You have {activeGamesCount} active {activeGamesCount === 1 ? 'game' : 'games'}. Would you like to end {activeGamesCount === 1 ? 'it' : 'them'} before starting a new game?
            </p>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            No, Continue Anyway
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Yes, End {activeGamesCount === 1 ? 'Game' : 'Games'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveGamesDialog;