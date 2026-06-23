import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, Images, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const links = [
  { to: '/admin/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { to: '/admin/cars',      icon: <Car size={18} />,             label: 'Cars' },
  { to: '/admin/gallery',   icon: <Images size={18} />,          label: 'Gallery' },
];

export default function AdminLayout() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin', { replace: true });
  };

  const Sidebar = ({ mobile = false }) => (
    <aside className={`${mobile ? 'flex' : 'hidden md:flex'} flex-col h-full w-60 bg-[#0d0d0d] border-r border-white/5 p-5`}>
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 px-1">
        <img src="/logo.jpg" alt="Logo" className="w-9 h-9 rounded-full object-cover border" style={{ borderColor: '#C8962A55' }} />
        <div>
          <div className="text-white text-xs font-semibold tracking-wider">Admin Portal</div>
          <div className="text-white/30 text-[10px]">New Auto Galaxy</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                isActive
                  ? 'bg-[#C8962A]/15 text-[#C8962A]'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* User + Sign out */}
      <div className="border-t border-white/5 pt-4 mt-4">
        <div className="text-white/25 text-[11px] truncate px-1 mb-3">{user?.email}</div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm text-white/40 hover:text-red-400 hover:bg-red-400/5 transition-all"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-[#0a0a0a] overflow-hidden">
      <Sidebar />

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <Sidebar mobile />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-white/5 bg-[#0d0d0d]">
          <button onClick={() => setOpen(true)} className="text-white/60 hover:text-white">
            <Menu size={20} />
          </button>
          <span className="text-white/50 text-xs tracking-widest uppercase">Admin</span>
          <button onClick={() => setOpen(false)} className="text-white/0 pointer-events-none">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
