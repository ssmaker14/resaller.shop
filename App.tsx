
import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User as UserIcon, Search, Menu, X, Package, Trash2, ChevronRight, BarChart2, Plus, ArrowLeft } from 'lucide-react';
import { Product, CartItem, User } from './types';
import { MOCK_PRODUCTS } from './data';

// Contexts
const CartContext = createContext<{
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
} | undefined>(undefined);

const UserContext = createContext<{
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
} | undefined>(undefined);

// Hooks
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};

// Components
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';

const Navbar = ({ onOpenCart }: { onOpenCart: () => void }) => {
  const { cart } = useCart();
  const { user } = useUser();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="text-2xl font-black tracking-tighter text-blue-600">
          RESALLER<span className="text-gray-900">.SHOP</span>
        </Link>

        <div className="hidden md:flex space-x-8 font-medium">
          <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          <Link to="/catalog" className="hover:text-blue-600 transition">Shop</Link>
          {user?.role === 'admin' && <Link to="/admin" className="text-red-500 font-bold hover:text-red-600">Admin</Link>}
        </div>

        <div className="flex items-center space-x-5">
          <Link to="/catalog" className="p-2 hover:bg-gray-100 rounded-full transition">
            <Search size={20} />
          </Link>
          <Link to={user ? "/profile" : "/profile"} className="p-2 hover:bg-gray-100 rounded-full transition">
            <UserIcon size={20} />
          </Link>
          <button 
            onClick={onOpenCart}
            className="p-2 hover:bg-gray-100 rounded-full transition relative"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

const CartDrawer = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col">
          <div className="p-6 flex items-center justify-between border-b border-gray-100">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-500 space-y-4">
                <ShoppingCart size={64} className="opacity-20" />
                <p>Your cart is empty.</p>
                <button 
                  onClick={() => { onClose(); navigate('/catalog'); }}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="flex space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-gray-500 text-sm">${item.price.toFixed(2)}</p>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-50">-</button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-50">+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {cart.length > 0 && (
            <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
              <div className="flex items-center justify-between text-lg font-bold">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button 
                onClick={() => { onClose(); navigate('/checkout'); }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition transform hover:scale-[1.02]"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="space-y-6">
        <h3 className="text-2xl font-black tracking-tighter text-blue-500">RESALLER.SHOP</h3>
        <p className="text-gray-400 leading-relaxed">
          Premium marketplace for resellers and shoppers looking for the best deals on high-quality items.
        </p>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Quick Links</h4>
        <ul className="space-y-4 text-gray-400">
          <li><Link to="/" className="hover:text-blue-500 transition">Home</Link></li>
          <li><Link to="/catalog" className="hover:text-blue-500 transition">Shop All</Link></li>
          <li><Link to="/profile" className="hover:text-blue-500 transition">My Account</Link></li>
          <li><Link to="/admin" className="hover:text-blue-500 transition">Admin Dashboard</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Help & Info</h4>
        <ul className="space-y-4 text-gray-400">
          <li>Shipping Policy</li>
          <li>Returns & Refunds</li>
          <li>Privacy Policy</li>
          <li>Terms of Service</li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold text-lg mb-6">Join Our Newsletter</h4>
        <p className="text-gray-400 mb-4">Get the latest updates on new arrivals and sales.</p>
        <div className="flex">
          <input 
            type="email" 
            placeholder="Enter your email" 
            className="flex-1 bg-gray-800 border-none rounded-l-lg px-4 focus:ring-2 focus:ring-blue-500"
          />
          <button className="bg-blue-600 px-4 py-2 rounded-r-lg font-bold hover:bg-blue-700 transition">Join</button>
        </div>
      </div>
    </div>
    <div className="container mx-auto px-4 mt-20 pt-10 border-t border-gray-800 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} resaller.shop. All rights reserved. Built with modern technology.
    </div>
  </footer>
);

const App: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);
  const cartTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const login = (email: string) => {
    // Basic mock login
    const mockUser: User = {
      id: 'u1',
      name: email.split('@')[0],
      email: email,
      role: email.includes('admin') ? 'admin' : 'customer'
    };
    setUser(mockUser);
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal }}>
        <HashRouter>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar onOpenCart={() => setIsCartOpen(true)} />
            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </HashRouter>
      </CartContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
