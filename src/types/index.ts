export interface ShopConfig {
  shopName: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  openingHours: string;
  mapsEmbedUrl: string;
  heroHeadline: string;
  heroDescription: string;
  promoHeadline: string;
  promoDescription: string;
  currencySymbol: string;
}

export interface ThemeConfig {
  primaryColor: string;
  primaryHover: string;
  bgMain: string;
  bgSecondary: string;
  bgCard: string;
  textMain: string;
  textSecondary: string;
  borderColor: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  logoText?: string;
  image?: string;
  enabled: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconName: string;
  image?: string;
  enabled: boolean;
}

export interface MotorcycleModel {
  brandId: string;
  brandName: string;
  model: string;
}

export type StockStatus = 'in-stock' | 'out-of-stock' | 'on-request';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  gallery: string[];
  sku: string;
  brand: string; // Motorcycle brand or accessory brand
  compatibleModels: string[]; // Strict list of exact compatible bike models
  category: string; // e.g. 'Engine & Mechanical'
  manufacturer: string; // e.g. OEM, Bosch, Endurance, Brembo, Motul, NGK
  price: number;
  originalPrice?: number;
  stockStatus: StockStatus;
  featured: boolean;
  badge?: string;
  specifications: Record<string, string>;
  isSampleDemonstration?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
