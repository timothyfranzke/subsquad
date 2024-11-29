import React from 'react';
import { History, Monitor, Share2, Smartphone, Timer } from 'lucide-react';

// Import at the top of Marketing.js, then add this component
const FeatureNoScreenshots = () => {
  return (
    <section
          id="features"
          className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                Everything you need to manage fair play.
              </h2>
              <p className="mt-6 text-lg tracking-tight text-blue-100">
                Simple tools to ensure every player gets their fair share of
                game time.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
              <div className="lg:col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {/* Feature 1: Real-Time Tracking */}
                  <div className="bg-white/10 rounded-xl p-6">
                    <Timer className="h-8 w-8 text-white mb-4" />
                    <h3 className="text-lg font-semibold text-white">
                      Real-Time Active Time Tracking
                    </h3>
                    <p className="mt-2 text-sm text-blue-100">
                      Keep track of how long each player has been on the field
                      and on the bench with real-time updates, ensuring balanced
                      playtime for everyone.
                    </p>
                  </div>

                  {/* Feature 2: Substitution Management */}
                  <div className="bg-white/10 rounded-xl p-6">
                    <History className="h-8 w-8 text-white mb-4" />
                    <h3 className="text-lg font-semibold text-white">
                      Smart Substitution Management
                    </h3>
                    <p className="mt-2 text-sm text-blue-100">
                      Simplify player rotations with our intuitive substitution
                      matrix and receive smart suggestions based on playtime and
                      team strategy.
                    </p>
                  </div>

                  {/* Feature 3: Team Sharing */}
                  <div className="bg-white/10 rounded-xl p-6">
                    <Share2 className="h-8 w-8 text-white mb-4" />
                    <h3 className="text-lg font-semibold text-white">
                      Team Collaboration
                    </h3>
                    <p className="mt-2 text-sm text-blue-100">
                      Collaborate effortlessly by sharing rosters and
                      substitution plans with assistant coaches and team staff.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
};

export default FeatureNoScreenshots;