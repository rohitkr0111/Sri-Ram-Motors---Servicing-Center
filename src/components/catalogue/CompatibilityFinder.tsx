import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bike, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { motorcycleModels } from '../../data/motorcycleModels';

export const CompatibilityFinder: React.FC = () => {
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const navigate = useNavigate();
  const allBrands = useCustomizationStore((state) => state.brands);
  const allCategories = useCustomizationStore((state) => state.categories);
  const products = useCustomizationStore((state) => state.products);

  const brands = allBrands.filter((b) => b.enabled);
  const categories = allCategories.filter((c) => c.enabled);

  // Available models based on selected brand
  const filteredModels = useMemo(() => {
    if (!selectedBrand) return [];
    return motorcycleModels.filter((m) => m.brandId === selectedBrand || m.brandName.toLowerCase() === selectedBrand.toLowerCase());
  }, [selectedBrand]);

  // Calculate matching products strictly based on compatibleModels field
  const matchingProductsCount = useMemo(() => {
    if (!selectedModel) return null;

    return products.filter((p) => {
      const modelMatch = p.compatibleModels && p.compatibleModels.some((cm) => cm.toLowerCase() === selectedModel.toLowerCase());
      if (!modelMatch) return false;

      if (selectedCategory) {
        return p.category.toLowerCase() === selectedCategory.toLowerCase();
      }
      return true;
    }).length;
  }, [products, selectedModel, selectedCategory]);

  const handleBrandChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedBrand(val);
    setSelectedModel('');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedModel) return;

    const params = new URLSearchParams();
    params.set('model', selectedModel);
    if (selectedCategory) {
      params.set('category', selectedCategory);
    }
    navigate(`/shop?${params.toString()}`);
  };

  return (
    <div className="bg-[#14171A] rounded-2xl border border-[#2C3238] p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Decorative ambient gradient */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#FF6B24]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B24]/10 border border-[#FF6B24]/30 text-[#FF6B24] text-xs font-semibold tracking-wide uppercase mb-3">
            <Bike className="w-3.5 h-3.5" />
            <span>Data-Driven Precision Fit</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            FIND THE RIGHT PART FOR YOUR BIKE
          </h2>
          <p className="text-sm text-gray-400 mt-2 max-w-xl mx-auto">
            Select your motorcycle brand, model, and part category to see guaranteed compatible spares from our verified database.
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Step 1: Select Brand */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              1. Motorcycle Brand
            </label>
            <select
              value={selectedBrand}
              onChange={handleBrandChange}
              className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors"
            >
              <option value="">-- Choose Brand --</option>
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>

          {/* Step 2: Select Model */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              2. Motorcycle Model
            </label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedBrand}
              className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <option value="">
                {selectedBrand ? '-- Select Exact Model --' : 'Select brand first'}
              </option>
              {filteredModels.map((m) => (
                <option key={m.model} value={m.model}>
                  {m.model}
                </option>
              ))}
            </select>
          </div>

          {/* Step 3: Select Category */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              3. Part Category (Optional)
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] text-white text-sm rounded-xl px-4 py-3 focus:outline-none transition-colors"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Action Row */}
          <div className="md:col-span-3 pt-3 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#2C3238]/60 mt-2">
            <div className="text-xs text-gray-400">
              {selectedModel ? (
                matchingProductsCount && matchingProductsCount > 0 ? (
                  <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Found {matchingProductsCount} verified compatible {matchingProductsCount === 1 ? 'part' : 'parts'}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-amber-400">
                    <AlertCircle className="w-4 h-4" />
                    No compatible products are currently listed. Contact us for assistance.
                  </span>
                )
              ) : (
                <span className="text-gray-500">
                  Select your vehicle model to calculate direct fitments.
                </span>
              )}
            </div>

            <button
              type="submit"
              disabled={!selectedModel}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all shadow-glow-subtle cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Explore Compatible Spares</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
