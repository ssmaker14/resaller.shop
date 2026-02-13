
import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Filter, Star, Plus, SlidersHorizontal, Grid, List as ListIcon } from 'lucide-react';
import { MOCK_PRODUCTS, CATEGORIES } from '../data';
import { useCart } from '../App';
import { SortOption } from '../types';

const Catalog: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();
  
  const initialCategory = searchParams.get('category') || 'All';
  const [category, setCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<SortOption>(SortOption.POPULARITY);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = useMemo(() => {
    let result = [...MOCK_PRODUCTS];

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case SortOption.PRICE_ASC:
        result.sort((a, b) => a.price - b.price);
        break;
      case SortOption.PRICE_DESC:
        result.sort((a, b) => b.price - a.price);
        break;
      case SortOption.NEWEST:
        result.sort((a, b) => parseInt(b.id) - parseInt(a.id));
        break;
      case SortOption.POPULARITY:
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [category, priceRange, sortBy]);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setSearchParams(cat === 'All' ? {} : { category: cat });
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-10">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center">
              <Filter className="mr-2" size={20} />
              Filters
            </h2>
            {(category !== 'All' || priceRange[1] !== 1000) && (
              <button 
                onClick={() => { setCategory('All'); setPriceRange([0, 1000]); setSearchParams({}); }}
                className="text-sm text-blue-600 font-bold"
              >
                Reset
              </button>
            )}
          </div>

          <div className="space-y-4">
            <h4 className="font-bold uppercase text-sm tracking-wider text-gray-400">Categories</h4>
            <div className="flex flex-wrap md:flex-col gap-2">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-2 rounded-xl text-left transition ${
                    category === cat 
                    ? 'bg-blue-600 text-white font-bold' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold uppercase text-sm tracking-wider text-gray-400">Price Range</h4>
            <div className="space-y-2">
              <input 
                type="range" 
                min="0" 
                max="1000" 
                value={priceRange[1]} 
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-blue-600"
              />
              <div className="flex justify-between text-sm font-bold">
                <span>$0</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="bg-white p-4 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 border border-gray-100 shadow-sm">
            <p className="text-gray-500 font-medium">Showing <span className="text-gray-900 font-bold">{filteredProducts.length}</span> results</p>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 p-1 rounded-lg">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition ${viewMode === 'grid' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-md transition ${viewMode === 'list' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
                >
                  <ListIcon size={18} />
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <SlidersHorizontal size={18} className="text-gray-400" />
                <select 
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value as SortOption)}
                  className="bg-transparent border-none font-bold focus:ring-0 cursor-pointer"
                >
                  {Object.values(SortOption).map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" 
            : "space-y-6"
          }>
            {filteredProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center space-y-4">
                <Filter size={64} className="mx-auto text-gray-200" />
                <h3 className="text-2xl font-bold">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or category.</p>
              </div>
            ) : (
              filteredProducts.map(product => (
                <div key={product.id} className={viewMode === 'grid' 
                  ? "group space-y-4" 
                  : "group bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex space-x-6"
                }>
                  <Link 
                    to={`/product/${product.id}`} 
                    className={viewMode === 'grid' 
                      ? "block aspect-square rounded-3xl overflow-hidden bg-gray-100"
                      : "block w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 shrink-0"
                    }
                  >
                    <img src={product.image} className="w-full h-full object-cover transition duration-500 group-hover:scale-105" alt={product.name} />
                  </Link>
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${product.id}`} className="text-xl font-bold hover:text-blue-600 transition">{product.name}</Link>
                        <p className="text-gray-400 text-sm font-medium">{product.brand} · {product.category}</p>
                      </div>
                      <div className="flex items-center text-yellow-500 font-bold text-sm">
                        <Star size={14} className="fill-current mr-1" />
                        {product.rating}
                      </div>
                    </div>
                    {viewMode === 'list' && <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="text-2xl font-black">
                        ${product.price.toFixed(2)}
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through ml-2 font-normal">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => addToCart(product)}
                        className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-blue-700 transition flex items-center shadow-lg shadow-blue-600/20"
                      >
                        <Plus size={18} className="mr-2" />
                        {viewMode === 'list' ? 'Add to Cart' : 'Add'}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
