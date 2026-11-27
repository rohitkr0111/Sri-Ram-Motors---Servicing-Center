import React, { useState } from 'react';
import { 
  Store, 
  Palette, 
  Package, 
  Layers, 
  Download, 
  Upload, 
  RotateCcw, 
  Save, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertTriangle,
  Info
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { Product, StockStatus } from '../../types';

export const Customizer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'business' | 'theme' | 'products' | 'categories' | 'backup'>('business');

  // Store access
  const shop = useCustomizationStore((state) => state.shop);
  const theme = useCustomizationStore((state) => state.theme);
  const products = useCustomizationStore((state) => state.products);
  const categories = useCustomizationStore((state) => state.categories);
  const brands = useCustomizationStore((state) => state.brands);

  const updateShopConfig = useCustomizationStore((state) => state.updateShopConfig);
  const updateThemeConfig = useCustomizationStore((state) => state.updateThemeConfig);
  const addProduct = useCustomizationStore((state) => state.addProduct);
  const updateProduct = useCustomizationStore((state) => state.updateProduct);
  const deleteProduct = useCustomizationStore((state) => state.deleteProduct);
  const toggleBrand = useCustomizationStore((state) => state.toggleBrand);
  const toggleCategory = useCustomizationStore((state) => state.toggleCategory);
  const exportConfig = useCustomizationStore((state) => state.exportConfig);
  const importConfig = useCustomizationStore((state) => state.importConfig);
  const resetToDefaults = useCustomizationStore((state) => state.resetToDefaults);

  // Form states for local modifications
  const [shopForm, setShopForm] = useState(shop);
  const [themeForm, setThemeForm] = useState(theme);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [importJsonText, setImportJsonText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success: boolean; msg: string } | null>(null);

  // Product Add / Edit modal state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProduct, setIsNewProduct] = useState(false);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleSaveBusiness = (e: React.FormEvent) => {
    e.preventDefault();
    updateShopConfig(shopForm);
    showToast('Business details saved to browser storage!');
  };

  const handleSaveTheme = (e: React.FormEvent) => {
    e.preventDefault();
    updateThemeConfig(themeForm);
    showToast('Theme colors applied and saved to browser storage!');
  };

  const handleExport = () => {
    const dataStr = exportConfig();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sri-ram-motors-config-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    showToast('Configuration exported as JSON file!');
  };

  const handleImport = () => {
    if (!importJsonText.trim()) return;
    const res = importConfig(importJsonText);
    if (res.success) {
      setImportStatus({ success: true, msg: 'Configuration imported and applied successfully!' });
      setShopForm(useCustomizationStore.getState().shop);
      setThemeForm(useCustomizationStore.getState().theme);
      showToast('Configuration imported successfully!');
    } else {
      setImportStatus({ success: false, msg: res.error || 'Failed to import JSON.' });
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all configurations and restore default demo data? This cannot be undone.')) {
      resetToDefaults();
      setShopForm(useCustomizationStore.getState().shop);
      setThemeForm(useCustomizationStore.getState().theme);
      showToast('All settings reset to defaults.');
    }
  };

  const openNewProductModal = () => {
    setEditingProduct({
      id: `custom-prod-${Date.now()}`,
      slug: `custom-product-${Date.now()}`,
      name: '',
      description: '',
      image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
      gallery: [],
      sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
      brand: 'Hero',
      compatibleModels: ['Hero Splendor Plus (100cc)'],
      category: 'Engine & Mechanical',
      manufacturer: 'OEM Supplier',
      price: 500,
      stockStatus: 'in-stock',
      featured: false,
      specifications: {}
    });
    setIsNewProduct(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    if (isNewProduct) {
      addProduct(editingProduct);
      showToast(`Product "${editingProduct.name}" created!`);
    } else {
      updateProduct(editingProduct.id, editingProduct);
      showToast(`Product "${editingProduct.name}" updated!`);
    }
    setEditingProduct(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Notice Banner Rule 14 */}
      <div className="bg-[#14171A] border-l-4 border-[#FF6B24] p-4 rounded-r-xl border-y border-r border-[#2C3238] flex items-start gap-3">
        <Info className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
        <div className="text-xs text-gray-300">
          <span className="font-bold text-white block">Local Template Customizer</span>
          <p className="mt-0.5 text-[#A1A7AE]">
            "Changes made here are stored only in this browser. To publish them for all visitors, update the project configuration and redeploy the website."
          </p>
        </div>
      </div>

      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-semibold shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header and Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C3238] pb-6">
        <div>
          <h1 className="text-3xl font-bold font-heading text-white">
            Website Customization Panel
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Configure store info, WhatsApp numbers, theme palette, brand toggles, and manage local product inventory.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-gray-300 border border-[#2C3238] text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-[#FF6B24]" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/30 hover:bg-red-950/60 text-red-400 border border-red-900/40 text-xs font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex gap-2 overflow-x-auto border-b border-[#2C3238] pb-1">
        <button
          onClick={() => setActiveTab('business')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'business'
              ? 'bg-[#1B1F23] text-[#FF6B24] border-t-2 border-[#FF6B24]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Store className="w-4 h-4" />
          <span>Business Info & Location</span>
        </button>

        <button
          onClick={() => setActiveTab('theme')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'theme'
              ? 'bg-[#1B1F23] text-[#FF6B24] border-t-2 border-[#FF6B24]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Theme & Palette</span>
        </button>

        <button
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'products'
              ? 'bg-[#1B1F23] text-[#FF6B24] border-t-2 border-[#FF6B24]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Products Inventory ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'categories'
              ? 'bg-[#1B1F23] text-[#FF6B24] border-t-2 border-[#FF6B24]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Brands & Categories</span>
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'backup'
              ? 'bg-[#1B1F23] text-[#FF6B24] border-t-2 border-[#FF6B24]'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Backup & JSON Migration</span>
        </button>
      </div>

      {/* TAB 1: BUSINESS SETTINGS */}
      {activeTab === 'business' && (
        <form onSubmit={handleSaveBusiness} className="bg-[#14171A] p-6 sm:p-8 rounded-2xl border border-[#2C3238] space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Shop Display Name
              </label>
              <input
                type="text"
                value={shopForm.shopName}
                onChange={(e) => setShopForm({ ...shopForm, shopName: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Tagline
              </label>
              <input
                type="text"
                value={shopForm.tagline}
                onChange={(e) => setShopForm({ ...shopForm, tagline: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                WhatsApp Ordering Number (Digits with country code, e.g. 919876543210)
              </label>
              <input
                type="text"
                value={shopForm.whatsappNumber}
                onChange={(e) => setShopForm({ ...shopForm, whatsappNumber: e.target.value })}
                placeholder="919876543210"
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Phone Number
              </label>
              <input
                type="text"
                value={shopForm.phone}
                onChange={(e) => setShopForm({ ...shopForm, phone: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={shopForm.email}
                onChange={(e) => setShopForm({ ...shopForm, email: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Business Hours
              </label>
              <input
                type="text"
                value={shopForm.openingHours}
                onChange={(e) => setShopForm({ ...shopForm, openingHours: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Physical Shop Address
              </label>
              <textarea
                rows={2}
                value={shopForm.address}
                onChange={(e) => setShopForm({ ...shopForm, address: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Google Maps Embed URL
              </label>
              <input
                type="text"
                value={shopForm.mapsEmbedUrl}
                onChange={(e) => setShopForm({ ...shopForm, mapsEmbedUrl: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Hero Headline
              </label>
              <input
                type="text"
                value={shopForm.heroHeadline}
                onChange={(e) => setShopForm({ ...shopForm, heroHeadline: e.target.value })}
                className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-[#2C3238]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white text-xs font-semibold shadow-glow-subtle cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Save Business Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: THEME PALETTE */}
      {activeTab === 'theme' && (
        <form onSubmit={handleSaveTheme} className="bg-[#14171A] p-6 sm:p-8 rounded-2xl border border-[#2C3238] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Primary Brand Accent
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeForm.primaryColor}
                  onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={themeForm.primaryColor}
                  onChange={(e) => setThemeForm({ ...themeForm, primaryColor: e.target.value })}
                  className="bg-[#1B1F23] border border-[#2C3238] rounded-lg p-2 text-xs text-white font-mono flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Primary Hover
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeForm.primaryHover}
                  onChange={(e) => setThemeForm({ ...themeForm, primaryHover: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={themeForm.primaryHover}
                  onChange={(e) => setThemeForm({ ...themeForm, primaryHover: e.target.value })}
                  className="bg-[#1B1F23] border border-[#2C3238] rounded-lg p-2 text-xs text-white font-mono flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Main Background
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeForm.bgMain}
                  onChange={(e) => setThemeForm({ ...themeForm, bgMain: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={themeForm.bgMain}
                  onChange={(e) => setThemeForm({ ...themeForm, bgMain: e.target.value })}
                  className="bg-[#1B1F23] border border-[#2C3238] rounded-lg p-2 text-xs text-white font-mono flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase mb-2">
                Border Outline
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={themeForm.borderColor}
                  onChange={(e) => setThemeForm({ ...themeForm, borderColor: e.target.value })}
                  className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                />
                <input
                  type="text"
                  value={themeForm.borderColor}
                  onChange={(e) => setThemeForm({ ...themeForm, borderColor: e.target.value })}
                  className="bg-[#1B1F23] border border-[#2C3238] rounded-lg p-2 text-xs text-white font-mono flex-1"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#2C3238]">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white text-xs font-semibold shadow-glow-subtle cursor-pointer"
            >
              <Save className="w-4 h-4" />
              <span>Apply Theme Colors</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: PRODUCTS INVENTORY */}
      {activeTab === 'products' && (
        <div className="bg-[#14171A] p-6 rounded-2xl border border-[#2C3238] space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-heading text-white">Manage Spare Parts Inventory</h2>
              <p className="text-xs text-gray-400">Add, edit, change pricing, and adjust stock status locally.</p>
            </div>
            <button
              onClick={openNewProductModal}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white text-xs font-bold shadow-glow-subtle"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Spare Part</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-300">
              <thead className="bg-[#1B1F23] text-gray-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3">Product</th>
                  <th className="p-3">Brand & Category</th>
                  <th className="p-3">SKU</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Stock Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2C3238]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#1B1F23]/40">
                    <td className="p-3 flex items-center gap-3">
                      <img
                        src={p.image}
                        alt=""
                        className="w-10 h-10 rounded object-cover bg-[#14171A]"
                      />
                      <span className="font-semibold text-white truncate max-w-xs">{p.name}</span>
                    </td>
                    <td className="p-3">
                      <span className="block text-white">{p.brand}</span>
                      <span className="text-gray-500 text-[10px]">{p.category}</span>
                    </td>
                    <td className="p-3 font-mono">{p.sku}</td>
                    <td className="p-3 font-bold text-white">₹{p.price}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          p.stockStatus === 'in-stock'
                            ? 'bg-emerald-950 text-emerald-400'
                            : p.stockStatus === 'on-request'
                            ? 'bg-amber-950 text-amber-400'
                            : 'bg-red-950 text-red-400'
                        }`}
                      >
                        {p.stockStatus}
                      </span>
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => {
                          setEditingProduct(p);
                          setIsNewProduct(false);
                        }}
                        className="p-1.5 rounded hover:bg-[#2C3238] text-gray-300 hover:text-white"
                        title="Edit product"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${p.name}"?`)) {
                            deleteProduct(p.id);
                            showToast('Product deleted from local catalogue.');
                          }
                        }}
                        className="p-1.5 rounded hover:bg-red-950 text-red-400"
                        title="Delete product"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: BRANDS & CATEGORIES TOGGLE */}
      {activeTab === 'categories' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brands */}
          <div className="bg-[#14171A] p-6 rounded-2xl border border-[#2C3238] space-y-4">
            <h3 className="font-heading font-bold text-base text-white border-b border-[#2C3238] pb-3">
              Motorcycle Brands (Enable / Disable)
            </h3>
            <div className="space-y-2">
              {brands.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1B1F23] border border-[#2C3238]"
                >
                  <span className="font-semibold text-xs text-white">{b.name}</span>
                  <button
                    onClick={() => toggleBrand(b.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      b.enabled
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {b.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-[#14171A] p-6 rounded-2xl border border-[#2C3238] space-y-4">
            <h3 className="font-heading font-bold text-base text-white border-b border-[#2C3238] pb-3">
              Product Categories (Enable / Disable)
            </h3>
            <div className="space-y-2">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#1B1F23] border border-[#2C3238]"
                >
                  <span className="font-semibold text-xs text-white">{c.name}</span>
                  <button
                    onClick={() => toggleCategory(c.id)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                      c.enabled
                        ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700'
                        : 'bg-gray-800 text-gray-400'
                    }`}
                  >
                    {c.enabled ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: BACKUP & JSON MIGRATION */}
      {activeTab === 'backup' && (
        <div className="bg-[#14171A] p-6 sm:p-8 rounded-2xl border border-[#2C3238] space-y-6">
          <div>
            <h2 className="text-lg font-bold font-heading text-white">Import Configuration JSON</h2>
            <p className="text-xs text-gray-400 mt-1">
              Paste a previously exported configuration JSON file here to restore all products, branding, and theme parameters instantly.
            </p>
          </div>

          {importStatus && (
            <div
              className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                importStatus.success
                  ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800'
                  : 'bg-red-950/60 text-red-300 border border-red-800'
              }`}
            >
              {importStatus.success ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{importStatus.msg}</span>
            </div>
          )}

          <textarea
            rows={8}
            placeholder="Paste raw JSON here..."
            value={importJsonText}
            onChange={(e) => setImportJsonText(e.target.value)}
            className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white font-mono"
          />

          <div className="flex gap-3">
            <button
              onClick={handleImport}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white text-xs font-semibold"
            >
              <Upload className="w-4 h-4" />
              <span>Validate & Import JSON</span>
            </button>
            <button
              onClick={handleExport}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-gray-300 border border-[#2C3238] text-xs font-semibold"
            >
              <Download className="w-4 h-4 text-[#FF6B24]" />
              <span>Download Current JSON</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL: ADD / EDIT PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#14171A] border border-[#2C3238] rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="font-heading font-bold text-lg text-white">
              {isNewProduct ? 'Add New Spare Part' : 'Edit Spare Part'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-gray-400 mb-1">Product Name</label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">SKU / Part Number</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku}
                    onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Brand</label>
                  <select
                    value={editingProduct.brand}
                    onChange={(e) => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white"
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                    className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1">Stock Availability</label>
                  <select
                    value={editingProduct.stockStatus}
                    onChange={(e) => setEditingProduct({ ...editingProduct, stockStatus: e.target.value as StockStatus })}
                    className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white"
                  >
                    <option value="in-stock">In Stock</option>
                    <option value="on-request">On Request</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Image URL</label>
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Compatible Bike Models (Comma separated)</label>
                <input
                  type="text"
                  value={editingProduct.compatibleModels?.join(', ') || ''}
                  onChange={(e) => setEditingProduct({
                    ...editingProduct,
                    compatibleModels: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })}
                  className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-[#1B1F23] border border-[#2C3238] rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-[#2C3238]">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-transparent text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
