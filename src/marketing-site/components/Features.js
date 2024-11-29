import React, { useState } from 'react';
import { Timer, History, User, Users, Award, Share2 } from 'lucide-react';

const FeaturesSection = () => {
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
    <section className="relative overflow-hidden bg-blue-600 py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-12 items-center gap-8 lg:gap-16 xl:gap-24">
          <div className="relative z-10 order-last col-span-6 space-y-6" role="tablist">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`relative rounded-2xl transition-colors hover:bg-gray-800/30 cursor-pointer ${
                  activeTab === index ? 'bg-gray-800' : ''
                }`}
                onClick={() => setActiveTab(index)}
                role="tab"
              >
                <div className="relative z-10 p-8">
                  <feature.icon className="h-8 w-8 text-gray-100" />
                  <h3 className="mt-6 text-lg font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative col-span-6">
            <div className="relative aspect-[366/729] mx-auto w-full max-w-[366px]">
              <div className="absolute inset-y-[calc(1/729*100%)] left-[calc(7/729*100%)] right-[calc(5/729*100%)] rounded-[calc(58/366*100%)/calc(58/729*100%)] bg-gray-800 shadow-2xl" />
              <div className="absolute left-[calc(23/366*100%)] top-[calc(23/729*100%)] grid h-[calc(686/729*100%)] w-[calc(318/366*100%)] transform overflow-hidden bg-gray-900 pt-[calc(23/318*100%)]">
                <div className="flex flex-col w-full">
                  <div className="flex justify-between px-4 pt-4">
                    <Users className="h-6 w-6 text-white" />
                    <div className="h-6 text-white font-semibold">SubSquad</div>
                    <User className="h-6 w-6 text-white" />
                  </div>

                  <div className="mt-6 px-4 text-white">
                    <div className="text-2xl text-white">{features[activeTab].screen.title}</div>
                    <div className="text-sm text-gray-500">{features[activeTab].screen.subtitle}</div>
                  </div>

                  <div className="mt-6 flex-auto rounded-t-2xl bg-white">
                    {features[activeTab].screen.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;