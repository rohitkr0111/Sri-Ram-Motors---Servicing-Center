import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { brandLogos } from '../../data/brandLogos';
import { useCartStore } from '../../store/cartStore';
import { useCustomizationStore } from '../../store/customizationStore';
import { buildProductEnquiryUrl } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/cn';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const addItem = useCartStore((state) => state.addItem);
  const shop = useCustomizationStore((state) => state.shop);

  const { url: waUrl, configured: isWaConfigured } = buildProductEnquiryUrl(
    shop.whatsappNumber,
    product,
    shop.shopName,
    shop.currencySymbol || '₹'
  );

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="group relative bg-[#1B1F23] rounded-xl border border-[#2C3238] hover:border-[#FF6B24]/60 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:shadow-xl hover:shadow-black/50">
      <div>
        {/* Top Image Container */}
        <Link to={`/product/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-[#14171A]">
          <img
            src={imageError ? fallbackImage : product.image || fallbackImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Badges Overlay */}
          <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
            {product.badge && (
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-[#FF6B24] text-white shadow-md">
                {product.badge}
              </span>
            )}
            <span className="px-2 py-0.5 text-[10px] font-medium tracking-wider rounded bg-black/75 backdrop-blur-md text-gray-300 border border-white/10">
              {brandLogos[product.brand] && (<img src={brandLogos[product.brand]} alt={product.brand} className="h-5 w-auto inline-block mr-1" />)}{product.brand}
            </span>
          </div>

          {/* Stock status chip */}
          <div className="absolute top-2.5 right-2.5 z-10">
            {product.stockStatus === 'in-stock' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-600/40 rounded-full backdrop-blur-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                In Stock
              </span>
            ) : product.stockStatus === 'on-request' ? (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-amber-400 bg-amber-950/80 border border-amber-600/40 rounded-full backdrop-blur-sm">
                On Request
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold text-red-400 bg-red-950/80 border border-red-600/40 rounded-full backdrop-blur-sm">
                Out of Stock
              </span>
            )}
          </div>
        </Link>

        {/* Content Body */}
        <div className="p-4 space-y-2">
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-[#A1A7AE]">
            <span>{product.category}</span>
            <span className="font-mono text-[10px] text-gray-400">SKU: {product.sku}</span>
          </div>

          {/* Title */}
          <Link to={`/product/${product.slug}`} className="block">
            <h3 className="font-heading font-semibold text-sm sm:text-base text-white group-hover:text-[#FF6B24] transition-colors line-clamp-2 leading-snug">
              {product.name}
            </h3>
          </Link>

          {/* Manufacturer & Compatibility Snippet */}
          <div className="text-xs text-gray-400 flex items-center gap-1.5">
            <span className="text-gray-500">Mfr:</span>
            <span className="text-gray-300 font-medium">{product.manufacturer}</span>
          </div>

          {/* Compatible Models Indicator */}
          <div className="text-[11px] text-gray-400 truncate bg-[#14171A] px-2 py-1 rounded border border-[#2C3238]/60">
            {product.compatibleModels && product.compatibleModels.length > 0 ? (
              <span title={product.compatibleModels.join(', ')}>
                Fits: {product.compatibleModels[0]}
                {product.compatibleModels.length > 1 && ` +${product.compatibleModels.length - 1} more`}
              </span>
            ) : (
              <span className="italic text-gray-500">Check model compatibility</span>
            )}
          </div>
        </div>
      </div>

      {/* Footer Price & Actions */}
      <div className="p-4 pt-0">
        <div className="border-t border-[#2C3238] pt-3 flex items-center justify-between gap-2">
          {/* Pricing */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-white font-heading">
                {formatPrice(product.price, shop.currencySymbol || '₹')}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-gray-500 line-through">
                  {formatPrice(product.originalPrice, shop.currencySymbol || '₹')}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Direct WhatsApp Enquiry */}
            {isWaConfigured ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 hover:border-emerald-600 transition-all duration-200"
                title="Enquire on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            ) : (
              <Link
                to="/customizer"
                className="p-2 rounded-lg bg-[#242A30] text-gray-500 hover:text-gray-300 transition-colors"
                title="Configure WhatsApp in Customizer"
              >
                <AlertCircle className="w-4 h-4" />
              </Link>
            )}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className={`p-2 rounded-lg transition-all duration-200 flex items-center justify-center ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#FF6B24] hover:bg-[#FF8C42] text-white shadow-glow-subtle'
              }`}
              title="Add to Shopping Cart"
            >
              {addedAnimation ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <ShoppingCart className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
