import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Search, 
  Menu, 
  X, 
  MessageCircle, 
  Wrench, 
  ChevronRight,
  PhoneCall
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { useCartStore } from '../../store/cartStore';
import { isWhatsAppConfigured, sanitizeWhatsAppNumber } from '../../utils/whatsapp';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();
  const shop = useCustomizationStore((state) => state.shop);
  const items = useCartStore((state) => state.items);
  const totalCartItems = items.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setMobileMenuOpen(false);
      setSearchQuery('');
    }
  };

  const hasWhatsApp = isWhatsAppConfigured(shop.whatsappNumber);
  const waUrl = hasWhatsApp 
    ? `https://wa.me/${sanitizeWhatsAppNumber(shop.whatsappNumber)}?text=${encodeURIComponent(`Hello ${shop.shopName}, I'm browsing your online spare parts catalogue and have a question.`)}`
    : '#';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop Parts', path: '/shop' },
    { name: 'Categories', path: '/shop#categories' },
    { name: 'Brands', path: '/shop#brands' },
    { name: 'Contact', path: '/contact' },
    { name: 'Customizer', path: '/customizer' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0D0F]/95 backdrop-blur-md border-b border-[#2C3238] shadow-lg shadow-black/40 py-3'
            : 'bg-gradient-to-b from-[#0B0D0F]/90 via-[#0B0D0F]/60 to-transparent py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-3 group focus:outline-none">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF6B24] to-[#E0530E] p-2 flex items-center justify-center text-white shadow-glow-subtle group-hover:scale-105 transition-transform duration-200">
                <Wrench className="w-5 h-5 text-white stroke-[2.5]" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading font-bold text-lg sm:text-xl tracking-tight text-white group-hover:text-[#FF6B24] transition-colors leading-tight">
                  {shop.shopName}
                </span>
                <span className="text-[11px] font-medium text-[#A1A7AE] tracking-wider uppercase">
                  Spare Parts & Workshop
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-[#FF6B24] relative py-1 ${
                      isActive && link.path !== '/shop#categories' && link.path !== '/shop#brands'
                        ? 'text-[#FF6B24] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-[#FF6B24] after:rounded'
                        : 'text-gray-300'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </nav>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-4">
              {/* Search Toggle / Input */}
              <div className="relative">
                {searchOpen ? (
                  <form onSubmit={handleSearchSubmit} className="flex items-center">
                    <input
                      type="text"
                      autoFocus
                      placeholder="Search parts, SKU, bike..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-48 sm:w-64 bg-[#14171A] border border-[#FF6B24] text-white text-xs sm:text-sm rounded-lg px-3 py-1.5 focus:outline-none shadow-glow-subtle"
                    />
                    <button
                      type="button"
                      onClick={() => setSearchOpen(false)}
                      className="ml-1 p-1.5 text-gray-400 hover:text-white"
                      title="Close search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </form>
                ) : (
                  <button
                    onClick={() => setSearchOpen(true)}
                    className="p-2 text-gray-300 hover:text-[#FF6B24] hover:bg-[#1B1F23] rounded-lg transition-colors focus:outline-none"
                    aria-label="Open search bar"
                  >
                    <Search className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* WhatsApp Quick Link */}
              {hasWhatsApp ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold tracking-wide transition-all"
                  title="Enquire on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp</span>
                </a>
              ) : (
                <Link
                  to="/customizer"
                  className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gray-800 text-gray-400 text-xs border border-dashed border-gray-600 hover:text-white"
                  title="Configure WhatsApp number in Customizer"
                >
                  <span>+ WhatsApp</span>
                </Link>
              )}

              {/* Shopping Cart Button */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-300 hover:text-[#FF6B24] hover:bg-[#1B1F23] rounded-lg transition-colors focus:outline-none"
                aria-label={`View cart with ${totalCartItems} items`}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#FF6B24] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                    {totalCartItems}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-300 hover:text-white hover:bg-[#1B1F23] rounded-lg lg:hidden focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed top-16 right-0 bottom-0 w-full max-w-xs bg-[#14171A] border-l border-[#2C3238] p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Search on Mobile */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <input
                  type="text"
                  placeholder="Search parts, SKU, model..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-lg pl-3 pr-10 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF6B24]"
                >
                  <Search className="w-4 h-4" />
                </button>
              </form>

              {/* Links */}
              <div className="flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-lg text-gray-200 hover:text-[#FF6B24] hover:bg-[#1B1F23] text-base font-medium transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-500" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Actions on Mobile */}
            <div className="pt-6 border-t border-[#2C3238] space-y-3">
              {hasWhatsApp ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp Enquiries</span>
                </a>
              ) : (
                <div className="p-3 bg-[#1B1F23] rounded-lg border border-dashed border-gray-600 text-xs text-gray-400 text-center">
                  WhatsApp number not set. Configure in{' '}
                  <Link to="/customizer" className="text-[#FF6B24] underline" onClick={() => setMobileMenuOpen(false)}>
                    Customizer
                  </Link>
                </div>
              )}

              {shop.phone && (
                <a
                  href={`tel:${shop.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-[#1B1F23] hover:bg-[#2C3238] text-gray-200 font-medium text-sm transition-colors border border-[#2C3238]"
                >
                  <PhoneCall className="w-4 h-4 text-[#FF6B24]" />
                  <span>Call {shop.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
