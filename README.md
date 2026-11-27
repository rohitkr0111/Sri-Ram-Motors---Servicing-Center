# Sri Ram Motors & Servicing Center - Commercial Motorcycle Spare Parts Template

A high-performance, responsive motorcycle spare parts and accessories e-commerce website template built with a strictly frontend-only architecture.

Designed for independent motorcycle garages, authorized spare parts retailers, and performance tuning shops.

---

## 🛠️ Technology Stack

- **Frontend:** React 18 + TypeScript
- **Styling:** Tailwind CSS (Custom Dark Automotive Theme)
- **State Management:** Zustand with LocalStorage Persistence
- **Routing:** React Router v6
- **Icons:** Lucide React
- **Build Tool:** Vite 5

---

## 🚀 Key Features

1. **Centralized Brand & Store Configuration:**
   - Centralized configuration in `src/config/shopConfig.ts` and `src/config/themeConfig.ts`.
   - Modify shop name, helpline, address, opening hours, Google Maps embed, and WhatsApp numbers in one place.

2. **Data-Driven Motorcycle Compatibility Finder:**
   - Strict model-level compatibility matching.
   - Choose Brand (Hero, Bajaj, TVS, KTM, Royal Enfield, Honda, Honda Activa, Yamaha, Suzuki, Universal) -> Choose Model -> Choose Part Category.
   - Shows verified compatible parts from `compatibleModels` data.

3. **Complete Spare Parts Catalogue (`/shop`):**
   - Real-time instant search across Part Name, SKU, Motorcycle Model, Category, and Manufacturer.
   - Multi-facet filters: Brand, Category, Bike Model, Stock Availability, Manufacturer, and Price Slider.
   - Sorting by: Featured First, Price (Low to High), Price (High to Low), and Name (A-Z).
   - "Load More" pagination and responsive mobile filter drawer.

4. **Detailed Product Showcase (`/product/:slug`):**
   - Multi-image gallery with active thumbnail selector.
   - Part numbers / SKU, manufacturer tier, and stock indicators (In Stock, On Request, Out of Stock).
   - List of exact compatible motorcycle models.
   - Technical specifications table.
   - Related spare parts recommendations.
   - Direct WhatsApp enquiry action.

5. **Client-Side Shopping Cart (`/cart`):**
   - Instant add/remove/quantity adjust with Zustand and LocalStorage persistence.
   - Automatic subtotal and item counter calculations.
   - One-click formatted WhatsApp cart order generation.

6. **Local Customization Panel (`/customizer`):**
   - Browser-local customization of business info, colors, products, brands, and categories.
   - Full JSON Export and Validated JSON Import for seamless data migration.
   - Reset to factory defaults.

7. **Direct WhatsApp Integration:**
   - Uses official `https://wa.me/<number>?text=...` format.
   - URL-encoded order details, part names, SKUs, and estimated subtotals.
   - Graceful fallback and guidance when WhatsApp number is unconfigured.

---

## 💻 Local Development & Build

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Run TypeScript check and production build
npm run build

# Preview production build
npm run preview
```

---

## 📦 Static Deployment

This static template builds clean static assets into `dist/` ready to deploy on:
- **Vercel**
- **Netlify**
- **GitHub Pages**
- Any static web server or CDN (Nginx, Apache, Cloudflare Pages, AWS S3)

No backend database, Node.js server, or server environment variables required.
