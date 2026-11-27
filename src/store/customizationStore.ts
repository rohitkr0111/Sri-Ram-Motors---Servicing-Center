import { create } from 'zustand';
import { Brand, Category, Product, ShopConfig, ThemeConfig } from '../types';
import { defaultShopConfig } from '../config/shopConfig';
import { defaultThemeConfig } from '../config/themeConfig';
import { defaultBrands } from '../data/brands';
import { defaultCategories } from '../data/categories';
import { sampleProducts } from '../data/products';

const CUSTOMIZATION_STORAGE_KEY = 'sri_ram_customization_v1';

export interface CustomizationData {
  shop: ShopConfig;
  theme: ThemeConfig;
  brands: Brand[];
  categories: Category[];
  products: Product[];
}

interface CustomizationStore {
  shop: ShopConfig;
  theme: ThemeConfig;
  brands: Brand[];
  categories: Category[];
  products: Product[];

  // Update actions
  updateShopConfig: (shop: Partial<ShopConfig>) => void;
  updateThemeConfig: (theme: Partial<ThemeConfig>) => void;
  
  // Product actions
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Brand actions
  addBrand: (brand: Brand) => void;
  updateBrand: (id: string, brand: Partial<Brand>) => void;
  deleteBrand: (id: string) => void;
  toggleBrand: (id: string) => void;

