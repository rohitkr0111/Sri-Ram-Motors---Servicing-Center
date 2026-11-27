import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft, 
  MessageCircle, 
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '../../store/cartStore';
import { useCustomizationStore } from '../../store/customizationStore';
import { buildCartEnquiryUrl } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/cn';

export const Cart: React.FC = () => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);

  const shop = useCustomizationStore((state) => state.shop);
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0);

  const { url: waUrl, configured: isWaConfigured } = buildCartEnquiryUrl(
    shop.whatsappNumber,
    items,
    subtotal,
    shop.shopName,
    shop.currencySymbol || '₹'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2C3238] pb-6">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
            Shopping Cart Enquiry
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Review your selected motorcycle parts and initiate direct stock confirmation with our workshop.
          </p>
        </div>

        {items.length > 0 && (
          <button
            onClick={clearCart}
            className="text-xs text-red-400 hover:text-red-300 flex items-center gap-1.5 self-start sm:self-auto px-3 py-1.5 rounded-lg bg-red-950/40 border border-red-900/60"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear Cart</span>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        /* Empty Cart State */
        <div className="bg-[#14171A] rounded-2xl border border-[#2C3238] p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-[#1B1F23] border border-[#2C3238] flex items-center justify-center mx-auto text-gray-500">
            <ShoppingCart className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold font-heading text-white">Your Cart is Currently Empty</h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            You haven't added any spare parts yet. Explore our genuine parts catalogue for Hero, Bajaj, Honda, TVS, Yamaha, KTM, Royal Enfield, and scooters.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white text-xs font-semibold shadow-glow-subtle transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore Products</span>
            </Link>
          </div>
        </div>
      ) : (
        /* Populated Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Cart Items List (Col 8) */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-[#14171A] p-4 sm:p-5 rounded-xl border border-[#2C3238] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                {/* Product thumbnail & basic info */}
                <div className="flex items-center gap-4 flex-1">
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover bg-[#1B1F23] shrink-0 border border-[#2C3238]"
                  />
                  <div>
                    <span className="text-[10px] font-mono uppercase text-[#FF6B24] tracking-wider font-semibold">
                      {product.brand} • SKU: {product.sku}
                    </span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="block font-heading font-semibold text-sm sm:text-base text-white hover:text-[#FF6B24] transition-colors leading-snug"
                    >
                      {product.name}
                    </Link>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {formatPrice(product.price, shop.currencySymbol || '₹')} each
                    </span>
                  </div>
                </div>

                {/* Controls & item subtotal */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 border-[#2C3238] pt-3 sm:pt-0">
                  {/* Quantity stepper */}
                  <div className="flex items-center rounded-lg bg-[#1B1F23] border border-[#2C3238]">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 text-gray-400 hover:text-white"
                      title="Decrease"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-bold text-white min-w-[2rem] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 text-gray-400 hover:text-white"
                      title="Increase"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[5rem]">
                    <span className="block font-heading font-bold text-sm sm:text-base text-white">
                      {formatPrice(product.price * quantity, shop.currencySymbol || '₹')}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(product.id)}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="Remove part"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            <div className="pt-2">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-[#FF6B24] transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Continue Browsing More Parts</span>
              </Link>
            </div>
          </div>

          {/* Cart Summary & WhatsApp Checkout (Col 4) */}
          <div className="lg:col-span-4 bg-[#14171A] p-6 rounded-2xl border border-[#2C3238] space-y-6">
            <h3 className="font-heading font-bold text-lg text-white border-b border-[#2C3238] pb-3">
              Enquiry Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Total Items</span>
                <span className="font-semibold text-white">
                  {items.reduce((sum, item) => sum + item.quantity, 0)} units
                </span>
              </div>

              <div className="flex justify-between text-gray-300">
                <span>Estimated Subtotal</span>
                <span className="font-semibold text-white font-heading text-sm">
                  {formatPrice(subtotal, shop.currencySymbol || '₹')}
                </span>
              </div>

              <div className="p-3 bg-[#1B1F23] rounded-xl border border-[#2C3238] text-[11px] text-gray-400 space-y-1">
                <span className="font-semibold text-gray-300 block">Note on Offline Ordering:</span>
                <p>
                  This cart acts as an order enquiry mechanism. Once submitted, our shop desk will check physical shelf stock and confirm total price with applicable GST and fitting service.
                </p>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2C3238] space-y-3">
              {isWaConfigured ? (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs tracking-wide transition-all shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Send Cart Enquiry to WhatsApp</span>
                </a>
              ) : (
                <div className="space-y-2">
                  <div className="p-3 bg-amber-950/30 border border-amber-800/60 rounded-xl text-amber-300 text-xs flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>WhatsApp number is not configured in shop settings.</span>
                  </div>
                  <Link
                    to="/customizer"
                    className="block text-center text-xs text-[#FF6B24] underline"
                  >
                    Set WhatsApp number in Customizer
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
