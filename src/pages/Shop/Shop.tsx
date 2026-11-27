import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  X, 
  Bike, 
  ChevronDown,
  RotateCcw,
  Check
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { ProductCard } from '../../components/products/ProductCard';
import { motorcycleModels } from '../../data/motorcycleModels';

export const Shop: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Pull store data
  const products = useCustomizationStore((state) => state.products);
  const allBrands = useCustomizationStore((state) => state.brands);
  const allCategories = useCustomizationStore((state) => state.categories);

  const brands = allBrands.filter((b) => b.enabled);
  const categories = allCategories.filter((c) => c.enabled);

  // Extract initial filters from search params
  const initialSearch = searchParams.get('search') || '';
  const initialBrand = searchParams.get('brand') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialModel = searchParams.get('model') || '';

  // Local filter states
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedStock, setSelectedStock] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync state if URL query params change (e.g. from navbar search or footer click)
  useEffect(() => {
    if (searchParams.get('search') !== null) setSearchQuery(searchParams.get('search') || '');
    if (searchParams.get('brand') !== null) setSelectedBrand(searchParams.get('brand') || '');
    if (searchParams.get('category') !== null) setSelectedCategory(searchParams.get('category') || '');
    if (searchParams.get('model') !== null) setSelectedModel(searchParams.get('model') || '');
  }, [searchParams]);

  // List of distinct manufacturers
  const manufacturers = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.manufacturer) set.add(p.manufacturer);
    });
    return Array.from(set);
  }, [products]);

  const [selectedManufacturer, setSelectedManufacturer] = useState<string>('');

  // Available models based on selected brand
  const availableModels = useMemo(() => {
    if (!selectedBrand) return motorcycleModels;
    return motorcycleModels.filter(
      (m) => m.brandName.toLowerCase() === selectedBrand.toLowerCase() || m.brandId.toLowerCase() === selectedBrand.toLowerCase()
    );
  }, [selectedBrand]);

  // Pure data-driven filtering
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search query across name, sku, brand, category, description, and motorcycleModel
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesSku = p.sku.toLowerCase().includes(q);
        const matchesBrand = p.brand.toLowerCase().includes(q);
        const matchesCategory = p.category.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesModel = p.compatibleModels?.some((m) => m.toLowerCase().includes(q));

        if (!matchesName && !matchesSku && !matchesBrand && !matchesCategory && !matchesDesc && !matchesModel) {
          return false;
        }
      }

      // Brand filter
      if (selectedBrand && selectedBrand !== 'all') {
        if (p.brand.toLowerCase() !== selectedBrand.toLowerCase()) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory && selectedCategory !== 'all') {
        if (p.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      // Exact Motorcycle Model filter (Data driven compatibility rule #3)
      if (selectedModel && selectedModel !== 'all') {
        const hasCompatible = p.compatibleModels?.some(
          (m) => m.toLowerCase() === selectedModel.toLowerCase()
        );
        if (!hasCompatible) {
          return false;
        }
      }

      // Stock status filter
      if (selectedStock && selectedStock !== 'all') {
        if (p.stockStatus !== selectedStock) {
          return false;
        }
      }

      // Manufacturer filter
      if (selectedManufacturer && selectedManufacturer !== 'all') {
        if (p.manufacturer.toLowerCase() !== selectedManufacturer.toLowerCase()) {
          return false;
        }
      }

      // Price filter
      if (p.price > priceRange) {
        return false;
      }

      return true;
    });
  }, [products, searchQuery, selectedBrand, selectedCategory, selectedModel, selectedStock, selectedManufacturer, priceRange]);

  // Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
      default:
        return list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
  }, [filteredProducts, sortBy]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);

  const resetAllFilters = () => {
    setSearchQuery('');
    setSelectedBrand('');
    setSelectedCategory('');
    setSelectedModel('');
    setSelectedStock('all');
    setSelectedManufacturer('');
    setPriceRange(5000);
    setSortBy('featured');
    setVisibleCount(8);
    setSearchParams({});
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedBrand ||
    selectedCategory ||
    selectedModel ||
    selectedStock !== 'all' ||
    selectedManufacturer ||
    priceRange < 5000
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
          Motorcycle Spare Parts Catalogue
        </h1>
        <p className="text-sm text-gray-400">
          Showing {sortedProducts.length} verified motorcycle parts and workshop components.
        </p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* DESKTOP SIDEBAR FILTERS (Col 1) */}
        <aside className="hidden lg:block space-y-6 bg-[#14171A] p-6 rounded-2xl border border-[#2C3238] h-fit">
          <div className="flex items-center justify-between border-b border-[#2C3238] pb-3">
            <span className="font-heading font-semibold text-white text-base flex items-center gap-2">
              <Filter className="w-4 h-4 text-[#FF6B24]" />
              Filter Parts
            </span>
            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs text-[#FF6B24] hover:text-[#FF8C42] flex items-center gap-1 font-medium"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>

          {/* Search bar inside filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Search Term / SKU
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Piston, brake pad, Activa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-xs rounded-xl px-3 py-2.5 pl-8 focus:outline-none"
              />
              <Search className="w-3.5 h-3.5 text-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Motorcycle Model Filter (Rule 3) */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Specific Bike Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="">-- All Bike Models --</option>
              {availableModels.map((m) => (
                <option key={m.model} value={m.model}>
                  {m.model}
                </option>
              ))}
            </select>
          </div>

          {/* Categories */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Category
            </label>
            <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedCategory('')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  !selectedCategory ? 'bg-[#FF6B24] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-[#1B1F23]'
                }`}
              >
                <span>All Categories</span>
                {!selectedCategory && <Check className="w-3.5 h-3.5" />}
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.name)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedCategory.toLowerCase() === c.name.toLowerCase()
                      ? 'bg-[#FF6B24] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-[#1B1F23]'
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  {selectedCategory.toLowerCase() === c.name.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Brand / Make
            </label>
            <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
              <button
                onClick={() => setSelectedBrand('')}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                  !selectedBrand ? 'bg-[#FF6B24] text-white font-medium' : 'text-gray-400 hover:text-white hover:bg-[#1B1F23]'
                }`}
              >
                <span>All Brands</span>
                {!selectedBrand && <Check className="w-3.5 h-3.5" />}
              </button>
              {brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => setSelectedBrand(b.name)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs transition-colors flex items-center justify-between ${
                    selectedBrand.toLowerCase() === b.name.toLowerCase()
                      ? 'bg-[#FF6B24] text-white font-medium'
                      : 'text-gray-400 hover:text-white hover:bg-[#1B1F23]'
                  }`}
                >
                  <span>{b.name}</span>
                  {selectedBrand.toLowerCase() === b.name.toLowerCase() && (
                    <Check className="w-3.5 h-3.5 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Availability Status */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Stock Availability
            </label>
            <select
              value={selectedStock}
              onChange={(e) => setSelectedStock(e.target.value)}
              className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="in-stock">In Stock Only</option>
              <option value="on-request">On Request</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>

          {/* Manufacturer */}
          {manufacturers.length > 0 && (
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                Manufacturer / Grade
              </label>
              <select
                value={selectedManufacturer}
                onChange={(e) => setSelectedManufacturer(e.target.value)}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-xs rounded-xl px-3 py-2.5 focus:outline-none"
              >
                <option value="">All Manufacturers</option>
                {manufacturers.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Price Range */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Max Price
              </label>
              <span className="text-xs font-bold text-[#FF6B24]">₹{priceRange}</span>
            </div>
            <input
              type="range"
              min="200"
              max="5000"
              step="100"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-[#FF6B24] cursor-pointer"
            />
          </div>
        </aside>

        {/* RIGHT CATALOGUE GRID & TOOLBAR (Col 2, 3, 4) */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls Bar */}
          <div className="bg-[#14171A] p-4 rounded-xl border border-[#2C3238] flex flex-wrap items-center justify-between gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-[#1B1F23] border border-[#2C3238] text-xs font-medium text-white"
            >
              <Filter className="w-4 h-4 text-[#FF6B24]" />
              <span>Filters {hasActiveFilters && '(Active)'}</span>
            </button>

            {/* Active Filters Tags */}
            <div className="flex flex-wrap items-center gap-1.5 flex-1">
              {selectedBrand && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B1F23] border border-[#2C3238] text-[11px] text-gray-300">
                  Brand: {selectedBrand}
                  <button onClick={() => setSelectedBrand('')} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedCategory && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B1F23] border border-[#2C3238] text-[11px] text-gray-300">
                  Cat: {selectedCategory}
                  <button onClick={() => setSelectedCategory('')} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {selectedModel && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#1B1F23] border border-[#2C3238] text-[11px] text-gray-300">
                  Model: {selectedModel}
                  <button onClick={() => setSelectedModel('')} className="hover:text-red-400">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}

              {hasActiveFilters && (
                <button
                  onClick={resetAllFilters}
                  className="text-[11px] text-[#FF6B24] hover:underline px-2 py-0.5"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Sorting Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400 whitespace-nowrap">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-xs rounded-lg px-3 py-1.5 focus:outline-none"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Product Name (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-[#14171A] rounded-2xl border border-[#2C3238] p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center mx-auto text-[#FF6B24]">
                <Bike className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold font-heading text-white">No Matching Spare Parts Found</h3>
              <p className="text-sm text-gray-400 max-w-md mx-auto">
                No products match the selected filters or motorcycle compatibility criteria. Try adjusting your search term or resetting your filters.
              </p>
              <button
                onClick={resetAllFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white text-xs font-semibold"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Reset All Filters</span>
              </button>
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < sortedProducts.length && (
            <div className="text-center pt-6">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] border border-[#2C3238] hover:border-[#FF6B24] text-white text-xs font-semibold transition-all shadow-md"
              >
                <span>Load More Products ({sortedProducts.length - visibleCount} remaining)</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#14171A] border-l border-[#2C3238] p-6 shadow-2xl overflow-y-auto space-y-6">
            <div className="flex items-center justify-between border-b border-[#2C3238] pb-4">
              <span className="font-heading font-bold text-white text-base">Filter Catalogue</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1.5 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile filters fields */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Motorcycle Model
              </label>
              <select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-[#1B1F23] border border-[#2C3238] text-white text-xs rounded-xl p-3"
              >
                <option value="">-- All Bike Models --</option>
                {availableModels.map((m) => (
                  <option key={m.model} value={m.model}>
                    {m.model}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-[#1B1F23] border border-[#2C3238] text-white text-xs rounded-xl p-3"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Brand
              </label>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-[#1B1F23] border border-[#2C3238] text-white text-xs rounded-xl p-3"
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="pt-4 border-t border-[#2C3238] flex gap-3">
              <button
                onClick={() => {
                  resetAllFilters();
                  setMobileFilterOpen(false);
                }}
                className="flex-1 py-3 rounded-xl bg-[#1B1F23] text-gray-300 text-xs font-medium border border-[#2C3238]"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-3 rounded-xl bg-[#FF6B24] text-white text-xs font-bold"
              >
                Apply ({sortedProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
