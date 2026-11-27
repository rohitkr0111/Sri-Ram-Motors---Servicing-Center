import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';

export const Footer: React.FC = () => {
  const shop = useCustomizationStore((state) => state.shop);
  const allCategories = useCustomizationStore((state) => state.categories);
  const allBrands = useCustomizationStore((state) => state.brands);

  const categories = allCategories.filter((c) => c.enabled);
  const brands = allBrands.filter((b) => b.enabled);


  return (
    <footer className="bg-[#0B0D0F] border-t border-[#2C3238] text-gray-400">
      {/* Top Banner Feature Bar */}
      <div className="border-b border-[#2C3238]/60 bg-[#14171A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24] shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Genuine OEM Tested Parts</h4>
                <p className="text-xs text-[#A1A7AE] mt-0.5">High endurance materials, accurate specs & precision fit</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24] shrink-0">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Expert Servicing Advice</h4>
                <p className="text-xs text-[#A1A7AE] mt-0.5">Mechanic-verified recommendations & model fitment</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24] shrink-0">
                <MessageCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-semibold text-sm">Fast WhatsApp Order Desk</h4>
                <p className="text-xs text-[#A1A7AE] mt-0.5">Instant quotes, live parts photos & quick confirmation</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Col 1 & 2: Brand Profile */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B24] to-[#E0530E] p-2 flex items-center justify-center text-white shadow-glow-subtle">
                <Wrench className="w-5 h-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-heading font-bold text-xl text-white tracking-tight">
                  {shop.shopName}
                </span>
                <span className="block text-[11px] font-medium text-[#A1A7AE] uppercase tracking-wider">
                  Two Wheeler Spares & Workshop
                </span>
              </div>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              {shop.description || shop.tagline}
            </p>

            <div className="pt-2">
              <Link
                to="/customizer"
                className="inline-flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-lg bg-[#1B1F23] border border-[#2C3238] text-gray-300 hover:text-[#FF6B24] hover:border-[#FF6B24] transition-all"
              >
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#FF6B24]" />
                <span>Local Template Customizer</span>
              </Link>
            </div>
          </div>

          {/* Col 3: Product Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#FF6B24] pl-2">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <Link
                    to={`/shop?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-[#FF6B24] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Popular Motorcycle Brands */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#FF6B24] pl-2">
              Bikes Covered
            </h4>
            <ul className="space-y-2.5 text-sm">
              {brands.slice(0, 6).map((brand) => (
                <li key={brand.id}>
                  <Link
                    to={`/shop?brand=${encodeURIComponent(brand.name)}`}
                    className="hover:text-[#FF6B24] transition-colors flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3 h-3 text-gray-600" />
                    <span>{brand.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Contact & Store Hours */}
          <div className="space-y-3.5">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-l-2 border-[#FF6B24] pl-2">
              Visit Store
            </h4>

            {shop.address && (
              <div className="flex items-start gap-2.5 text-xs text-gray-300">
                <MapPin className="w-4 h-4 text-[#FF6B24] shrink-0 mt-0.5" />
                <span>{shop.address}</span>
              </div>
            )}

            {shop.phone && (
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <Phone className="w-4 h-4 text-[#FF6B24] shrink-0" />
                <a href={`tel:${shop.phone}`} className="hover:text-white transition-colors">
                  {shop.phone}
                </a>
              </div>
            )}

            {shop.email && (
              <div className="flex items-center gap-2.5 text-xs text-gray-300">
                <Mail className="w-4 h-4 text-[#FF6B24] shrink-0" />
                <a href={`mailto:${shop.email}`} className="hover:text-white transition-colors">
                  {shop.email}
                </a>
              </div>
            )}

            {shop.openingHours && (
              <div className="flex items-start gap-2.5 text-xs text-gray-300">
                <Clock className="w-4 h-4 text-[#FF6B24] shrink-0 mt-0.5" />
                <span>{shop.openingHours}</span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#2C3238] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            &copy; {new Date().getFullYear()} {shop.shopName}. All rights reserved. Commercial Motorcycle Parts Website Template.
          </div>
          <div className="flex items-center gap-6">
            <Link to="/shop" className="hover:text-gray-300">Product Catalogue</Link>
            <Link to="/cart" className="hover:text-gray-300">Cart Enquiry</Link>
            <Link to="/contact" className="hover:text-gray-300">Store Directions</Link>
            <Link to="/customizer" className="text-[#FF6B24] hover:underline">Config Panel</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
