import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingCart, 
  MessageCircle, 
  CheckCircle2, 
  AlertCircle,
  Bike
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { useCartStore } from '../../store/cartStore';
import { ProductCard } from '../../components/products/ProductCard';
import { buildProductEnquiryUrl } from '../../utils/whatsapp';
import { formatPrice } from '../../utils/cn';

export const ProductDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const products = useCustomizationStore((state) => state.products);
  const shop = useCustomizationStore((state) => state.shop);
  const addItem = useCartStore((state) => state.addItem);

  // Find exact product
  const product = products.find((p) => p.slug === slug);

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedToast, setAddedToast] = useState(false);

  // Fallback 404 state if product doesn't exist
  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="bg-[#14171A] rounded-2xl border border-[#2C3238] p-12 max-w-lg mx-auto space-y-4">
          <AlertCircle className="w-16 h-16 text-[#FF6B24] mx-auto" />
          <h1 className="text-2xl font-bold font-heading text-white">Product Not Found</h1>
          <p className="text-sm text-gray-400">
            The spare part you are looking for is either unavailable or has been removed from our current inventory.
          </p>
          <div className="pt-4 flex justify-center gap-3">
            <Link
              to="/shop"
              className="px-6 py-2.5 rounded-xl bg-[#FF6B24] text-white text-xs font-semibold hover:bg-[#FF8C42]"
            >
              Browse Spare Parts Catalogue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentImage = selectedImage || product.image || 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80';
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  // Related products (matching category or brand, excluding current)
  const relatedProducts = products
    .filter((p) => p.id !== product.id && (p.category === product.category || p.brand === product.brand))
    .slice(0, 4);

  const { url: waUrl, configured: isWaConfigured } = buildProductEnquiryUrl(
    shop.whatsappNumber,
    product,
    shop.shopName,
    shop.currencySymbol || '₹'
  );

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Catalogue</span>
      </button>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Product Images & Gallery (Col 6) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[4/3] rounded-2xl bg-[#14171A] border border-[#2C3238] overflow-hidden relative shadow-xl">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 px-3 py-1 text-xs font-bold uppercase rounded-lg bg-[#FF6B24] text-white shadow-md">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    currentImage === img ? 'border-[#FF6B24]' : 'border-[#2C3238] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Details & Purchase Action (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#FF6B24] uppercase">
                {product.brand}
              </span>
              <span className="text-gray-600">•</span>
              <span className="text-xs text-[#A1A7AE]">{product.category}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-white leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
              <span>SKU: <strong className="text-gray-200 font-mono">{product.sku}</strong></span>
              <span>Manufacturer: <strong className="text-gray-200">{product.manufacturer}</strong></span>
            </div>
          </div>

          {/* Price & Stock Display */}
          <div className="p-4 rounded-xl bg-[#14171A] border border-[#2C3238] flex items-center justify-between">
            <div>
              <span className="text-xs text-gray-400 block mb-0.5">Counter / Order Price</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-bold font-heading text-white">
                  {formatPrice(product.price, shop.currencySymbol || '₹')}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice, shop.currencySymbol || '₹')}
                  </span>
                )}
              </div>
            </div>

            {/* Stock status indicator */}
            <div>
              {product.stockStatus === 'in-stock' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-400 bg-emerald-950/80 border border-emerald-600/40 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  In Stock at Store
                </span>
              ) : product.stockStatus === 'on-request' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-amber-400 bg-amber-950/80 border border-amber-600/40 rounded-full">
                  Procured on Request
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-red-400 bg-red-950/80 border border-red-600/40 rounded-full">
                  Currently Out of Stock
                </span>
              )}
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
              Part Description
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Guaranteed Compatible Motorcycle Models (Rule 3) */}
          <div className="p-4 rounded-xl bg-[#14171A] border border-[#2C3238] space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#FF6B24] uppercase tracking-wider">
              <Bike className="w-4 h-4" />
              <span>Compatible Motorcycle Models</span>
            </div>
            {product.compatibleModels && product.compatibleModels.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-1">
                {product.compatibleModels.map((model, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#1B1F23] border border-[#2C3238] text-gray-200"
                  >
                    {model}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-xs text-amber-400 italic">
                Compatibility information not provided. Please contact the shop.
              </p>
            )}
          </div>

          {/* Action Row: Quantity + Add to Cart + WhatsApp Enquiry */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity selector */}
              <div className="flex items-center rounded-xl bg-[#14171A] border border-[#2C3238]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3.5 py-3 text-gray-300 hover:text-white text-sm"
                >
                  -
                </button>
                <span className="px-3 py-3 text-sm font-semibold text-white min-w-[2.5rem] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3.5 py-3 text-gray-300 hover:text-white text-sm"
                >
                  +
                </button>
              </div>

              {/* Add to Cart button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white font-semibold text-sm shadow-glow-subtle transition-all"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add {quantity} to Cart Enquiry</span>
              </button>
            </div>

            {/* Direct WhatsApp Enquiry Button */}
            {isWaConfigured ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Enquire via WhatsApp ({shop.whatsappNumber})</span>
              </a>
            ) : (
              <div className="p-3 bg-[#1B1F23] rounded-xl border border-dashed border-gray-600 text-xs text-gray-400 text-center">
                WhatsApp number is not configured in shop settings.
              </div>
            )}

            {addedToast && (
              <div className="p-3 rounded-lg bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Added to cart successfully! You can review items in the Cart page.</span>
              </div>
            )}
          </div>

          {/* Technical Specifications Table */}
          {product.specifications && Object.keys(product.specifications).length > 0 && (
            <div className="pt-4 border-t border-[#2C3238] space-y-3">
              <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
                Technical Specifications
              </h3>
              <div className="rounded-xl bg-[#14171A] border border-[#2C3238] overflow-hidden text-xs">
                {Object.entries(product.specifications).map(([key, val], idx) => (
                  <div
                    key={key}
                    className={`flex items-center justify-between p-3 ${
                      idx % 2 === 0 ? 'bg-[#14171A]' : 'bg-[#1B1F23]/40'
                    }`}
                  >
                    <span className="text-gray-400 font-medium">{key}</span>
                    <span className="text-white font-semibold text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <section className="pt-8 border-t border-[#2C3238] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white">
              Related Spares & Accessories
            </h2>
            <Link
              to={`/shop?category=${encodeURIComponent(product.category)}`}
              className="text-xs font-medium text-[#FF6B24] hover:underline"
            >
              More in {product.category}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
