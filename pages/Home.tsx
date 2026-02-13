
import React from 'react';
import { Link } from 'react-router-dom';
// Added Plus to the imports from lucide-react
import { ArrowRight, Star, Shield, Zap, Truck, Plus } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../data';
import { useCart } from '../App';

const Home: React.FC = () => {
  const { addToCart } = useCart();
  const featured = MOCK_PRODUCTS.filter(p => p.featured).slice(0, 3);
  const bestSellers = MOCK_PRODUCTS.filter(p => p.bestSeller).slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-gray-900">
        <div className="absolute inset-0 opacity-40">
          <img src="https://picsum.photos/seed/shophero/1920/1080" className="w-full h-full object-cover" alt="Hero" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/40 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl text-white space-y-8">
            <div className="inline-flex items-center space-x-2 bg-blue-600/20 text-blue-400 px-4 py-2 rounded-full border border-blue-600/30 text-sm font-bold animate-pulse">
              <Zap size={16} />
              <span>NEW SEASON ARRIVALS</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tighter">
              STYLE FOR THE <br />
              <span className="text-blue-500">RESALE</span> ERA.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed">
              Curated premium gear from top brands at unbeatable prices. Fast shipping, guaranteed authenticity, and 24/7 support.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4">
              <Link to="/catalog" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center group shadow-xl shadow-blue-600/20">
                Shop Collection
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition" />
              </Link>
              <Link to="/catalog" className="bg-white/10 backdrop-blur-md text-white px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 transition flex items-center justify-center border border-white/20">
                Explore Best Sellers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Badges */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
          {[
            { icon: Truck, title: 'Free Delivery', desc: 'On orders over $150' },
            { icon: Shield, title: 'Safe Payments', desc: 'Secure checkout flow' },
            { icon: Star, title: 'Quality Build', desc: 'Premium materials only' },
            { icon: Zap, title: 'Fast Support', desc: '24/7 dedicated help' }
          ].map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
                <f.icon size={24} />
              </div>
              <h4 className="font-bold text-gray-900">{f.title}</h4>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 space-y-10">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h2 className="text-4xl font-black tracking-tight">SHOP BY CATEGORY</h2>
            <p className="text-gray-500">Discover everything you need in one place.</p>
          </div>
          <Link to="/catalog" className="text-blue-600 font-bold flex items-center hover:underline">
            View All Categories <ArrowRight size={18} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CATEGORIES.slice(1, 4).map((cat, i) => (
            <Link to={`/catalog?category=${cat}`} key={i} className="group relative h-80 rounded-3xl overflow-hidden shadow-lg">
              <img src={`https://picsum.photos/seed/${cat}/800/800`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={cat} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-black">{cat.toUpperCase()}</h3>
                <p className="text-gray-300 mt-1 flex items-center opacity-0 group-hover:opacity-100 transition">
                  Browse items <ArrowRight size={16} className="ml-2" />
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4 space-y-12">
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <h2 className="text-5xl font-black tracking-tight">FEATURED RELEASES</h2>
            <p className="text-gray-500 text-lg">Hand-picked by our experts for performance and style.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {featured.map(product => (
              <div key={product.id} className="group space-y-6">
                <Link to={`/product/${product.id}`} className="block relative aspect-square rounded-3xl overflow-hidden bg-gray-100">
                  <img src={product.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" alt={product.name} />
                  {product.originalPrice && (
                    <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      SAVE ${(product.originalPrice - product.price).toFixed(0)}
                    </div>
                  )}
                </Link>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">{product.name}</h3>
                    <div className="flex items-center text-yellow-500 font-bold text-sm">
                      <Star size={14} className="fill-current mr-1" />
                      {product.rating}
                    </div>
                  </div>
                  <p className="text-gray-500 line-clamp-2 text-sm">{product.description}</p>
                  <div className="pt-4 flex items-center justify-between">
                    <div className="text-2xl font-black text-gray-900">
                      ${product.price.toFixed(2)}
                      {product.originalPrice && <span className="text-sm text-gray-400 line-through ml-2 font-normal">${product.originalPrice.toFixed(2)}</span>}
                    </div>
                    {/* Fixed: Plus icon was missing from imports */}
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-gray-900 text-white p-3 rounded-2xl hover:bg-blue-600 transition shadow-lg"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container mx-auto px-4">
        <div className="bg-blue-600 rounded-[3rem] p-12 md:p-20 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl -ml-32 -mb-32" />
          
          <div className="relative z-10 max-w-3xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-black">NEVER MISS A DROP</h2>
            <p className="text-blue-100 text-lg">Join 50,000+ shoppers receiving early access to sales and exclusive items delivered straight to their inbox.</p>
            <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto" onSubmit={e => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-2xl bg-white text-gray-900 font-medium focus:ring-4 focus:ring-blue-400 outline-none"
              />
              <button className="bg-gray-900 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-black transition whitespace-nowrap">
                Subscribe Now
              </button>
            </form>
            <p className="text-sm text-blue-200">By subscribing, you agree to our privacy policy.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
