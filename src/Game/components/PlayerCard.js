import { Play, Pause, RotateCcw, User, CircleDot, Circle } from 'lucide-react';

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const PlayerCard = ({ 
    player, 
    onCourt, 
    currentTime, 
    totalActiveTime, 
    totalBenchedTime, 
    onSelect, 
    isSelected, 
    onDragStart, 
    onDragOver, 
    onDrop, 
    isGameInProgress,
    swapHistory = [] // Add this prop
}) => {
    const getStatusStyle = () => {
        if (onCourt) {
            return 'bg-green-100 border-green-500';
        }
        return 'bg-yellow-100 border-yellow-500';
    };

    const renderSectionIndicators = () => {
        return (
            <div className="flex space-x-1 mt-2">
                {swapHistory.map((sectionPlayers, index) => {
                    const wasActive = sectionPlayers.includes(player.id);
                    return (
                        <div key={index} className="flex items-center">
                            {wasActive ? (
                                <CircleDot size={16} className="text-green-600" />
                            ) : (
                                <Circle size={16} className="text-gray-300" />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div
            className={`rounded-lg p-2 shadow-md ${getStatusStyle()} ${isSelected ? 'ring-2 ring-blue-500' : ''} ${!isGameInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => isGameInProgress && onSelect(player.id)}
            draggable={isGameInProgress && !onCourt}
            onDragStart={(e) => isGameInProgress && onDragStart(e, player.id)}
            onDragOver={(e) => isGameInProgress && onDragOver(e)}
            onDrop={(e) => isGameInProgress && onDrop(e, player.id)}
        >
            <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold flex items-center">
                    <User className={`mr-1 ${onCourt ? 'text-green-700' : 'text-gray-500'}`} size={16} />
                    {player.name}
                </h3>
                <span className="text-xs font-semibold">
                    {onCourt ? 'On Court' : 'Benched'}
                </span>
            </div>
            <p className="text-xs font-semibold text-blue-700">
                Current: {formatTime(currentTime)}
            </p>
            <p className="text-xs">
                Total Active: {formatTime(totalActiveTime)}
            </p>
            <p className="text-xs">
                Total Benched: {formatTime(totalBenchedTime)}
            </p>
            {renderSectionIndicators()}
        </div>
    );
};

export default PlayerCard;