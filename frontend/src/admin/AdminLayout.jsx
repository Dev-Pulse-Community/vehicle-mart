import { Link, NavLink, Outlet, useNavigate } from 'react-router';
import { useState } from 'react';
import { Drawer } from 'antd';
import { Car, LayoutDashboard, CarFront, Users, FileText, Globe, LogOut, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

const LINKS = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/cars', label: 'Car Listings', icon: CarFront },
  { to: '/admin/users', label: 'User Accounts', icon: Users },
  { to: '/admin/content', label: 'Site Content', icon: FileText },
];

function SideNav({ onNavigate }) {
  const { logout } = useApp();
  const navigate = useNavigate();

  const cls = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold no-underline transition-colors ${
      isActive ? 'bg-[#e0292f] text-white' : 'text-gray-300 hover:bg-white/10 hover:text-white'
    }`;

  return (
    <div className="flex flex-col h-full">
      <Link to="/" className="flex items-center gap-2 text-white no-underline px-4 py-5">
        <span className="bg-[#e0292f] rounded-md p-1.5 flex"><Car size={20} color="white" /></span>
        <span className="font-extrabold">AUTO<span className="text-[#e0292f]">DEAL</span></span>
      </Link>
      <nav className="flex flex-col gap-1 px-3 flex-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end} className={cls} onClick={onNavigate}>
            <Icon size={17} /> {label}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-5 flex flex-col gap-1">
        <Link to="/" className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:bg-white/10 hover:text-white no-underline">
          <Globe size={17} /> View Site
        </Link>
        <button
          onClick={() => { logout(); navigate('/'); }}
          className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold text-gray-300 hover:bg-white/10 hover:text-white bg-transparent border-0 cursor-pointer text-left"
        >
          <LogOut size={17} /> Sign Out
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const { currentUser } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-100">
      <aside className="hidden lg:block w-60 bg-[#101828] shrink-0">
        <div className="sticky top-0 h-screen"><SideNav /></div>
      </aside>

      <Drawer placement="left" open={open} onClose={() => setOpen(false)}
        styles={{ body: { padding: 0, background: '#101828' } }} closable={false}>
        <SideNav onNavigate={() => setOpen(false)} />
      </Drawer>

      <div className="flex-1 min-w-0">
        <header className="bg-white border-b border-gray-200 px-5 h-14 flex items-center justify-between sticky top-0 z-40">
          <button className="lg:hidden bg-transparent border-0 cursor-pointer text-gray-700" onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
          <span className="font-bold text-gray-800 hidden lg:block">Admin Panel</span>
          <span className="text-sm text-gray-500">Signed in as <strong>{currentUser?.name}</strong></span>
        </header>
        <main className="p-5 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
