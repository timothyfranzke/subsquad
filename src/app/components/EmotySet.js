import React from 'react';
import { PlayCircle, Users } from 'lucide-react';

const EmptyState = ({ onStartGame }) => {
  return (
    <div className="text-center bg-white rounded-lg shadow-md p-8 mt-4">
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
          <Users className="w-8 h-8 text-blue-600" />
        </div>
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900">No games yet</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto">
        Start tracking your team's play time and managing substitutions by creating your first game.
      </p>
      
      <div className="mt-6">
        <button
          onClick={onStartGame}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlayCircle className="w-5 h-5 mr-2" />
          Create First Game
        </button>
      </div>
    </div>
  );
};

export default EmptyState;