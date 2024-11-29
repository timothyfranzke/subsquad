import React, { useState } from 'react';
import { Timer, History, User, Users, Award, Share2 } from 'lucide-react';

const IntroductionSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      title: "Real-Time Player Tracking",
      description: "Track every player's active and bench time with precision. Get instant insights into player rotations and fair play metrics.",
      icon: Timer,
      screen: {
        title: "Player Tracking",
        subtitle: "Active Time",
        content: (
          <div className="px-4 py-6">
            <div className="space-y-4">
              {[
                { name: "John Smith", time: "12:45", status: "Active", change: "+2:30" },
                { name: "Sarah Wilson", time: "10:15", status: "Benched", change: "-1:45" },
                { name: "Mike Johnson", time: "15:30", status: "Active", change: "+3:15" }
              ].map((player, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <User className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{player.name}</div>
                      <div className="text-sm text-gray-500">{player.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-medium ${
                      player.status === 'Active' ? 'text-green-600' : 'text-gray-600'
                    }`}>
                      {player.status}
                    </div>
                    <div className={`text-sm ${
                      player.change.startsWith('+') ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {player.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    },
    {
      title: "Smart Substitution Management",
      description: "Optimize your player rotations with our intelligent substitution system. Get recommendations based on play time and team strategy.",
      icon: History,
      screen: {
        title: "Substitutions",
        subtitle: "Current Rotation",
        content: (
          <div className="px-4 py-6">
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-sm font-medium text-blue-800">Recommended Swap</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-blue-600" />
                    <span className="text-sm text-blue-800">Mike → Sarah</span>
                  </div>
                  <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                    Apply
                  </button>
                </div>
              </div>
              {[
                { title: "Last Substitution", time: "2 mins ago", players: "John ↔ Mike" },
                { title: "Next Due", time: "In 3 mins", players: "Sarah ↔ Alex" },
              ].map((item, index) => (
                <div key={index} className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <div className="font-medium text-gray-900">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.players}</div>
                  </div>
                  <div className="text-sm text-gray-500">{item.time}</div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    },
    {
      title: "Team Collaboration",
      description: "Share rosters and substitution plans with assistant coaches and team staff. Keep everyone on the same page.",
      icon: Share2,
      screen: {
        title: "Team Access",
        subtitle: "Shared Rosters",
        content: (
          <div className="px-4 py-6">
            <div className="space-y-4">
              {[
                { name: "Varsity Team", shared: 3, access: "Full Access" },
                { name: "JV Squad", shared: 2, access: "View Only" },
                { name: "Training Group", shared: 4, access: "Full Access" }
              ].map((team, index) => (
                <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <div>
                    <div className="font-medium text-gray-900">{team.name}</div>
                    <div className="text-sm text-gray-500">
                      Shared with {team.shared} coaches
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className={`px-2 py-1 rounded ${
                      team.access === 'Full Access' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {team.access}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    }
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-16">
<p className="mx-auto mt-6 max-w-3xl text-lg tracking-tight text-slate-700 text-center">
  SubSquad is a user-friendly app designed to simplify substitution
  management for youth sports coaches. Easily track each player's
  active and bench time, visualize substitutions with our intuitive
  matrix, and ensure fair play for all team members.
</p>
</div>
  );
};

export default IntroductionSection;