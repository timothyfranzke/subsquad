import { User } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="py-16">
            <div className="flex items-center space-x-2 text-2xl font-bold text-blue-600 justify-center">
              <User size={32} className="text-orange-500" />
              <span>Sub<span className="text-orange-500">Squad</span></span>
            </div>
            
            {/* Navigation Links */}
            <nav className="mt-10 text-sm" aria-label="quick links">
              <div className="-my-1 flex justify-center gap-x-6">
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#features">
                  Features
                </a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#benefits">
                  Benefits
                </a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#pricing">
                  Pricing
                </a>
                <a className="inline-block rounded-lg px-2 py-1 text-sm text-slate-700 hover:bg-slate-100 hover:text-slate-900" href="#faq">
                  FAQ
                </a>
              </div>
            </nav>
  
            {/* Contact Information */}
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-slate-900">Contact Us</h3>
                <a href="mailto:support@subsquad.com" className="mt-2 text-sm text-slate-600 hover:text-blue-600">
                  support@subsquad.com
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-slate-900">Sales</h3>
                <a href="mailto:sales@subsquad.com" className="mt-2 text-sm text-slate-600 hover:text-blue-600">
                  sales@subsquad.com
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-slate-900">Phone</h3>
                <a href="tel:+1-555-123-4567" className="mt-2 text-sm text-slate-600 hover:text-blue-600">
                  (555) 123-4567
                </a>
              </div>
              
              <div className="flex flex-col items-center">
                <h3 className="text-sm font-semibold text-slate-900">Address</h3>
                <p className="mt-2 text-sm text-slate-600">
                  123 Game Street<br />
                  Sports City, SC 12345
                </p>
              </div>
            </div>
          </div>
  
          {/* Copyright and Social Links */}
          <div className="flex flex-col items-center border-t border-slate-400/10 py-10 sm:flex-row sm:justify-between">
            <div className="flex gap-x-6">
              <a href="https://twitter.com/subsquad" className="text-slate-500 hover:text-slate-900">
                Twitter
              </a>
              <a href="https://facebook.com/subsquad" className="text-slate-500 hover:text-slate-900">
                Facebook
              </a>
              <a href="https://instagram.com/subsquad" className="text-slate-500 hover:text-slate-900">
                Instagram
              </a>
            </div>
            <p className="mt-6 text-sm text-slate-500 sm:mt-0">
              Copyright © {new Date().getFullYear()} SubSquad. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;