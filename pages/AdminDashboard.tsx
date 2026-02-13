
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts';
import { LayoutDashboard, Package, ShoppingBag, Users, Settings, Plus, TrendingUp, DollarSign, Search, Filter } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data';

const data = [
  { name: 'Mon', sales: 4000, orders: 24 },
  { name: 'Tue', sales: 3000, orders: 13 },
  { name: 'Wed', sales: 2000, orders: 98 },
  { name: 'Thu', sales: 2780, orders: 39 },
  { name: 'Fri', sales: 1890, orders: 48 },
  { name: 'Sat', sales: 2390, orders: 38 },
  { name: 'Sun', sales: 3490, orders: 43 },
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders'>('overview');

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-white border-r border-gray-100 p-6 space-y-10">
        <h2 className="text-xl font-black text-blue-600 px-4 uppercase tracking-widest">Control Panel</h2>
        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'products', label: 'Inventory', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingBag },
            { id: 'customers', label: 'Customers', icon: Users },
            { id: 'settings', label: 'Settings', icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-bold transition ${activeTab === item.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Panel */}
      <main className="flex-1 p-8 space-y-10 overflow-y-auto max-h-screen">
        <header className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight uppercase">
              {activeTab === 'overview' ? 'DASHBOARD OVERVIEW' : activeTab.toUpperCase()}
            </h1>
            <p className="text-gray-500 font-medium">Welcome back, Administrator.</p>
          </div>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center shadow-lg hover:bg-blue-700 transition">
            <Plus size={20} className="mr-2" /> New Report
          </button>
        </header>

        {activeTab === 'overview' && (
          <div className="space-y-10 animate-in fade-in duration-500">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', color: 'blue' },
                { label: 'Orders', value: '1,420', trend: '+8.2%', color: 'green' },
                { label: 'New Customers', value: '450', trend: '+24.1%', color: 'purple' },
                { label: 'Avg Order Value', value: '$87.50', trend: '-2.4%', color: 'orange' },
              ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">{stat.label}</p>
                    <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.startsWith('+') ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {stat.trend}
                    </span>
                  </div>
                  <div className="flex items-end space-x-2">
                    <p className="text-3xl font-black text-gray-900">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tight">Sales Analytics</h3>
                  <select className="bg-gray-100 border-none rounded-lg text-sm font-bold">
                    <option>Last 7 Days</option>
                    <option>Last 30 Days</option>
                  </select>
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <defs>
                        <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Area type="monotone" dataKey="sales" stroke="#2563eb" strokeWidth={4} fillOpacity={1} fill="url(#colorSales)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-black uppercase tracking-tight">Order Volume</h3>
                  <TrendingUp className="text-blue-600" />
                </div>
                <div className="h-80 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                      <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                      <Bar dataKey="orders" fill="#2563eb" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Recent Orders List */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="p-10 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-xl font-black uppercase tracking-tight">Recent Orders</h3>
                <button className="text-blue-600 font-bold hover:underline">View All</button>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <th className="px-10 py-6">Customer</th>
                    <th className="px-10 py-6">Product</th>
                    <th className="px-10 py-6">Amount</th>
                    <th className="px-10 py-6">Status</th>
                    <th className="px-10 py-6">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {[1, 2, 3, 4, 5].map(i => (
                    <tr key={i} className="hover:bg-gray-50 transition">
                      <td className="px-10 py-6 flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-black">JD</div>
                        <span className="font-bold">John Doe</span>
                      </td>
                      <td className="px-10 py-6 text-gray-500 font-medium">Air Max Pro v2</td>
                      <td className="px-10 py-6 font-black">$189.99</td>
                      <td className="px-10 py-6">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tight ${i % 2 === 0 ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                          {i % 2 === 0 ? 'Delivered' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-10 py-6">
                        <button className="text-gray-400 hover:text-blue-600 transition">View Details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input type="text" placeholder="Search products by name or SKU..." className="w-full pl-12 pr-6 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="flex gap-4 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center space-x-2 px-6 py-3 border border-gray-200 rounded-xl font-bold hover:bg-gray-50">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
                <button className="flex-1 md:flex-none bg-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-600/20">
                  Add Product
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {MOCK_PRODUCTS.map(product => (
                <div key={product.id} className="bg-white rounded-[2rem] border border-gray-100 p-6 flex items-center space-x-6 hover:shadow-lg transition">
                  <img src={product.image} className="w-24 h-24 rounded-2xl object-cover" alt={product.name} />
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold line-clamp-1">{product.name}</h4>
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-lg">${product.price.toFixed(2)}</span>
                      <span className={`text-xs font-bold ${product.stock < 15 ? 'text-red-500' : 'text-green-500'}`}>
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
