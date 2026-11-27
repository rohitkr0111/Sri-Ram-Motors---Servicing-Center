import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle, 
  CheckCircle, 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink,
  ShieldCheck,
  Award,
  Cog,
  Wrench,
  Sparkles
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { ProductCard } from '../../components/products/ProductCard';
import { CompatibilityFinder } from '../../components/catalogue/CompatibilityFinder';
import { isWhatsAppConfigured, sanitizeWhatsAppNumber } from '../../utils/whatsapp';

export const Home: React.FC = () => {
  const shop = useCustomizationStore((state) => state.shop);
  const brands = useCustomizationStore((state) => state.brands);
  const categories = useCustomizationStore((state) => state.categories);
  const products = useCustomizationStore((state) => state.products);

  const enabledBrands = brands.filter((b) => b.enabled);
  const enabledCategories = categories.filter((c) => c.enabled);

  // Featured products (6-8 items)
  const featuredProducts = products.filter((p) => p.featured).slice(0, 8);
  const displayFeatured = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 6);

  const hasWhatsApp = isWhatsAppConfigured(shop.whatsappNumber);
  const waUrl = hasWhatsApp 
    ? `https://wa.me/${sanitizeWhatsAppNumber(shop.whatsappNumber)}?text=${encodeURIComponent(`Hello ${shop.shopName}, I would like to enquire about your services and available spare parts.`)}`
    : '#';

  const directionsUrl = shop.address
    ? `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(shop.address)}`
    : '#';

  return (
    <div className="space-y-16 lg:space-y-24 pb-16">
      {/* SECTION 1: HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0B0D0F] via-[#14171A] to-[#0B0D0F] pt-8">
        {/* Cinematic Backdrop Image with Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=2000&q=85"
            alt="Motorcycle Performance Workshop"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F] via-[#0B0D0F]/80 to-transparent" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0D0F]/60 to-[#0B0D0F]" />
        </div>

        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FF6B24]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left Text */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1B1F23]/80 border border-[#2C3238] text-xs font-semibold text-gray-300">
              <span className="w-2 h-2 rounded-full bg-[#FF6B24] animate-ping" />
              <span>Genuine Spares & Certified Fitment Workshop</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white leading-tight uppercase">
              {shop.heroHeadline || "EVERY RIDE DESERVES THE BEST PARTS."}
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-2xl leading-relaxed">
              {shop.heroDescription || "Discover motorcycle spare parts, essential components, and riding accessories from the brands you trust."}
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link
                to="/shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white font-semibold text-base shadow-glow-primary transition-all duration-300 group"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              {hasWhatsApp ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-emerald-400 hover:text-emerald-300 border border-emerald-500/40 text-base font-semibold transition-all duration-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Contact Our Store</span>
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-gray-200 border border-[#2C3238] text-base font-semibold transition-all duration-300"
                >
                  <span>Contact Our Store</span>
                </Link>
              )}
            </div>

            {/* Quick trust metrics */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#2C3238]/60 text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-bold text-white font-heading">100%</span>
                <span className="text-xs text-[#A1A7AE]">OEM Spec Components</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold text-white font-heading">10+</span>
                <span className="text-xs text-[#A1A7AE]">Major Brands Covered</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold text-white font-heading">Direct</span>
                <span className="text-xs text-[#A1A7AE]">WhatsApp Stock Check</span>
              </div>
            </div>
          </div>

          {/* Hero Right Visual Showcase */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md aspect-square rounded-2xl bg-gradient-to-br from-[#1B1F23] to-[#14171A] p-3 border border-[#2C3238] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80"
                alt="Engine Piston and Components"
                className="w-full h-full object-cover rounded-xl"
              />
              {/* Floating part badge */}
              <div className="absolute -bottom-4 -left-4 bg-[#14171A]/95 border border-[#FF6B24]/40 p-3.5 rounded-xl shadow-xl backdrop-blur-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#FF6B24]/20 flex items-center justify-center text-[#FF6B24]">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-xs font-bold text-white">Precision Fitment</span>
                  <span className="text-[11px] text-gray-400">Guaranteed model matching</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MOTORCYCLE COMPATIBILITY FINDER WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <CompatibilityFinder />
      </section>

      {/* SECTION 2: SHOP BY BRAND */}
      <section id="brands" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#2C3238] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">Manufacturer Network</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Shop by Motorcycle Brand</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-medium text-[#FF6B24] hover:text-[#FF8C42] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Brands</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 sm:gap-4">
          {enabledBrands.map((brand) => (
            <Link
              key={brand.id}
              to={`/shop?brand=${encodeURIComponent(brand.name)}`}
              className="group p-4 rounded-xl bg-[#14171A] border border-[#2C3238] hover:border-[#FF6B24] hover:bg-[#1B1F23] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-mono font-bold tracking-widest text-[#FF6B24] uppercase mb-1">
                  {brand.logoText || brand.name}
                </div>
                <h3 className="font-heading font-semibold text-sm sm:text-base text-white group-hover:text-[#FF6B24] transition-colors">
                  {brand.name}
                </h3>
                {brand.description && (
                  <p className="text-[11px] text-[#A1A7AE] mt-1.5 line-clamp-2 leading-relaxed">
                    {brand.description}
                  </p>
                )}
              </div>
              <div className="mt-4 pt-3 border-t border-[#2C3238]/60 flex items-center justify-between text-[11px] font-medium text-gray-400 group-hover:text-white">
                <span>Explore Parts</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#FF6B24] group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 3: PRODUCT CATEGORIES */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#2C3238] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">Catalogue Navigation</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Product Categories</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-medium text-[#FF6B24] hover:text-[#FF8C42] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Complete Catalogue</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {enabledCategories.map((cat) => (
            <Link
              key={cat.id}
              to={`/shop?category=${encodeURIComponent(cat.name)}`}
              className="group p-5 rounded-xl bg-[#1B1F23] border border-[#2C3238] hover:border-[#FF6B24] transition-all duration-300 flex items-start gap-4 hover:shadow-lg hover:shadow-black/40"
            >
              <div className="w-12 h-12 rounded-lg bg-[#14171A] border border-[#2C3238] flex items-center justify-center text-[#FF6B24] group-hover:bg-[#FF6B24] group-hover:text-white transition-colors shrink-0">
                <Cog className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-semibold text-base text-white group-hover:text-[#FF6B24] transition-colors">
                    {cat.name}
                  </h3>
                  <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-[#FF6B24] group-hover:translate-x-1 transition-all" />
                </div>
                <p className="text-xs text-[#A1A7AE] mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION 4: FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4 border-b border-[#2C3238] pb-4">
          <div>
            <span className="text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">Mechanic Recommended</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Featured Spare Parts</h2>
          </div>
          <Link
            to="/shop"
            className="text-xs sm:text-sm font-medium text-[#FF6B24] hover:text-[#FF8C42] flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All ({products.length}) Parts</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {displayFeatured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* SECTION 5: PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#14171A] via-[#1B1F23] to-[#14171A] border border-[#2C3238] p-8 sm:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#FF6B24]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FF6B24]/10 border border-[#FF6B24]/30 text-[#FF6B24] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Specialized Workshop Standard
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white leading-tight">
              {shop.promoHeadline || "UPGRADE YOUR RIDE. ELEVATE YOUR PERFORMANCE."}
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {shop.promoDescription || "OEM certified components, heavy-duty clutch plates, precision disc rotors, and high-flow filters engineered for maximum durability on every road."}
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <Link
                to="/shop"
                className="px-6 py-3 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white font-semibold text-sm shadow-glow-subtle transition-all"
              >
                Browse Heavy Duty Spares
              </Link>
              <Link
                to="/contact"
                className="px-6 py-3 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-gray-200 border border-[#2C3238] font-medium text-sm transition-all"
              >
                Request Custom Part
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: WHY CHOOSE US */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">Quality Assurance</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Why Source Your Parts From Us</h2>
          <p className="text-sm text-gray-400 mt-2">
            Every component in our catalogue is vetted for precise mechanical tolerance, thermal durability, and verified vehicle fitment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 rounded-xl bg-[#14171A] border border-[#2C3238] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-white">100% Genuine Spec</h3>
            <p className="text-xs text-[#A1A7AE] leading-relaxed">
              Sourced from verified Tier-1 OEM suppliers to ensure exact factory clearance and long operating life.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14171A] border border-[#2C3238] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24]">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-white">Workshop Tested</h3>
            <p className="text-xs text-[#A1A7AE] leading-relaxed">
              Fitted and tested on daily road conditions by our experienced motorcycle workshop mechanics.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14171A] border border-[#2C3238] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24]">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-white">Transparent Pricing</h3>
            <p className="text-xs text-[#A1A7AE] leading-relaxed">
              Clear MRP listings with no hidden charges. Local invoice and part verification provided with every order.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-[#14171A] border border-[#2C3238] space-y-3">
            <div className="w-12 h-12 rounded-lg bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center text-[#FF6B24]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-semibold text-base text-white">Quick WhatsApp Desk</h3>
            <p className="text-xs text-[#A1A7AE] leading-relaxed">
              Send your bike RC copy or part photo for instantaneous identification and availability status.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 7: ABOUT THE SHOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#14171A] rounded-2xl border border-[#2C3238] p-6 sm:p-10">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">About Our Workshop</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
              {shop.shopName}
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              {shop.description || "Sri Ram Motors & Servicing Center provides riders and independent mechanics with genuine motorcycle spare parts, engine rebuild components, lubricants, electricals, and accessories."}
            </p>
            <div className="space-y-2 text-xs text-gray-300 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Specialized parts support for commuter bikes, sport nakeds, cruisers & automatic scooters.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>On-site servicing, periodic maintenance, and spare part installation by skilled technicians.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Direct customer communication and part photo verification on WhatsApp.</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-[#FF6B24] border border-[#2C3238] font-semibold text-sm transition-colors"
              >
                <span>Visit Or Contact Our Center</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-[#2C3238] shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1000&q=80"
                alt="Motorcycle Servicing Workshop"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8: STORE LOCATION & GOOGLE MAPS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">Physical Store</span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white mt-1">Visit Sri Ram Motors</h2>
          <p className="text-sm text-gray-400 mt-2">
            Pick up your ordered parts directly from our counter or drop your motorcycle for scheduled servicing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Map Embed or Setup Notice */}
          <div className="lg:col-span-8 bg-[#14171A] rounded-2xl border border-[#2C3238] overflow-hidden min-h-[360px] flex flex-col">
            {shop.mapsEmbedUrl ? (
              <iframe
                src={shop.mapsEmbedUrl}
                title="Google Maps Store Location"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full flex-grow filter invert-[0.9] hue-rotate-180 contrast-125"
              />
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-gray-400 space-y-3">
                <MapPin className="w-10 h-10 text-gray-600" />
                <h4 className="text-base font-semibold text-white">Google Map URL Not Configured</h4>
                <p className="text-xs max-w-sm">
                  Add your store's Google Maps embed URL in the Local Customizer to display a live map here.
                </p>
                <Link
                  to="/customizer"
                  className="px-4 py-2 rounded-lg bg-[#1B1F23] border border-[#2C3238] text-xs text-[#FF6B24]"
                >
                  Configure in Customizer
                </Link>
              </div>
            )}
          </div>

          {/* Store Info Card */}
          <div className="lg:col-span-4 bg-[#14171A] rounded-2xl border border-[#2C3238] p-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-white border-b border-[#2C3238] pb-3">
                Store Information
              </h3>

              <div className="flex items-start gap-3 text-sm text-gray-300">
                <MapPin className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white text-xs uppercase tracking-wider text-gray-400">Address</span>
                  <p className="mt-0.5 text-xs text-gray-300 leading-relaxed">
                    {shop.address || "Address not configured. Please update in Customizer."}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Clock className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white text-xs uppercase tracking-wider text-gray-400">Hours</span>
                  <p className="mt-0.5 text-xs text-gray-300">
                    {shop.openingHours || "Mon - Sat: 9:00 AM - 8:30 PM"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-sm text-gray-300">
                <Phone className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
                <div>
                  <span className="block font-semibold text-white text-xs uppercase tracking-wider text-gray-400">Direct Helpline</span>
                  <a href={`tel:${shop.phone}`} className="mt-0.5 block text-xs text-gray-300 hover:text-[#FF6B24]">
                    {shop.phone || "Not configured"}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#2C3238]">
              {shop.address && (
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-white border border-[#2C3238] text-xs font-semibold transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-[#FF6B24]" />
                  <span>Get Driving Directions</span>
                </a>
              )}

              {hasWhatsApp && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
