import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { Select, Rate, Spin } from 'antd';
import { Search, ShieldCheck, BadgeDollarSign, Wrench, Handshake, ArrowRight, CalendarDays } from 'lucide-react';
import moment from 'moment';
import api from '../api/client';
import { MAKES, BODY_TYPES } from '../data/constants';
import CarCard from '../components/CarCard';

const HERO_IMG =
  'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=75';

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState({ make: undefined, body_type: undefined, max_price: undefined });
  const [featured, setFeatured] = useState([]);
  const [latest, setLatest] = useState([]);
  const [news, setNews] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    Promise.allSettled([
      api.get('/cars', { params: { featured: true, per_page: 6 } }),
      api.get('/cars', { params: { sort: 'newest', per_page: 4 } }),
      api.get('/news', { params: { per_page: 3 } }),
      api.get('/testimonials'),
    ]).then(([f, l, n, t]) => {
      if (!alive) return;
      if (f.status === 'fulfilled') setFeatured(f.value.data.data.data);
      if (l.status === 'fulfilled') setLatest(l.value.data.data.data);
      if (n.status === 'fulfilled') setNews(n.value.data.data.data);
      if (t.status === 'fulfilled') setTestimonials(t.value.data.data.slice(0, 3));
      setLoading(false);
    });
    return () => { alive = false; };
  }, []);

  const search = () => {
    const params = new URLSearchParams();
    if (q.make) params.set('make', q.make);
    if (q.body_type) params.set('body_type', q.body_type);
    if (q.max_price) params.set('max_price', q.max_price);
    navigate(`/inventory?${params.toString()}`);
  };

  return (
    <div>
      {/* Hero */}
      <section
        className="relative bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_IMG})` }}
      >
        <div className="hero-gradient">
          <div className="max-w-7xl mx-auto px-4 py-24 lg:py-36">
            <p className="text-[#e0292f] font-bold uppercase tracking-widest text-sm mb-3">
              Springfield’s #1 Rated Dealership
            </p>
            <h1 className="text-white text-4xl lg:text-6xl font-extrabold leading-tight m-0 max-w-2xl">
              Find Your Perfect Car at the Perfect Price
            </h1>
            <p className="text-gray-300 text-lg mt-5 max-w-xl">
              Dozens of inspected vehicles in stock. Transparent pricing, flexible financing,
              and a 7-day money-back guarantee on every purchase.
            </p>

            {/* Search bar */}
            <div className="bg-white rounded-xl shadow-2xl p-4 mt-10 max-w-3xl grid grid-cols-1 sm:grid-cols-4 gap-3">
              <Select
                placeholder="Any Make"
                allowClear
                size="large"
                value={q.make}
                onChange={(v) => setQ((s) => ({ ...s, make: v }))}
                options={MAKES.map((m) => ({ value: m, label: m }))}
              />
              <Select
                placeholder="Any Body Type"
                allowClear
                size="large"
                value={q.body_type}
                onChange={(v) => setQ((s) => ({ ...s, body_type: v }))}
                options={BODY_TYPES.map((b) => ({ value: b, label: b }))}
              />
              <Select
                placeholder="Max Price"
                allowClear
                size="large"
                value={q.max_price}
                onChange={(v) => setQ((s) => ({ ...s, max_price: v }))}
                options={[30000, 50000, 75000, 100000, 150000].map((p) => ({
                  value: p,
                  label: `Under $${p.toLocaleString()}`,
                }))}
              />
              <button
                onClick={search}
                className="bg-[#e0292f] hover:bg-[#b81f24] text-white font-bold rounded-lg flex items-center justify-center gap-2 border-0 cursor-pointer h-10 transition-colors"
              >
                <Search size={17} /> Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            [ShieldCheck, '150-Point Inspection', 'Every car certified by ASE master technicians'],
            [BadgeDollarSign, 'Transparent Pricing', 'No hidden fees. The price you see is the price you pay'],
            [Wrench, 'Free Maintenance', '2 years of scheduled maintenance included'],
            [Handshake, '7-Day Guarantee', 'Money back, no questions asked, within 7 days'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="flex flex-col sm:flex-row gap-3 items-start">
              <span className="bg-red-50 text-[#e0292f] rounded-lg p-2.5 shrink-0">
                <Icon size={24} />
              </span>
              <div>
                <h3 className="m-0 font-bold text-sm text-gray-900">{title}</h3>
                <p className="m-0 mt-1 text-xs text-gray-500 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured cars */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="section-title-bar text-3xl font-extrabold text-gray-900 m-0">Featured Vehicles</h2>
            <p className="text-gray-500 mt-4 m-0">Hand-picked highlights from our current inventory</p>
          </div>
          <Link to="/inventory" className="hidden sm:flex items-center gap-1.5 text-[#e0292f] font-bold no-underline hover:gap-2.5 transition-all">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-16"><Spin size="large" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Promo banner */}
      <section
        className="relative bg-cover bg-center"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1920&q=70)',
        }}
      >
        <div className="bg-[#101828]/85">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <p className="text-[#e0292f] font-bold uppercase tracking-widest text-sm">Limited Time Offer</p>
            <h2 className="text-white text-3xl lg:text-5xl font-extrabold mt-3 m-0">
              Summer Sales Event — 0.9% APR Financing
            </h2>
            <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
              Every certified pre-owned vehicle qualifies through August 31st. Plus a complimentary
              2-year maintenance plan on us.
            </p>
            <Link
              to="/inventory"
              className="inline-block mt-8 bg-[#e0292f] hover:bg-[#b81f24] text-white font-bold px-8 py-3.5 rounded-lg no-underline transition-colors"
            >
              Shop the Sale
            </Link>
          </div>
        </div>
      </section>

      {/* Latest arrivals */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title-bar text-3xl font-extrabold text-gray-900 m-0 mb-10">Latest Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {latest.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="section-title-bar text-3xl font-extrabold text-gray-900 m-0 mb-10">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <Rate disabled value={t.rating} style={{ fontSize: 16, color: '#e0292f' }} />
                <p className="text-gray-600 mt-4 leading-relaxed text-[15px]">“{t.quote}”</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title-bar text-3xl font-extrabold text-gray-900 m-0 mb-10">Latest News & Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {news.map((post) => (
            <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="h-44 overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <CalendarDays size={13} /> {moment(post.published_at).format('MMMM D, YYYY')} · {post.author}
                </div>
                <h3 className="mt-2 mb-0 font-bold text-gray-900 leading-snug text-[16px]">{post.title}</h3>
                <p className="text-sm text-gray-500 mt-2 leading-relaxed">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
