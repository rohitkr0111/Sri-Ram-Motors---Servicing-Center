import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useCustomizationStore } from '../../store/customizationStore';
import { buildContactFormWhatsAppUrl, isWhatsAppConfigured } from '../../utils/whatsapp';

export const Contact: React.FC = () => {
  const shop = useCustomizationStore((state) => state.shop);
  const allBrands = useCustomizationStore((state) => state.brands);
  const brands = allBrands.filter((b) => b.enabled);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    motorcycleBrand: '',
    motorcycleModel: '',
    productEnquiry: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hasWhatsApp = isWhatsAppConfigured(shop.whatsappNumber);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Frontend validation
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMsg('Please fill in your name, contact phone number, and enquiry message.');
      return;
    }

    setErrorMsg('');
    setSubmitted(true);
  };

  const { url: waUrl } = buildContactFormWhatsAppUrl(
    shop.whatsappNumber,
    formData,
    shop.shopName
  );

  const mailtoUrl = `mailto:${shop.email || 'contact@srirammotors.local'}?subject=${encodeURIComponent(`Parts Enquiry from ${formData.name}`)}&body=${encodeURIComponent(
    `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nBike: ${formData.motorcycleBrand} ${formData.motorcycleModel}\nPart/Service: ${formData.productEnquiry}\n\nMessage:\n${formData.message}`
  )}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-white">
          Contact Sri Ram Motors
        </h1>
        <p className="text-sm text-gray-400">
          Reach our counter for part availability, price verification, fitment queries, or scheduled servicing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact Info Card (Col 5) */}
        <div className="lg:col-span-5 bg-[#14171A] p-6 sm:p-8 rounded-2xl border border-[#2C3238] space-y-6">
          <h2 className="text-xl font-bold font-heading text-white border-b border-[#2C3238] pb-3">
            Store Contact Details
          </h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Store Address</span>
                <p className="mt-0.5 text-xs text-gray-200 leading-relaxed">
                  {shop.address || "Address placeholder. Update in Customizer."}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <Phone className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Helpline</span>
                <a href={`tel:${shop.phone}`} className="mt-0.5 block text-xs text-gray-200 hover:text-[#FF6B24]">
                  {shop.phone || "Not configured"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <Mail className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Email Desk</span>
                <a href={`mailto:${shop.email}`} className="mt-0.5 block text-xs text-gray-200 hover:text-[#FF6B24]">
                  {shop.email || "Not configured"}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3 text-sm text-gray-300">
              <Clock className="w-5 h-5 text-[#FF6B24] shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs uppercase tracking-wider text-gray-400 font-semibold">Operating Hours</span>
                <p className="mt-0.5 text-xs text-gray-200">
                  {shop.openingHours || "Mon - Sat: 9:00 AM - 8:30 PM"}
                </p>
              </div>
            </div>
          </div>

          {/* Static Notice Rule 4 & 13 */}
          <div className="p-4 rounded-xl bg-[#1B1F23] border border-[#2C3238] text-xs text-gray-400 space-y-1">
            <span className="font-semibold text-gray-200 block">Direct Order & Enquiry Policy</span>
            <p>
              To ensure instant support, we process enquiries through direct WhatsApp or telephone. This form generates a ready-to-send message for your convenience.
            </p>
          </div>
        </div>

        {/* Contact Form (Col 7) */}
        <div className="lg:col-span-7 bg-[#14171A] p-6 sm:p-8 rounded-2xl border border-[#2C3238]">
          <h2 className="text-xl font-bold font-heading text-white mb-6">
            Send an Enquiry
          </h2>

          {submitted ? (
            /* Post-validation Action Summary */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800 text-emerald-300 text-xs sm:text-sm flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Enquiry Prepared!</span>
                  <p className="mt-1">
                    Your enquiry details have been formatted. Because this is a static website, please click below to send via WhatsApp or Email to complete your enquiry.
                  </p>
                </div>
              </div>

              {/* Form Summary Card */}
              <div className="bg-[#1B1F23] p-4 rounded-xl border border-[#2C3238] space-y-2 text-xs">
                <div className="flex justify-between text-gray-300">
                  <span className="text-gray-500">Sender:</span>
                  <span className="font-semibold text-white">{formData.name} ({formData.phone})</span>
                </div>
                {formData.motorcycleBrand && (
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-500">Bike:</span>
                    <span className="font-semibold text-white">{formData.motorcycleBrand} {formData.motorcycleModel}</span>
                  </div>
                )}
                {formData.productEnquiry && (
                  <div className="flex justify-between text-gray-300">
                    <span className="text-gray-500">Part:</span>
                    <span className="font-semibold text-white">{formData.productEnquiry}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#2C3238] text-gray-300">
                  <span className="text-gray-500 block mb-1">Message:</span>
                  <p className="bg-[#14171A] p-2 rounded text-gray-300">{formData.message}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                {hasWhatsApp && (
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </a>
                )}

                <a
                  href={mailtoUrl}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#1B1F23] hover:bg-[#242A30] text-gray-200 border border-[#2C3238] font-semibold text-xs transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#FF6B24]" />
                  <span>Send via Email Client</span>
                </a>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-3 rounded-xl bg-transparent text-gray-400 hover:text-white text-xs"
                >
                  Edit Message
                </button>
              </div>
            </div>
          ) : (
            /* Input Form */
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMsg && (
                <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="e.g. name@example.com"
                    className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Motorcycle Brand
                  </label>
                  <select
                    name="motorcycleBrand"
                    value={formData.motorcycleBrand}
                    onChange={handleChange}
                    className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  >
                    <option value="">-- Select Brand --</option>
                    {brands.map((b) => (
                      <option key={b.id} value={b.name}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Motorcycle Model
                  </label>
                  <input
                    type="text"
                    name="motorcycleModel"
                    value={formData.motorcycleModel}
                    onChange={handleChange}
                    placeholder="e.g. Splendor Plus / Pulsar 150"
                    className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                    Spare Part / Service Needed
                  </label>
                  <input
                    type="text"
                    name="productEnquiry"
                    value={formData.productEnquiry}
                    onChange={handleChange}
                    placeholder="e.g. Clutch Plate or General Service"
                    className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase mb-1.5">
                  Your Message / Specifications <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Specify part numbers, model manufacturing year, or specific repair concerns..."
                  className="w-full bg-[#1B1F23] border border-[#2C3238] focus:border-[#FF6B24] rounded-xl p-3 text-xs text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#FF6B24] hover:bg-[#FF8C42] text-white font-semibold text-xs shadow-glow-subtle transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Prepare Enquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
