import React from 'react';
import { ArrowDownUp, CircleDot, Circle } from 'lucide-react';

const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const SubHistoryMatrix = ({ swapHistory, roster, activePlayers, sectionSwaps = {}, totalActiveTimes, sectionTimes = [] }) => {
  if (swapHistory.length === 0) return null;

  const sections = swapHistory.map((swap, index) => ({
    name: `Section ${index + 1}`,
    time: formatTime(sectionTimes[index] || 0)
  }));

  const getActivityIcon = (playerId, sectionIndex) => {
    const section = swapHistory[sectionIndex];
    const sectionSwapInfo = sectionSwaps[sectionIndex] || [];
    
    const swapInfo = sectionSwapInfo.find(swap => 
      swap.in === playerId || swap.out === playerId
    );

    if (swapInfo) {
      return (
        <div className="flex items-center justify-center">
          {swapInfo.in === playerId ? (
            <div className="flex flex-col items-center">
              <Circle size={16} className="text-green-500" />
              <span className="text-xs">in</span>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Circle size={16} className="text-red-500" />
              <span className="text-xs">out</span>
            </div>
          )}
        </div>
      );
    }

    if (section.includes(playerId)) {
      return <CircleDot size={16} className="text-green-600" />;
    }

    return <Circle size={16} className="text-gray-300" />;
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="p-3 text-left">Player</th>
            {sections.map((section, index) => (
              <th key={index} className="p-3 text-center">
                <div className="flex flex-col items-center">
                  <span className="font-bold">{section.name}</span>
                  <span className="text-xs font-normal opacity-90">
                    {section.time}
                  </span>
                </div>
              </th>
            ))}
            <th className="p-3 text-center">Current Status</th>
          </tr>
        </thead>
        <tbody>
          {roster
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(player => (
            <tr key={player.id} className={activePlayers.includes(player.id) ? 'bg-green-50' : ''}>
              <td className="border-t p-3">
                <div className="font-semibold">{player.name}</div>
                <div className="text-sm text-gray-500">
                  Total: {formatTime(totalActiveTimes[player.id] || 0)}
                </div>
              </td>
              {swapHistory.map((swap, index) => (
                <td key={index} className="border-t p-3">
                  <div className="flex justify-center">
                    {getActivityIcon(player.id, index)}
                  </div>
                </td>
              ))}
              <td className="border-t p-3 text-center">
                {activePlayers.includes(player.id) ? (
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-sm">
                    Active
                  </span>
                ) : (
                  <span className="bg-gray-300 text-gray-700 px-2 py-1 rounded-full text-sm">
                    Benched
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubHistoryMatrix;