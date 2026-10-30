import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { Button, Form, Input, Tag, message, Descriptions, Result, Spin } from 'antd';
import {
  Heart, Gauge, Fuel, Settings2, Calendar, Check, Phone, ChevronLeft,
  Car as CarIcon, Palette, DoorOpen, Users, Cog,
} from 'lucide-react';
import api, { apiError } from '../api/client';
import { useApp } from '../context/AppContext';
import CarCard, { fmtPrice, fmtMiles } from '../components/CarCard';
import { DEALERSHIP } from '../data/constants';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, toggleFavorite } = useApp();
  const [car, setCar] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [sending, setSending] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    let alive = true;
    setLoading(true);
    setNotFound(false);
    setActiveImg(0);
    api
      .get(`/cars/${id}`)
      .then(({ data }) => {
        if (!alive) return;
        setCar(data.data);
        setSimilar(data.similar || []);
      })
      .catch(() => alive && setNotFound(true))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, [id]);

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center"><Spin size="large" /></div>;
  }

  if (notFound || !car) {
    return (
      <Result
        status="404"
        title="Vehicle Not Found"
        subTitle="This listing may have been sold or removed."
        extra={<Button type="primary" danger onClick={() => navigate('/inventory')}>Back to Inventory</Button>}
      />
    );
  }

  const isFav = currentUser?.favorites.includes(car.id);
  const images = car.images?.length ? car.images : [];

  const onFav = async () => {
    if (!currentUser) {
      message.info('Sign in to save favorites');
      navigate('/login');
      return;
    }
    const res = await toggleFavorite(car.id);
    if (res.ok) message.success(res.favorited ? 'Saved to favorites' : 'Removed from favorites');
  };

  const onInquiry = async (values) => {
    setSending(true);
    try {
      await api.post('/inquiries', {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        message: values.message,
        car_id: car.id,
        department: 'sales',
      });
      form.resetFields();
      message.success('Inquiry sent! Our sales team will contact you within one business hour.');
    } catch (error) {
      message.error(apiError(error, 'Could not send inquiry.'));
    } finally {
      setSending(false);
    }
  };

  const specs = [
    ['Make', car.make, CarIcon], ['Model', car.model, CarIcon], ['Year', car.year, Calendar],
    ['Mileage', fmtMiles(car.mileage), Gauge], ['Body Type', car.body_type, CarIcon],
    ['Engine', car.engine, Cog], ['Transmission', car.transmission, Settings2],
    ['Drivetrain', car.drivetrain, Settings2], ['Fuel Type', car.fuel, Fuel],
    ['Exterior Color', car.exterior_color, Palette], ['Interior Color', car.interior_color, Palette],
    ['Doors', car.doors, DoorOpen], ['Seats', car.seats, Users], ['VIN', car.vin, CarIcon],
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/inventory" className="inline-flex items-center gap-1 text-gray-500 hover:text-[#e0292f] text-sm no-underline mb-5">
        <ChevronLeft size={16} /> Back to Inventory
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: gallery + details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Gallery */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative h-72 sm:h-[430px] bg-gray-100">
              {images[activeImg] && (
                <img src={images[activeImg]} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
              )}
              <div className="absolute top-4 left-4 flex gap-2">
                {car.featured && <Tag color="#e0292f" className="font-semibold m-0">FEATURED</Tag>}
                <Tag color="#101828" className="font-semibold m-0">{car.condition?.toUpperCase()}</Tag>
              </div>
            </div>
            {images.length > 1 && (
              <div className="flex gap-2 p-3 overflow-x-auto">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 cursor-pointer p-0 ${
                      i === activeImg ? 'border-[#e0292f]' : 'border-transparent opacity-70'
                    }`}>
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="section-title-bar text-xl font-extrabold m-0 mb-6">Description</h2>
            <p className="text-gray-600 leading-relaxed">{car.description}</p>
          </div>

          {/* Specs */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="section-title-bar text-xl font-extrabold m-0 mb-6">Specifications</h2>
            <Descriptions bordered size="small" column={{ xs: 1, sm: 2 }}
              items={specs.map(([label, value], i) => ({ key: i, label, children: value ?? '—' }))} />
          </div>

          {/* Features */}
          {car.features?.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="section-title-bar text-xl font-extrabold m-0 mb-6">Features & Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {car.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="bg-red-50 text-[#e0292f] rounded-full p-1 flex"><Check size={12} /></span>
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: price + contact */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6 lg:sticky lg:top-24">
            <h1 className="text-2xl font-extrabold text-gray-900 m-0">
              {car.year} {car.make} {car.model}
            </h1>
            <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Gauge size={14} /> {fmtMiles(car.mileage)}</span>
              <span className="flex items-center gap-1"><Fuel size={14} /> {car.fuel}</span>
              <span className="flex items-center gap-1"><Settings2 size={14} /> {car.transmission}</span>
            </div>
            <div className="mt-5 pb-5 border-b border-gray-100">
              <div className="text-xs uppercase tracking-wide text-gray-400 font-semibold">Our Price</div>
              <div className="text-4xl font-extrabold text-[#e0292f] mt-1">{fmtPrice(car.price)}</div>
              <div className="text-xs text-gray-400 mt-1">Est. ${Math.round(car.price / 60).toLocaleString()}/mo for 60 months*</div>
            </div>

            <div className="flex gap-3 mt-5">
              <Button
                size="large"
                icon={<Heart size={16} fill={isFav ? '#e0292f' : 'none'} color={isFav ? '#e0292f' : undefined} />}
                onClick={onFav}
                className="flex-1"
              >
                {isFav ? 'Saved' : 'Save'}
              </Button>
              <Button size="large" type="primary" danger icon={<Phone size={16} />} className="flex-1"
                href={`tel:${DEALERSHIP.phone.replace(/\D/g, '')}`}>
                Call Us
              </Button>
            </div>

            <div className="mt-8">
              <h3 className="font-bold text-gray-900 m-0 mb-4">Request More Information</h3>
              <Form form={form} layout="vertical" onFinish={onInquiry} requiredMark={false}
                initialValues={{ name: currentUser?.name, email: currentUser?.email, phone: currentUser?.phone }}>
                <Form.Item name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input placeholder="Full Name" size="large" />
                </Form.Item>
                <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                  <Input placeholder="Email Address" size="large" />
                </Form.Item>
                <Form.Item name="phone">
                  <Input placeholder="Phone (optional)" size="large" />
                </Form.Item>
                <Form.Item name="message" initialValue={`Hi, I'm interested in the ${car.year} ${car.make} ${car.model}. Please contact me.`}
                  rules={[{ required: true, message: 'Please enter a message' }]}>
                  <Input.TextArea rows={3} />
                </Form.Item>
                <Button htmlType="submit" type="primary" danger size="large" block className="font-bold" loading={sending}>
                  Send Inquiry
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="mt-16">
          <h2 className="section-title-bar text-2xl font-extrabold m-0 mb-8">Similar Vehicles</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {similar.map((c) => (
              <CarCard key={c.id} car={c} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
