import { CartItem, Product } from '../types';

/**
 * Cleans phone number to ensure digits only for WhatsApp wa.me links
 */
export const sanitizeWhatsAppNumber = (num: string): string => {
  return (num || '').replace(/[^0-9]/g, '');
};

/**
 * Validates whether the configured WhatsApp number is usable
 */
export const isWhatsAppConfigured = (num: string): boolean => {
  const clean = sanitizeWhatsAppNumber(num);
  return clean.length >= 10;
};

/**
 * Builds official wa.me enquiry link for a single product
 */
export const buildProductEnquiryUrl = (
  whatsappNumber: string,
  product: Product,
  shopName: string,
  currencySymbol = '₹'
): { url: string; configured: boolean; message: string } => {
  const cleanNum = sanitizeWhatsAppNumber(whatsappNumber);
  const isConfigured = cleanNum.length >= 10;

  const messageLines = [
    `*Hello ${shopName} team,*`,
    `I would like to enquire about the following spare part:`,
    ``,
    `*Part Name:* ${product.name}`,
    `*SKU / Part No.:* ${product.sku}`,
    `*Brand / Make:* ${product.brand}`,
    `*Manufacturer:* ${product.manufacturer}`,
    `*Price:* ${currencySymbol}${product.price.toLocaleString()}`,
    `*Availability:* ${product.stockStatus === 'in-stock' ? 'In Stock' : product.stockStatus === 'on-request' ? 'On Request' : 'Out of Stock'}`,
    ``,
    `Please confirm availability, fitting guidance, and order placement.`
  ];

  const fullMessage = messageLines.join('\n');
  const encoded = encodeURIComponent(fullMessage);
  const url = isConfigured ? `https://wa.me/${cleanNum}?text=${encoded}` : '#';

  return { url, configured: isConfigured, message: fullMessage };
};

/**
 * Builds official wa.me cart checkout enquiry link
 */
export const buildCartEnquiryUrl = (
  whatsappNumber: string,
  items: CartItem[],
  subtotal: number,
  shopName: string,
  currencySymbol = '₹'
): { url: string; configured: boolean; message: string } => {
  const cleanNum = sanitizeWhatsAppNumber(whatsappNumber);
  const isConfigured = cleanNum.length >= 10;

  const itemLines = items.map((item, index) => {
    return `${index + 1}. *${item.product.name}*\n   - SKU: ${item.product.sku}\n   - Qty: ${item.quantity}\n   - Price: ${currencySymbol}${item.product.price} each (Total: ${currencySymbol}${(item.product.price * item.quantity).toLocaleString()})\n   - Status: ${item.product.stockStatus}`;
  });

  const messageLines = [
    `*Spare Parts Enquiry / Order from ${shopName}*`,
    `----------------------------------------`,
    `Hello, I would like to check availability and place an order for the following items in my cart:`,
    ``,
    ...itemLines,
    ``,
    `----------------------------------------`,
    `*Total Estimated Subtotal:* ${currencySymbol}${subtotal.toLocaleString()}`,
    `*Total Items:* ${items.reduce((s, i) => s + i.quantity, 0)}`,
    ``,
    `Please advise on stock availability, pickup or delivery options, and payment details.`
  ];

  const fullMessage = messageLines.join('\n');
  const encoded = encodeURIComponent(fullMessage);
  const url = isConfigured ? `https://wa.me/${cleanNum}?text=${encoded}` : '#';

  return { url, configured: isConfigured, message: fullMessage };
};

/**
 * Builds contact form WhatsApp message link
 */
export const buildContactFormWhatsAppUrl = (
  whatsappNumber: string,
  formData: {
    name: string;
    phone: string;
    email: string;
    motorcycleBrand: string;
    motorcycleModel: string;
    productEnquiry: string;
    message: string;
  },
  shopName: string
): { url: string; configured: boolean; message: string } => {
  const cleanNum = sanitizeWhatsAppNumber(whatsappNumber);
  const isConfigured = cleanNum.length >= 10;

  const messageLines = [
    `*Direct Contact Enquiry - ${shopName}*`,
    `----------------------------------------`,
    `*Name:* ${formData.name}`,
    `*Phone:* ${formData.phone}`,
    formData.email ? `*Email:* ${formData.email}` : '',
    formData.motorcycleBrand ? `*Bike Brand:* ${formData.motorcycleBrand}` : '',
    formData.motorcycleModel ? `*Bike Model:* ${formData.motorcycleModel}` : '',
    formData.productEnquiry ? `*Part / Service Requested:* ${formData.productEnquiry}` : '',
    ``,
    `*Message Details:*`,
    formData.message,
    `----------------------------------------`
  ].filter(Boolean);

  const fullMessage = messageLines.join('\n');
  const encoded = encodeURIComponent(fullMessage);
  const url = isConfigured ? `https://wa.me/${cleanNum}?text=${encoded}` : '#';

  return { url, configured: isConfigured, message: fullMessage };
};
