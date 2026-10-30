import { Link, useNavigate } from 'react-router';
import { Tag, message } from 'antd';
import { Heart, Gauge, Fuel, Settings2, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const fmtPrice = (n) => `$${Number(n).toLocaleString()}`;
export const fmtMiles = (n) => `${Number(n).toLocaleString()} mi`;

export default function CarCard({ car }) {
  const { currentUser, toggleFavorite } = useApp();
  const navigate = useNavigate();
  const isFav = currentUser?.favorites.includes(car.id);

  const onFav = (e) => {
    e.preventDefault();
    if (!currentUser) {
      message.info('Sign in to save favorites');
      navigate('/login');
      return;
    }
    toggleFavorite(car.id);
  };

  return (
    <Link
      to={`/inventory/${car.id}`}
      className="car-card group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow no-underline"
    >
      <div className="relative h-52 overflow-hidden bg-gray-100">
        <img
          src={car.images[0]}
          alt={`${car.year} ${car.make} ${car.model}`}
          className="car-card-img w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex gap-2">
          {car.featured && <Tag color="#e0292f" className="font-semibold m-0">FEATURED</Tag>}
          {car.status === 'Sold' && <Tag color="#6b7280" className="font-semibold m-0">SOLD</Tag>}
        </div>
        <button
          onClick={onFav}
          aria-label="Toggle favorite"
          className={`absolute top-3 right-3 rounded-full p-2 border-0 cursor-pointer transition-colors ${
            isFav ? 'bg-[#e0292f] text-white' : 'bg-white/90 text-gray-600 hover:text-[#e0292f]'
          }`}
        >
          <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="m-0 text-[15px] font-bold text-gray-900 leading-snug">
            {car.year} {car.make} {car.model}
          </h3>
        </div>
        <div className="text-[#e0292f] text-lg font-extrabold mt-1">{fmtPrice(car.price)}</div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3 pt-3 border-t border-gray-100 text-xs text-gray-500">
          <span className="flex items-center gap-1.5"><Gauge size={13} /> {fmtMiles(car.mileage)}</span>
          <span className="flex items-center gap-1.5"><Fuel size={13} /> {car.fuel}</span>
          <span className="flex items-center gap-1.5"><Settings2 size={13} /> {car.transmission}</span>
          <span className="flex items-center gap-1.5"><Calendar size={13} /> {car.year}</span>
        </div>
      </div>
    </Link>
  );
}
