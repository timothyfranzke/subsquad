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
                <a href="tel:+1-913-522-9401" className="mt-2 text-sm text-slate-600 hover:text-blue-600">
                  (913) 522-9401
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;