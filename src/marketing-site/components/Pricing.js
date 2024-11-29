import React from 'react';
import { Award, Timer, Users, Share2, History } from 'lucide-react';

const Pricing = () => {
  return (
    <section id="pricing" className="bg-slate-900 py-20 sm:py-32 relative">
      {/* Beta Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm bg-slate-900/30 z-10 flex items-center justify-center">
        <div className="bg-blue-600 text-white px-8 py-4 rounded-full transform rotate-12 shadow-xl border-4 border-white text-2xl font-bold">
          Free While in Beta!
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <div className="md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            <span className="relative whitespace-nowrap">
              <svg
                aria-hidden="true"
                viewBox="0 0 281 40"
                preserveAspectRatio="none"
                className="absolute left-0 top-1/2 h-[1em] w-full fill-blue-400"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M240.172 22.994c-8.007 1.246-15.477 2.23-31.26 4.114-18.506 2.21-26.323 2.977-34.487 3.386-2.971.149-3.727.324-6.566 1.523-15.124 6.388-43.775 9.404-69.425 7.31-26.207-2.14-50.986-7.103-78-15.624C10.912 20.7.988 16.143.734 14.657c-.066-.381.043-.344 1.324.456 10.423 6.506 49.649 16.322 77.8 19.468 23.708 2.65 38.249 2.95 55.821 1.156 9.407-.962 24.451-3.773 25.101-4.692.074-.104.053-.155-.058-.135-1.062.195-13.863-.271-18.848-.687-16.681-1.389-28.722-4.345-38.142-9.364-15.294-8.15-7.298-19.232 14.802-20.514 16.095-.934 32.793 1.517 47.423 6.96 13.524 5.033 17.942 12.326 11.463 18.922l-.859.874.697-.006c2.681-.026 15.304-1.302 29.208-2.953 25.845-3.07 35.659-4.519 54.027-7.978 9.863-1.858 11.021-2.048 13.055-2.145a61.901 61.901 0 0 0 4.506-.417c1.891-.259 2.151-.267 1.543-.047-.402.145-2.33.913-4.285 1.707-4.635 1.882-5.202 2.07-8.736 2.903-3.414.805-19.773 3.797-26.404 4.829Z"
                />
              </svg>
              <span className="relative">Simple pricing,</span>
            </span>{" "}
            for every team.
          </h2>
        </div>

        <div className="-mx-4 mt-16 grid max-w-2xl grid-cols-1 gap-y-10 sm:mx-auto lg:-mx-8 lg:max-w-none lg:grid-cols-3 xl:mx-0 xl:gap-x-8">
          {/* Free Tier */}
          <section className="flex flex-col rounded-3xl px-6 sm:px-8 lg:py-8">
            <h3 className="mt-5 font-display text-lg text-white">Free</h3>
            <p className="mt-2 text-base text-slate-400">
              Perfect for trying out SubSquad with basic features to manage
              a single roster and game.
            </p>
            <p className="order-first font-display text-5xl font-light tracking-tight text-white">
              $0
            </p>
            <ul
              role="list"
              className="order-last mt-10 flex flex-col gap-y-3 text-sm text-slate-200"
            >
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
            <a
              className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white mt-8"
              href="/register"
            >
              Get started
            </a>
          </section>

          {/* Team Tier */}
          <section className="flex flex-col rounded-3xl px-6 sm:px-8 order-first bg-blue-600 py-8 lg:order-none">
            <h3 className="mt-5 font-display text-lg text-white">Team</h3>
            <p className="mt-2 text-base text-white">
              Unlock advanced features like multiple rosters, concurrent
              games, and team collaboration.
            </p>
            <p className="order-first font-display text-5xl font-light tracking-tight text-white">
              $10
            </p>
            <ul
              role="list"
              className="order-last mt-10 flex flex-col gap-y-3 text-sm text-white"
            >
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
            <a
              className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-white text-slate-900 hover:bg-blue-50 active:bg-blue-200 active:text-slate-600 focus-visible:outline-white mt-8"
              href="/register"
            >
              Get started
            </a>
          </section>

          {/* Organization Tier */}
          <section className="flex flex-col rounded-3xl px-6 sm:px-8 lg:py-8">
            <h3 className="mt-5 font-display text-lg text-white">
              Organization
            </h3>
            <p className="mt-2 text-base text-slate-400">
              Custom solutions for leagues and sports organizations. Contact
              us for a tailored package.
            </p>
            <p className="order-first font-display text-5xl font-light tracking-tight text-white">
              Contact us
            </p>
            <ul
              role="list"
              className="order-last mt-10 flex flex-col gap-y-3 text-sm text-slate-200"
            >
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
            <a
              className="group inline-flex ring-1 items-center justify-center rounded-full py-2 px-4 text-sm focus:outline-none ring-slate-700 text-white hover:ring-slate-500 active:ring-slate-700 active:text-slate-400 focus-visible:outline-white mt-8"
              href="/contact"
            >
              Contact sales
            </a>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Pricing;