  // Category actions
  addCategory: (category: Category) => void;
  updateCategory: (id: string, category: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  toggleCategory: (id: string) => void;

  // Import / Export / Reset
  exportConfig: () => string;
  importConfig: (jsonString: string) => { success: boolean; error?: string };
  resetToDefaults: () => void;
}

const getInitialData = (): CustomizationData => {
  try {
    const raw = localStorage.getItem(CUSTOMIZATION_STORAGE_KEY);
    if (!raw) {
      return {
        shop: defaultShopConfig,
        theme: defaultThemeConfig,
        brands: defaultBrands,
        categories: defaultCategories,
        products: sampleProducts
      };
    }
    const parsed = JSON.parse(raw);
    return {
      shop: { ...defaultShopConfig, ...(parsed.shop || {}) },
      theme: { ...defaultThemeConfig, ...(parsed.theme || {}) },
      brands: Array.isArray(parsed.brands) ? parsed.brands : defaultBrands,
      categories: Array.isArray(parsed.categories) ? parsed.categories : defaultCategories,
      products: Array.isArray(parsed.products) ? parsed.products : sampleProducts
    };
  } catch (err) {
    console.error('Failed to parse customization data from localStorage:', err);
    return {
      shop: defaultShopConfig,
      theme: defaultThemeConfig,
      brands: defaultBrands,
      categories: defaultCategories,
      products: sampleProducts
    };
  }
};

const persistState = (state: CustomizationData) => {
  try {
    localStorage.setItem(CUSTOMIZATION_STORAGE_KEY, JSON.stringify(state));
    applyThemeVariables(state.theme);
  } catch (err) {
    console.error('Failed to persist customization data:', err);
  }
};

export const applyThemeVariables = (theme: ThemeConfig) => {
  const root = document.documentElement;
  if (!root) return;
  root.style.setProperty('--color-primary', theme.primaryColor);
  root.style.setProperty('--color-primary-hover', theme.primaryHover);
  root.style.setProperty('--color-bg-main', theme.bgMain);
  root.style.setProperty('--color-bg-secondary', theme.bgSecondary);
  root.style.setProperty('--color-bg-card', theme.bgCard);
  root.style.setProperty('--color-text-main', theme.textMain);
  root.style.setProperty('--color-text-secondary', theme.textSecondary);
  root.style.setProperty('--color-border', theme.borderColor);
};

const initialData = getInitialData();
applyThemeVariables(initialData.theme);

export const useCustomizationStore = create<CustomizationStore>((set, get) => ({
  shop: initialData.shop,
  theme: initialData.theme,
  brands: initialData.brands,
  categories: initialData.categories,
  products: initialData.products,

  updateShopConfig: (shopUpdate) => {
    set((state) => {
      const updated = { ...state.shop, ...shopUpdate };
      persistState({ ...state, shop: updated });
      return { shop: updated };
    });
  },

  updateThemeConfig: (themeUpdate) => {
    set((state) => {
      const updated = { ...state.theme, ...themeUpdate };
      persistState({ ...state, theme: updated });
      return { theme: updated };
    });
  },

  addProduct: (newProduct) => {
    set((state) => {
      const updated = [newProduct, ...state.products];
      persistState({ ...state, products: updated });
      return { products: updated };
    });
  },

  updateProduct: (id, updates) => {
    set((state) => {
      const updated = state.products.map((p) => (p.id === id ? { ...p, ...updates } : p));
      persistState({ ...state, products: updated });
      return { products: updated };
    });
  },

  deleteProduct: (id) => {
    set((state) => {
      const updated = state.products.filter((p) => p.id !== id);
      persistState({ ...state, products: updated });
      return { products: updated };
    });
  },

  addBrand: (newBrand) => {
    set((state) => {
      const updated = [...state.brands, newBrand];
      persistState({ ...state, brands: updated });
      return { brands: updated };
    });
  },

  updateBrand: (id, updates) => {
    set((state) => {
      const updated = state.brands.map((b) => (b.id === id ? { ...b, ...updates } : b));
      persistState({ ...state, brands: updated });
      return { brands: updated };
    });
  },

  deleteBrand: (id) => {
    set((state) => {
      const updated = state.brands.filter((b) => b.id !== id);
      persistState({ ...state, brands: updated });
      return { brands: updated };
    });
  },

  toggleBrand: (id) => {
    set((state) => {
      const updated = state.brands.map((b) => (b.id === id ? { ...b, enabled: !b.enabled } : b));
      persistState({ ...state, brands: updated });
      return { brands: updated };
    });
  },

  addCategory: (newCategory) => {
    set((state) => {
      const updated = [...state.categories, newCategory];
      persistState({ ...state, categories: updated });
      return { categories: updated };
    });
  },

  updateCategory: (id, updates) => {
    set((state) => {
      const updated = state.categories.map((c) => (c.id === id ? { ...c, ...updates } : c));
      persistState({ ...state, categories: updated });
      return { categories: updated };
    });
  },

  deleteCategory: (id) => {
    set((state) => {
      const updated = state.categories.filter((c) => c.id !== id);
      persistState({ ...state, categories: updated });
      return { categories: updated };
    });
  },

  toggleCategory: (id) => {
    set((state) => {
      const updated = state.categories.map((c) => (c.id === id ? { ...c, enabled: !c.enabled } : c));
      persistState({ ...state, categories: updated });
      return { categories: updated };
    });
  },

  exportConfig: () => {
    const data: CustomizationData = {
      shop: get().shop,
      theme: get().theme,
      brands: get().brands,
      categories: get().categories,
      products: get().products
    };
    return JSON.stringify(data, null, 2);
  },

  importConfig: (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid configuration format: Expected a JSON object.' };
      }

      if (!parsed.shop && !parsed.products) {
        return { success: false, error: 'JSON does not contain recognized shop or products configuration.' };
      }

      const importedShop = parsed.shop ? { ...defaultShopConfig, ...parsed.shop } : get().shop;
      const importedTheme = parsed.theme ? { ...defaultThemeConfig, ...parsed.theme } : get().theme;
      const importedBrands = Array.isArray(parsed.brands) ? parsed.brands : get().brands;
      const importedCategories = Array.isArray(parsed.categories) ? parsed.categories : get().categories;
      const importedProducts = Array.isArray(parsed.products) ? parsed.products : get().products;

      const state: CustomizationData = {
        shop: importedShop,
        theme: importedTheme,
        brands: importedBrands,
        categories: importedCategories,
        products: importedProducts
      };

      persistState(state);
      set(state);

      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Error parsing JSON file.' };
    }
  },

  resetToDefaults: () => {
    localStorage.removeItem(CUSTOMIZATION_STORAGE_KEY);
    const defaults: CustomizationData = {
      shop: defaultShopConfig,
      theme: defaultThemeConfig,
      brands: defaultBrands,
      categories: defaultCategories,
      products: sampleProducts
    };
    persistState(defaults);
    set(defaults);
  }
}));
