import React from "react";
import {
  User,
  Users,
  Timer,
  History,
  Share2,
  Award,
  CheckCircle,
} from "lucide-react";
import Footer from "./components/Footer";
import Pricing from "./components/Pricing";
import HeroSection from "./components/Hero";
import FeatureScreenshots from "./components/Features";
import FeaturesSection from "./components/Features";
import FeatureNoScreenshots from "./components/FeatureNoPhotos";

const Marketing = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Hero Section */}
      <header className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="relative z-50 flex justify-between">
            <div className="flex items-center md:gap-x-12">
              <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600">
                <Users size={32} className="text-orange-500" />
                <span>
                  Sub<span className="text-orange-500">Squad</span>
                </span>
              </div>
              <div className="hidden md:flex md:gap-x-6">
                <a
                  className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="#features"
                >
                  Features
                </a>
                <a
                  className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="#benefits"
                >
                  Benefits
                </a>
                <a
                  className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                  href="#pricing"
                >
                  Pricing
                </a>
              </div>
            </div>
            <div className="flex items-center gap-x-5 md:gap-x-8">
              <a
                className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                href="/login"
              >
                Sign in
              </a>
              <a
                className="group inline-flex items-center justify-center rounded-full py-2 px-4 text-sm font-semibold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 bg-blue-600 text-white hover:text-slate-100 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 focus-visible:outline-blue-600"
                href="/register"
              >
                Start now
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Content */}
        <HeroSection />

        

        {/* Features Section */}
        <FeatureNoScreenshots />

        {/* Benefits Section */}
        <section id="benefits" className="bg-white py-20 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl md:mx-auto md:text-center xl:max-w-none mb-16">
              <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
                Why Choose SubSquad?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* For Coaches */}
              <div className="bg-slate-50 rounded-xl p-6">
                <Users className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">
                  For Coaches
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Simplify game management and focus more on coaching rather
                  than administrative tasks.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Streamlined substitution management
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Real-time player tracking
                  </li>
                </ul>
              </div>

              {/* For Players */}
              <div className="bg-slate-50 rounded-xl p-6">
                <Award className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">
                  For Players
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Promote fair play by ensuring everyone gets equal
                  opportunities to participate, boosting team morale.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Equal playing opportunities
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Balanced rest periods
                  </li>
                </ul>
              </div>

              {/* For Parents */}
              <div className="bg-slate-50 rounded-xl p-6">
                <User className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-slate-900">
                  For Parents
                </h3>
                <p className="mt-2 text-sm text-slate-600">
                  Gain peace of mind knowing that your child is receiving fair
                  playtime and opportunities for development.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Transparent playing time tracking
                  </li>
                  <li className="flex items-center text-sm text-slate-600">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    Fair participation monitoring
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <Pricing />
        {/* FAQ Section */}
        <section
          id="faq"
          className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2
                id="faq-title"
                className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
              >
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg tracking-tight text-slate-700">
                If you can't find what you're looking for, reach out to our
                support team.
              </p>
            </div>
            <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
              <div>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      How does SubSquad track player time?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Our intuitive interface allows you to track active and
                      bench times in real-time. Simply tap to substitute players
                      in and out, and SubSquad handles the rest.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Can I share rosters with assistant coaches?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Team and Organization plans allow you to share rosters and
                      game management with other coaches and team staff.
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      What sports does SubSquad support?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      SubSquad works for any sport with active substitutions.
                      Currently optimized for soccer, basketball, and similar
                      team sports.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Is SubSquad still in development?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Yes, SubSquad is currently in beta. We're actively adding
                      features and improvements based on coach feedback.
                    </p>
                  </li>
                </ul>
              </div>
              <div>
                <ul role="list" className="flex flex-col gap-y-8">
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      Can I export playing time reports?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Team and Organization plans include detailed analytics and
                      exportable reports for sharing with parents and league
                      officials.
                    </p>
                  </li>
                  <li>
                    <h3 className="font-display text-lg leading-7 text-slate-900">
                      What happens after the beta period?
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">
                      Early adopters who sign up during beta will keep their
                      current pricing and features after the full release.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Marketing;
