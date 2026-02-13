
import React, { useState } from 'react';
import { User as UserIcon, Package, Heart, MapPin, Bell, LogOut, Shield, ChevronRight } from 'lucide-react';
import { useUser } from '../App';

const Profile: React.FC = () => {
  const { user, login, logout } = useUser();
  const [email, setEmail] = useState('');

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto bg-white p-12 rounded-[3rem] border border-gray-100 shadow-xl space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-black tracking-tight">WELCOME BACK</h2>
            <p className="text-gray-500">Sign in to manage your orders and profile.</p>
          </div>
          <form className="space-y-6" onSubmit={e => { e.preventDefault(); login(email); }}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com" 
                className="w-full px-6 py-4 rounded-2xl bg-gray-50 border-none focus:ring-4 focus:ring-blue-100 outline-none"
              />
            </div>
            <p className="text-xs text-center text-gray-400">Use "admin@resaller.shop" to see the admin dashboard link in the navbar.</p>
            <button className="w-full bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 transform hover:scale-[1.02]">
              Sign In
            </button>
            <div className="text-center">
              <p className="text-gray-500">New here? <button type="button" className="text-blue-600 font-bold hover:underline">Create Account</button></p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full lg:w-80 space-y-6">
          <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-center space-y-4">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-4xl font-black">
              {user.name[0].toUpperCase()}
            </div>
            <div>
              <h3 className="text-2xl font-black">{user.name.toUpperCase()}</h3>
              <p className="text-gray-500 font-medium">{user.email}</p>
            </div>
            <div className="bg-blue-50 text-blue-600 py-2 rounded-xl text-xs font-black uppercase tracking-widest">
              {user.role} Account
            </div>
          </div>

          <nav className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-100">
            {[
              { label: 'My Orders', icon: Package },
              { label: 'Wishlist', icon: Heart },
              { label: 'Addresses', icon: MapPin },
              { label: 'Notifications', icon: Bell },
              { label: 'Security', icon: Shield },
            ].map(item => (
              <button key={item.label} className="w-full flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition group">
                <div className="flex items-center space-x-4">
                  <item.icon className="text-gray-400 group-hover:text-blue-600 transition" size={20} />
                  <span className="font-bold text-gray-700">{item.label}</span>
                </div>
                <ChevronRight className="text-gray-300" size={18} />
              </button>
            ))}
            <button onClick={logout} className="w-full flex items-center space-x-4 px-8 py-5 text-red-500 hover:bg-red-50 transition">
              <LogOut size={20} />
              <span className="font-bold">Log Out</span>
            </button>
          </nav>
        </aside>

        {/* Content */}
        <div className="flex-1 space-y-10">
          <section className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <h2 className="text-3xl font-black uppercase tracking-tight">RECENT ORDERS</h2>
            <div className="space-y-6">
              {[1, 2].map(i => (
                <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-gray-50 rounded-2xl border border-gray-100 gap-6">
                  <div className="flex space-x-4 items-center">
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-gray-200">
                      <ShoppingBag className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-black">Order #RES-{10243 + i}</p>
                      <p className="text-sm text-gray-500">Ordered on May {12 + i}, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-12">
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Amount</p>
                      <p className="font-black">$214.50</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase">Status</p>
                      <p className="text-green-600 font-black">DELIVERED</p>
                    </div>
                    <button className="bg-white px-6 py-2 rounded-xl font-bold border border-gray-200 hover:bg-gray-100 transition">View</button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-600 p-10 rounded-[3rem] text-white shadow-xl shadow-blue-600/30 space-y-4">
              <h3 className="text-2xl font-black">RESALLER.REWARDS</h3>
              <p className="text-blue-100 opacity-80 leading-relaxed">You have <span className="text-white font-black">1,240 points</span> available. Use them at checkout for instant discounts.</p>
              <button className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-bold hover:bg-blue-50 transition">Redeem Points</button>
            </div>
            <div className="bg-gray-900 p-10 rounded-[3rem] text-white space-y-4">
              <h3 className="text-2xl font-black italic">PRO ACCOUNT</h3>
              <p className="text-gray-400 leading-relaxed">Enjoy early access to exclusive drops and 24/7 priority support.</p>
              <p className="text-blue-500 font-bold">Expires in 142 days</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

// Helper Icon for Orders
const ShoppingBag = ({ className }: { className?: string }) => (
  <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);

export default Profile;
