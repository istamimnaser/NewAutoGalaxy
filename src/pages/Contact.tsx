import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', subject: '', message: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = encodeURIComponent(`Hi! ${form.subject}\n\nName: ${form.name}\nPhone: ${form.phone}\n\n${form.message}`);
    window.open(`https://wa.me/8801700000000?text=${msg}`, '_blank');
    setSubmitted(true);
  };

  const inputCls = "w-full bg-[#111] border border-white/10 text-white placeholder-white/30 px-4 py-3 rounded-xl focus:outline-none focus:border-[#C8962A]/50 text-sm";
  const labelCls = "block text-white/50 text-xs uppercase tracking-wider mb-2";

  return (
    <main className="pt-24 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-14">
          <div className="text-[#C8962A] text-xs tracking-[0.3em] uppercase mb-3">Reach Out</div>
          <h1 className="text-4xl md:text-5xl font-light text-white">Get In <span className="font-semibold">Touch</span></h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <div className="space-y-5 mb-10">
              {[
                { icon: <Phone size={18} />, label: 'Call / WhatsApp', value: '+880 17 0000 0000', href: 'tel:+8801700000000' },
                { icon: <Mail size={18} />, label: 'Email Us', value: 'info@newauto.com.bd', href: 'mailto:info@newauto.com.bd' },
                { icon: <MapPin size={18} />, label: 'Showroom', value: 'Dhaka, Bangladesh', href: '#map' },
                { icon: <Clock size={18} />, label: 'Hours', value: 'Sat–Thu 9am–8pm · Fri 2pm–8pm', href: undefined },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-[#111] border border-white/5 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-[#C8962A]/10 flex items-center justify-center text-[#C8962A] shrink-0">{icon}</div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider mb-1">{label}</div>
                    {href ? (
                      <a href={href} className="text-white hover:text-[#C8962A] transition-colors text-sm">{value}</a>
                    ) : (
                      <div className="text-white text-sm">{value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <a
              href="https://wa.me/8801700000000"
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-3 bg-[#25D366] text-white font-semibold py-4 rounded-full hover:bg-[#1ebe5a] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="flex flex-col items-center justify-center text-center p-12 bg-[#111] border border-white/5 rounded-2xl">
              <CheckCircle size={48} className="text-[#C8962A] mb-4" />
              <h3 className="text-2xl font-semibold text-white mb-2">Message Sent!</h3>
              <p className="text-white/50 mb-6">We'll get back to you very soon.</p>
              <button onClick={() => setSubmitted(false)} className="text-[#C8962A] border border-[#C8962A]/30 px-6 py-2.5 rounded-full text-sm hover:bg-[#C8962A]/10 transition-colors">
                Send Another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Name *</label>
                  <input required type="text" placeholder="Your name" value={form.name} onChange={set('name')} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Phone *</label>
                  <input required type="tel" placeholder="+880 1X XXXX XXXX" value={form.phone} onChange={set('phone')} className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Subject</label>
                <select value={form.subject} onChange={set('subject')} className={inputCls}>
                  <option value="">Select subject…</option>
                  <option>General Enquiry</option>
                  <option>Test Drive Request</option>
                  <option>Price Negotiation</option>
                  <option>Import Request</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Message *</label>
                <textarea required rows={5} placeholder="Tell us how we can help…" value={form.message} onChange={set('message')} className={inputCls + ' resize-none'} />
              </div>
              <button type="submit" className="w-full bg-[#C8962A] text-black font-bold py-4 rounded-full hover:bg-[#E8B84B] transition-colors text-sm tracking-wide">
                Send via WhatsApp →
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
