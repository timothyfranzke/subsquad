import React from 'react';
import { Play, Check, Loader, Clock } from 'lucide-react';

const GameStatus = ({ gameState }) => {
  const getStatusConfig = () => {
    switch (gameState) {
      case 'not_started':
        return {
          icon: Clock,
          text: 'Not Started',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-500'
        };
      case 'in_progress':
        return {
          icon: Play,
          text: 'In Progress',
          bgColor: 'bg-green-100',
          textColor: 'text-green-700',
          iconColor: 'text-green-500'
        };
      case 'ended':
        return {
          icon: Check,
          text: 'Completed',
          bgColor: 'bg-blue-100',
          textColor: 'text-blue-700',
          iconColor: 'text-blue-500'
        };
      default:
        return {
          icon: Loader,
          text: 'Unknown',
          bgColor: 'bg-gray-100',
          textColor: 'text-gray-700',
          iconColor: 'text-gray-500'
        };
    }
  };

  const { icon: StatusIcon, text, bgColor, textColor, iconColor } = getStatusConfig();

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${bgColor} ${textColor} w-fit`}>
      <StatusIcon size={16} className={iconColor} />
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default GameStatus;