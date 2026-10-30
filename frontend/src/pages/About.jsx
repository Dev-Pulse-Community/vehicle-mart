import { useEffect, useState } from 'react';
import { Spin } from 'antd';
import { Award, Users, Car, ThumbsUp } from 'lucide-react';
import api from '../api/client';

const STATS = [
  [Car, '12,000+', 'Vehicles Sold'],
  [Users, '10,500+', 'Happy Customers'],
  [Award, '18', 'Years in Business'],
  [ThumbsUp, '4.8/5', 'Customer Rating'],
];

const MILESTONES = [
  ['2008', 'AutoDeal Motors opens its doors with a 12-car lot and a promise: honest pricing, no games.'],
  ['2013', 'Expanded to our current 5-acre Motorway Boulevard campus with a 12-bay service center.'],
  ['2018', 'Launched our 150-point certification program and 7-day money-back guarantee.'],
  ['2022', 'Became the region’s first dealership with a dedicated EV sales and charging center.'],
  ['2026', 'Crossed 12,000 vehicles sold, with a 4.8-star average across 3,000+ verified reviews.'],
];

export default function About() {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    api.get('/team')
      .then(({ data }) => alive && setTeam(data.data))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  return (
    <div>
      {/* Header */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1562141961-b5d1a7dbd1c9?auto=format&fit=crop&w=1920&q=70)' }}
      >
        <div className="bg-[#101828]/85">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-white text-4xl lg:text-5xl font-extrabold m-0">About AutoDeal Motors</h1>
            <p className="text-gray-300 text-lg mt-4 max-w-2xl mx-auto">
              Family-owned since 2008. We built our reputation one honest deal at a time.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map(([Icon, value, label]) => (
            <div key={label} className="text-center">
              <span className="inline-flex bg-red-50 text-[#e0292f] rounded-xl p-3 mb-3"><Icon size={28} /></span>
              <div className="text-3xl font-extrabold text-gray-900">{value}</div>
              <div className="text-sm text-gray-500 mt-1">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Story */}
      <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="section-title-bar text-3xl font-extrabold m-0 mb-6">Our Story</h2>
          <div className="space-y-4 text-gray-600 leading-relaxed">
            <p>
              AutoDeal Motors started in 2008 when James Rodriguez, a 20-year industry veteran, got tired of
              watching customers get squeezed by hidden fees and pressure tactics. He opened a small lot with
              twelve cars and one rule: the price on the windshield is the price you pay.
            </p>
            <p>
              Eighteen years later, we operate a 5-acre campus with over a hundred vehicles in stock, a 12-bay
              service center staffed by ASE Master Technicians, and a finance office that works with more than
              twenty lenders. What hasn’t changed is the rule.
            </p>
            <p>
              Every vehicle we sell passes a 150-point inspection, comes with a free vehicle history report, two
              years of scheduled maintenance, and a 7-day money-back guarantee — because we’d rather lose a sale
              than sell a car we wouldn’t put our own family in.
            </p>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden shadow-lg h-80 lg:h-[420px]">
          <img
            src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=1200&q=70"
            alt="AutoDeal Motors showroom"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white">
        <div className="max-w-4xl mx-auto px-4 py-16">
          <h2 className="section-title-bar text-3xl font-extrabold m-0 mb-10">Our Journey</h2>
          <div className="space-y-0">
            {MILESTONES.map(([year, text], i) => (
              <div key={year} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <span className="bg-[#e0292f] text-white font-bold text-sm rounded-lg px-3 py-1.5 shrink-0">{year}</span>
                  {i < MILESTONES.length - 1 && <span className="w-0.5 flex-1 bg-gray-200 my-2" />}
                </div>
                <p className="text-gray-600 leading-relaxed pb-8 mt-1">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="section-title-bar text-3xl font-extrabold m-0 mb-10">Meet the Team</h2>
        {loading ? (
          <div className="flex justify-center py-16"><Spin size="large" /></div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden bg-gray-100">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" loading="lazy" />
                </div>
                <div className="p-5">
                  <h3 className="m-0 font-bold text-gray-900">{member.name}</h3>
                  <div className="text-[#e0292f] text-sm font-semibold mt-0.5">{member.role}</div>
                  <p className="text-sm text-gray-500 mt-3 leading-relaxed m-0">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
