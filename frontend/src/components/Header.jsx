import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router';
import { Drawer, Dropdown, Avatar, Badge } from 'antd';
import { Car, Menu, Phone, Heart, User, LayoutDashboard, LogOut, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DEALERSHIP } from '../data/constants';

const NAV = [
  { to: '/', label: 'Home' },
  { to: '/inventory', label: 'Inventory' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
];

export default function Header() {
  const { currentUser, logout } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const userMenu = {
    items: [
      { key: 'profile', icon: <User size={15} />, label: 'My Account' },
      ...(currentUser?.role === 'admin'
        ? [{ key: 'admin', icon: <LayoutDashboard size={15} />, label: 'Admin Dashboard' }]
        : []),
      { type: 'divider' },
      { key: 'logout', icon: <LogOut size={15} />, label: 'Sign Out', danger: true },
    ],
    onClick: ({ key }) => {
      if (key === 'profile') navigate('/profile');
      if (key === 'admin') navigate('/admin');
      if (key === 'logout') {
        logout();
        navigate('/');
      }
    },
  };

  const navLinkClass = ({ isActive }) =>
    `font-semibold uppercase text-[13px] tracking-wide transition-colors ${
      isActive ? 'text-[#e0292f]' : 'text-white hover:text-[#e0292f]'
    }`;

  return (
    <header className="sticky top-0 z-50 shadow-lg">
      {/* Top bar */}
      <div className="bg-[#e0292f] text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 py-1.5 flex items-center justify-between">
          <span className="hidden sm:block">Summer Sales Event â€” 0.9% APR on Certified Pre-Owned through Aug 31</span>
          <span className="flex items-center gap-1.5 font-semibold">
            <Phone size={13} /> {DEALERSHIP.phone}
          </span>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-[#101828]">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 text-white no-underline">
            <span className="bg-[#e0292f] rounded-md p-1.5 flex">
              <Car size={22} color="white" />
            </span>
            <span className="text-xl font-extrabold tracking-tight">
              AUTO<span className="text-[#e0292f]">DEAL</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={navLinkClass}>
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            {currentUser ? (
              <>
                <Link to="/profile?tab=favorites" className="hidden sm:flex text-white hover:text-[#e0292f]">
                  <Badge count={currentUser.favorites.length} size="small" color="#e0292f">
                    <Heart size={20} color="currentColor" />
                  </Badge>
                </Link>
                <Dropdown menu={userMenu} trigger={['click']}>
                  <button className="flex items-center gap-2 bg-transparent border-0 cursor-pointer text-white">
                    <Avatar style={{ background: '#e0292f' }} size={32}>
                      {currentUser.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="hidden lg:flex items-center gap-1 font-semibold text-sm">
                      {currentUser.name.split(' ')[0]} <ChevronDown size={14} />
                    </span>
                  </button>
                </Dropdown>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="text-white font-semibold text-sm hover:text-[#e0292f]">
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-[#e0292f] hover:bg-[#b81f24] text-white font-semibold text-sm px-4 py-2 rounded-md transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
            <button
              className="md:hidden bg-transparent border-0 text-white cursor-pointer"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={26} />
            </button>
          </div>
        </div>
      </div>

      <Drawer title="Menu" placement="right" open={open} onClose={() => setOpen(false)}>
        <div className="flex flex-col gap-4">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="text-gray-800 font-semibold text-base"
            >
              {n.label}
            </NavLink>
          ))}
          <hr className="border-gray-200" />
          {currentUser ? (
            <>
              <Link to="/profile" onClick={() => setOpen(false)} className="font-semibold">My Account</Link>
              {currentUser.role === 'admin' && (
                <Link to="/admin" onClick={() => setOpen(false)} className="font-semibold">Admin Dashboard</Link>
              )}
              <button
                onClick={() => { logout(); setOpen(false); navigate('/'); }}
                className="text-left text-red-600 font-semibold bg-transparent border-0 p-0 cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="font-semibold">Sign In</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="font-semibold text-[#e0292f]">Register</Link>
            </>
          )}
        </div>
      </Drawer>
    </header>
  );
}
