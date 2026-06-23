import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const brands = ['Toyota', 'Honda', 'BMW', 'Mercedes-Benz', 'Lexus', 'Nissan', 'Mitsubishi', 'Hyundai', 'Kia', 'Other'];

export default function SellYourCar() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', phone: '', email: '', brand: '', model: '', year: '', mileage: '', color: '', condition: '', price: '', notes: '',
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi! I want to sell my car.\n\nName: ${form.name}\nPhone: ${form.phone}\nCar: ${form.year} ${form.brand} ${form.model}\nMileage: ${form.mileage}\nColor: ${form.color}\nCondition: ${form.condition}\nAsking Price: ৳${form.price}\n\nNotes: ${form.notes}`
    );
    window.open(`https://wa.me/8801700000000?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="pt-24 pb-20 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <div className="w-20 h-20 bg-[#C8962A]/15 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-[#C8962A]" />
          </div>
          <h2 className="text-3xl font-semibold text-white mb-3">Request Sent!</h2>
          <p className="text-white/50 mb-8">Our team will get back to you within 24 hours with a valuation.</p>
          <button onClick={() => setSubmitted(false)} className="text-[#C8962A] border border-[#C8962A]/30 px-6 py-3 rounded-full hover:bg-[#C8962A]/10 transition-colors text-sm">
            Submit Another
          </button>
        </div>
      </main>
    );
  }

  const inputCls = "w-full bg-[#111] border border-white/10 text-white placeholder-white/30 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8962A]/50 text-sm";
  const labelCls = "block text-white/50 text-xs uppercase tracking-wider mb-2";

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Get Top Value</div>
          <h1 className="text-4xl md:text-5xl font-light text-white mb-4">
            Sell Your <span className="font-semibold">Car</span>
          </h1>
          <p className="text-white/50 leading-relaxed">
            Fill in your car's details and we'll reach out with the best offer. No haggling, no stress.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="p-6 bg-[#111] border border-white/5 rounded-2xl space-y-5">
            <h3 className="text-white font-medium text-sm tracking-wider uppercase">Your Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Full Name *</label>
                <input required type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Phone *</label>
                <input required type="tel" placeholder="+880 1X XXXX XXXX" value={form.phone} onChange={set('phone')} className={inputCls} />
              </div>
            </div>
            <div>
              <label className={labelCls}>Email</label>
              <input type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} className={inputCls} />
            </div>
          </div>

          <div className="p-6 bg-[#111] border border-white/5 rounded-2xl space-y-5">
            <h3 className="text-white font-medium text-sm tracking-wider uppercase">Car Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Brand *</label>
                <select required value={form.brand} onChange={set('brand')} className={inputCls}>
                  <option value="">Select brand</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className={labelCls}>Model *</label>
                <input required type="text" placeholder="e.g. Camry, X5" value={form.model} onChange={set('model')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Year *</label>
                <input required type="number" placeholder="2019" min="2000" max="2026" value={form.year} onChange={set('year')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Mileage</label>
                <input type="text" placeholder="e.g. 45,000 km" value={form.mileage} onChange={set('mileage')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Color</label>
                <input type="text" placeholder="Pearl White" value={form.color} onChange={set('color')} className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Condition</label>
                <select value={form.condition} onChange={set('condition')} className={inputCls}>
                  <option value="">Select…</option>
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Fair</option>
                  <option>Needs Work</option>
                </select>
              </div>
            </div>
            <div>
              <label className={labelCls}>Asking Price (BDT)</label>
              <input type="number" placeholder="3500000" value={form.price} onChange={set('price')} className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Additional Notes</label>
              <textarea rows={3} placeholder="Any extras, modifications, or issues to mention…" value={form.notes} onChange={set('notes')} className={inputCls + ' resize-none'} />
            </div>
          </div>

          <button type="submit" className="w-full bg-[#C8962A] text-black font-bold py-4 rounded-full hover:bg-[#E8B84B] transition-colors text-sm tracking-wide">
            Submit via WhatsApp →
          </button>
          <p className="text-center text-white/25 text-xs">We'll respond within 24 hours with a fair valuation.</p>
        </form>
      </div>
    </main>
  );
}
