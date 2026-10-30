import { Link } from 'react-router';
import { Car, MapPin, Phone, Mail, Globe, AtSign, Camera, Play } from 'lucide-react';
import { DEALERSHIP } from '../data/constants';

export default function Footer() {
  return (
    <footer className="bg-[#101828] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#e0292f] rounded-md p-1.5 flex">
              <Car size={20} color="white" />
            </span>
            <span className="text-lg font-extrabold text-white">
              AUTO<span className="text-[#e0292f]">DEAL</span>
            </span>
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Springfieldâ€™s most trusted dealership since 2008. Over 12,000 happy customers, transparent
            pricing, and a 150-point inspection on every vehicle we sell.
          </p>
          <div className="flex gap-3 mt-5">
            {[Globe, AtSign, Camera, Play].map((Icon, i) => (
              <span key={i} className="bg-white/10 hover:bg-[#e0292f] transition-colors rounded-full p-2 cursor-pointer">
                <Icon size={16} />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm list-none p-0 m-0">
            {[
              ['Home', '/'],
              ['Browse Inventory', '/inventory'],
              ['About Us', '/about'],
              ['Contact', '/contact'],
              ['My Account', '/profile'],
            ].map(([label, to]) => (
              <li key={to}>
                <Link to={to} className="text-gray-400 hover:text-[#e0292f] transition-colors no-underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm list-none p-0 m-0 text-gray-400">
            <li className="flex gap-2.5"><MapPin size={16} className="shrink-0 mt-0.5 text-[#e0292f]" /> {DEALERSHIP.address}</li>
            <li className="flex gap-2.5 items-center"><Phone size={16} className="text-[#e0292f]" /> {DEALERSHIP.phone}</li>
            <li className="flex gap-2.5 items-center"><Mail size={16} className="text-[#e0292f]" /> {DEALERSHIP.email}</li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Business Hours</h4>
          <ul className="space-y-2.5 text-sm list-none p-0 m-0 text-gray-400">
            {DEALERSHIP.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-gray-200">{h.hours}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 text-xs text-gray-500 flex flex-col sm:flex-row justify-between gap-2">
          <span>Â© 2026 AutoDeal Motors. All rights reserved. Demo site with mock data.</span>
          <span>Privacy Policy Â· Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
