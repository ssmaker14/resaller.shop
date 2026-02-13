
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Shield, Truck, RotateCcw, Plus, Minus, ArrowLeft, Heart, Share2, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data';
import { useCart } from '../App';
import { getProductInsight } from '../services/geminiService';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const product = MOCK_PRODUCTS.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      setLoadingAi(true);
      getProductInsight(product.name, product.description).then(insight => {
        setAiInsight(insight);
        setLoadingAi(false);
      });
    }
  }, [product]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-bold">Product Not Found</h2>
        <button onClick={() => navigate('/catalog')} className="text-blue-600 font-bold underline">Back to Catalog</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <button onClick={() => navigate(-1)} className="mb-8 flex items-center text-gray-500 hover:text-blue-600 font-bold transition">
        <ArrowLeft size={18} className="mr-2" /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Gallery */}
        <div className="space-y-6">
          <div className="aspect-square rounded-[3rem] overflow-hidden bg-gray-100 shadow-xl border border-gray-100">
            <img src={product.images[activeImg] || product.image} className="w-full h-full object-cover" alt={product.name} />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-4">
              {product.images.map((img, i) => (
                <button 
                  key={i} 
                  onClick={() => setActiveImg(i)}
                  className={`w-24 h-24 rounded-2xl overflow-hidden border-4 transition ${activeImg === i ? 'border-blue-600' : 'border-transparent opacity-60'}`}
                >
                  <img src={img} className="w-full h-full object-cover" alt="preview" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-xs font-black tracking-widest uppercase">{product.category}</span>
              <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">{product.brand}</span>
            </div>
            <h1 className="text-5xl font-black tracking-tight">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-yellow-500 font-bold">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'} />
                ))}
                <span className="ml-2 text-gray-900">{product.rating}</span>
              </div>
              <span className="text-gray-400 font-medium">({product.reviews} customer reviews)</span>
            </div>
            <div className="text-4xl font-black text-blue-600">
              ${product.price.toFixed(2)}
              {product.originalPrice && <span className="text-xl text-gray-400 line-through ml-3 font-normal">${product.originalPrice.toFixed(2)}</span>}
            </div>
          </div>

          <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>

          {/* AI Insight Box */}
          <div className="bg-blue-50 border border-blue-100 rounded-[2rem] p-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition">
              <Sparkles size={48} className="text-blue-600" />
            </div>
            <h4 className="flex items-center font-black text-blue-600 text-sm tracking-widest uppercase mb-2">
              <Sparkles size={16} className="mr-2" /> AI Assistant Insight
            </h4>
            {loadingAi ? (
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]" />
              </div>
            ) : (
              <p className="text-blue-900 font-medium leading-snug italic">"{aiInsight}"</p>
            )}
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-gray-100 rounded-2xl p-1 w-32 justify-between">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="p-3 hover:bg-white rounded-xl transition"><Minus size={18} /></button>
                <span className="font-bold text-lg">{qty}</span>
                <button onClick={() => setQty(q => q + 1)} className="p-3 hover:bg-white rounded-xl transition"><Plus size={18} /></button>
              </div>
              <button 
                onClick={() => { for(let i=0; i<qty; i++) addToCart(product); }}
                className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-blue-700 transition shadow-xl shadow-blue-600/20 transform hover:scale-[1.02]"
              >
                Add to Cart
              </button>
            </div>
            <div className="flex space-x-4">
              <button className="flex-1 border border-gray-200 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-50 transition">
                <Heart size={20} className="mr-2" /> Wishlist
              </button>
              <button className="flex-1 border border-gray-200 py-4 rounded-2xl font-bold flex items-center justify-center hover:bg-gray-50 transition">
                <Share2 size={20} className="mr-2" /> Share
              </button>
            </div>
          </div>

          <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-gray-100">
            <div className="flex items-start space-x-4">
              <Truck className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="font-bold text-sm">Free Delivery</p>
                <p className="text-gray-500 text-xs">Orders over $150</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <Shield className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="font-bold text-sm">2 Year Warranty</p>
                <p className="text-gray-500 text-xs">Full device coverage</p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <RotateCcw className="text-blue-600 mt-1" size={20} />
              <div>
                <p className="font-bold text-sm">30 Day Returns</p>
                <p className="text-gray-500 text-xs">Easy hassle-free returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
