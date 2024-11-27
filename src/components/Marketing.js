import React from 'react';
import { User, Users, Timer, History, Share2, Award } from 'lucide-react';

const Marketing = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Hero Section */}
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
              <div class="flex items-center space-x-2 text-2xl font-bold text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-users text-orange-500"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg><span>Sub<span class="text-orange-500">Squad</span></span></div>
              </div>
              <div className="hidden md:flex md:gap-x-6">
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#features">Features</a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">Pricing</a>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="/login">Sign in</a>
              <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600" href="/register">
                Start now
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16 pt-20 text-center lg:pt-32">
          <div className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-blue-100 text-blue-600 mb-8">
            Beta Release
          </div>
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl">
            Fair Play
            <span className="relative whitespace-nowrap text-blue-600">
              <svg aria-hidden="true" viewBox="0 0 418 42" className="absolute left-0 top-2/3 h-[0.58em] w-full fill-orange-300/70" preserveAspectRatio="none">
              <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
              </svg>
              <span className="relative">Made Simple</span>
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700">
            Ensure every player gets fair playing time and adequate rest. Track active times, manage substitutions, and keep youth sports focused on development and fun.
          </p>
          <div className="mt-10 flex justify-center gap-x-6">
            <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-slate-900 text-white hover:bg-slate-700 hover:text-slate-100 active:bg-slate-800 active:text-slate-300 focus-visible:outline-slate-900" href="/register">
              Get started for free
            </a>
            <a className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-200 text-slate-700 hover:text-slate-900 hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300" href="#features">
              <span>Learn more</span>
            </a>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="relative overflow-hidden bg-blue-600 pb-28 pt-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl md:text-5xl">
                Everything you need to manage fair play.
              </h2>
              <p className="mt-6 text-lg tracking-tight text-blue-100">
                Simple tools to ensure every player gets their fair share of game time.
              </p>
            </div>
            <div className="mt-16 grid grid-cols-1 items-center gap-y-2 pt-10 sm:gap-y-6 md:mt-20 lg:grid-cols-12 lg:pt-0">
              <div className="lg:col-span-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="bg-white/10 rounded-xl p-6">
                    <Timer className="h-8 w-8 text-white mb-4" />
                    <h3 className="text-lg font-semibold text-white">Active Time Tracking</h3>
                    <p className="mt-2 text-sm text-blue-100">
                      Monitor each player's active game time and rest periods in real-time.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <History className="h-8 w-8 text-white mb-4" />
                    <h3 className="text-lg font-semibold text-white">Substitution Management</h3>
                    <p className="mt-2 text-sm text-blue-100">
                      Easily manage player rotations with intelligent substitution suggestions.
                    </p>
                  </div>
                  <div className="bg-white/10 rounded-xl p-6">
                    <Share2 className="h-8 w-8 text-white mb-4" />
                    <h3 className="text-lg font-semibold text-white">Team Sharing</h3>
                    <p className="mt-2 text-sm text-blue-100">
                      Share rosters and game stats with other coaches and team managers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="bg-slate-900 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="md:text-center">
              <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
                <span className="relative whitespace-nowrap">
                  <svg aria-hidden="true" viewBox="0 0 281 40" preserveAspectRatio="none" className="absolute left-0 top-1/2 h-[1em] w-full fill-blue-400">
                    <path fillRule="evenodd" clipRule="evenodd" d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Z" />
                  </svg>
                  <span className="relative">Simple pricing,</span>
                </span> for every team.
              </h2>
            </div>

            <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
              {/* Free Tier */}
              <section className="flex flex-col rounded-3xl px-6 sm:px-8 lg:py-8">
                <h3 className="mt-5 font-display text-lg text-white">Free</h3>
                <p className="mt-2 text-base text-slate-400">Perfect for trying out SubSquad.</p>
                <p className="order-first font-display text-5xl font-light tracking-tight text-white">$0</p>
                <ul role="list" className="order-last mt-10 flex flex-col gap-y-3 text-sm text-slate-200">
                  <li className="flex">
                    <Award className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">1 active roster</span>
                  </li>
                  <li className="flex">
                    <Timer className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">1 active game at a time</span>
                  </li>
                  <li className="flex">
                    <Users className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">Basic substitution tracking</span>
                  </li>
                </ul>
                <a className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white mt-8" href="/register">
                  Get started
                </a>
              </section>

              {/* Team Tier */}
              <section className="flex flex-col rounded-3xl px-6 sm:px-8 order-first bg-blue-600 py-8 lg:order-none">
                <h3 className="mt-5 font-display text-lg text-white">Team</h3>
                <p className="mt-2 text-base text-white">For serious youth sports programs.</p>
                <p className="order-first font-display text-5xl font-light tracking-tight text-white">$10</p>
                <ul role="list" className="order-last mt-10 flex flex-col gap-y-3 text-sm text-white">
                  <li className="flex">
                    <Award className="h-6 w-6 flex-none text-white" />
                    <span className="ml-4">Unlimited rosters</span>
                  </li>
                  <li className="flex">
                    <Timer className="h-6 w-6 flex-none text-white" />
                    <span className="ml-4">Multiple concurrent games</span>
                  </li>
                  <li className="flex">
                    <Share2 className="h-6 w-6 flex-none text-white" />
                    <span className="ml-4">Share rosters with other coaches</span>
                  </li>
                  <li className="flex">
                    <History className="h-6 w-6 flex-none text-white" />
                    <span className="ml-4">Game history and analytics</span>
                  </li>
                  <li className="flex">
                    <Users className="h-6 w-6 flex-none text-white" />
                    <span className="ml-4">Advanced substitution suggestions</span>
                  </li>
                </ul>
                <a className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mt-8" href="/register">
                  Get started
                </a>
              </section>

              {/* Organization Tier */}
              <section className="flex flex-col rounded-3xl px-6 sm:px-8 lg:py-8">
                <h3 className="mt-5 font-display text-lg text-white">Organization</h3>
                <p className="mt-2 text-base text-slate-400">For leagues and sports organizations.</p>
                <p className="order-first font-display text-5xl font-light tracking-tight text-white">Contact us</p>
                <ul role="list" className="order-last mt-10 flex flex-col gap-y-3 text-sm text-slate-200">
                  <li className="flex">
                    <Award className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">Everything in Team plan</span>
                  </li>
                  <li className="flex">
                    <Users className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">League-wide management</span>
                  </li>
                  <li className="flex">
                    <Share2 className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">Organization-wide analytics</span>
                  </li>
                  <li className="flex">
                    <Timer className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">Custom rules and settings</span>
                  </li>
                  <li className="flex">
                    <Award className="h-6 w-6 flex-none text-slate-400" />
                    <span className="ml-4">Priority support</span>
                  </li>
                </ul>
                <a className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white mt-8" href="/contact">
                  Contact sales
                </a>
              </section>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" aria-labelledby="faq-title" className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 id="faq-title" className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                If you can't find what you're looking for, reach out to our support team.
              </p>
            </div>
            <ul role="list" className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              <li>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      How does SubSquad track player time?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Our simple interface lets you track active players in real-time. Just tap to sub players in and out, and we'll handle all the calculations.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Can I share rosters with assistant coaches?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Team and Organization plans allow you to share rosters and game management with other coaches and team staff.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Is SubSquad still in development?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Yes, SubSquad is currently in beta. We're actively adding features and improvements based on coach feedback.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      What sports does SubSquad support?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      SubSquad works for any sport with active substitutions. Currently optimized for soccer, basketball, and similar team sports.
                    </p>
                  </li>
                </ul>
              </li>
              <li>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Can I export playing time reports?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Team and Organization plans include detailed analytics and exportable reports for sharing with parents and league officials.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      What happens after the beta period?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Early adopters who sign up during beta will keep their current pricing and features after the full release.
                    </p>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600 justify-center">
              <User size={32} className="text-orange-500" />
              <span>Sub<span className="text-orange-500">Squad</span></span>
            </div>
            <nav className="mt-10 text-sm" aria-label="quick links">
              <div className="-my-1 flex justify-center gap-x-6">
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#features">Features</a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">Pricing</a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#faq">FAQ</a>
              </div>
            </nav>
          </div>
          <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row-reverse sm:justify-between">
            <p className="mt-6 text-sm text-slate-500 sm:mt-0">
              Copyright © {new Date().getFullYear()} SubSquad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Marketing;