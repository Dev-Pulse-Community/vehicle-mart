import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Select, Slider, Input, Empty, Pagination, Button, Drawer, Spin } from 'antd';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import api from '../api/client';
import { MAKES, BODY_TYPES, FUELS, YEARS } from '../data/constants';
import CarCard from '../components/CarCard';

const PAGE_SIZE = 9;
const MAX_PRICE = 150000;

export default function Inventory() {
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const f = {
    q: params.get('q') || '',
    make: params.get('make') || undefined,
    model: params.get('model') || '',
    body_type: params.get('body_type') || undefined,
    fuel: params.get('fuel') || undefined,
    year: params.get('year') ? Number(params.get('year')) : undefined,
    max_price: params.get('max_price') ? Number(params.get('max_price')) : MAX_PRICE,
    max_mileage: params.get('max_mileage') ? Number(params.get('max_mileage')) : 150000,
    sort: params.get('sort') || 'newest',
    page: params.get('page') ? Number(params.get('page')) : 1,
  };

  useEffect(() => {
    let alive = true;
    setLoading(true);
    // small debounce so text filters don't fire a request per keystroke
    const timer = setTimeout(() => {
      api
        .get('/cars', {
          params: {
            q: f.q || undefined,
            make: f.make,
            model: f.model || undefined,
            body_type: f.body_type,
            fuel: f.fuel,
            year: f.year,
            max_price: f.max_price < MAX_PRICE ? f.max_price : undefined,
            max_mileage: f.max_mileage < 150000 ? f.max_mileage : undefined,
            sort: f.sort,
            page: f.page,
            per_page: PAGE_SIZE,
          },
        })
        .then(({ data }) => {
          if (!alive) return;
          setCars(data.data.data);
          setTotal(data.data.total);
        })
        .finally(() => alive && setLoading(false));
    }, 350);
    return () => { alive = false; clearTimeout(timer); };
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  const setFilter = (key, value) => {
    const next = new URLSearchParams(params);
    if (value === undefined || value === '' || value === null) next.delete(key);
    else next.set(key, String(value));
    if (key !== 'page') next.delete('page');
    setParams(next, { replace: true });
  };

  const clearAll = () => setParams(new URLSearchParams(), { replace: true });

  const activeCount = ['make', 'model', 'body_type', 'fuel', 'year', 'max_price', 'max_mileage', 'q'].filter((k) => params.get(k)).length;

  const filterPanel = (
    <div className="space-y-5">
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Search</label>
        <Input
          prefix={<Search size={14} className="text-gray-400" />}
          placeholder="Make, model, year..."
          value={f.q}
          onChange={(e) => setFilter('q', e.target.value)}
          allowClear
        />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Make</label>
        <Select className="w-full" placeholder="Any make" allowClear value={f.make}
          onChange={(v) => setFilter('make', v)} options={MAKES.map((m) => ({ value: m, label: m }))} />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Model</label>
        <Input placeholder="e.g. Civic" value={f.model} onChange={(e) => setFilter('model', e.target.value)} allowClear />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Year</label>
        <Select className="w-full" placeholder="Any year" allowClear value={f.year}
          onChange={(v) => setFilter('year', v)} options={YEARS.map((y) => ({ value: y, label: y }))} />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Body Type</label>
        <Select className="w-full" placeholder="Any body type" allowClear value={f.body_type}
          onChange={(v) => setFilter('body_type', v)} options={BODY_TYPES.map((b) => ({ value: b, label: b }))} />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">Fuel Type</label>
        <Select className="w-full" placeholder="Any fuel" allowClear value={f.fuel}
          onChange={(v) => setFilter('fuel', v)} options={FUELS.map((x) => ({ value: x, label: x }))} />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
          Max Price: ${f.max_price.toLocaleString()}
        </label>
        <Slider min={10000} max={MAX_PRICE} step={5000} key={`price-${f.max_price}`} defaultValue={f.max_price}
          onChangeComplete={(v) => setFilter('max_price', v)}
          tooltip={{ formatter: (v) => `$${v.toLocaleString()}` }} />
      </div>
      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
          Max Mileage: {f.max_mileage.toLocaleString()} mi
        </label>
        <Slider min={5000} max={150000} step={5000} key={`miles-${f.max_mileage}`} defaultValue={f.max_mileage}
          onChangeComplete={(v) => setFilter('max_mileage', v)}
          tooltip={{ formatter: (v) => `${v.toLocaleString()} mi` }} />
      </div>
      {activeCount > 0 && (
        <Button block icon={<X size={14} />} onClick={clearAll}>
          Clear All Filters
        </Button>
      )}
    </div>
  );

  return (
    <div>
      {/* Page header */}
      <div className="bg-[#101828]">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-white text-3xl lg:text-4xl font-extrabold m-0">Browse Inventory</h1>
          <p className="text-gray-400 mt-2 m-0">
            {loading ? 'Loading vehicles…' : `${total} vehicle${total !== 1 ? 's' : ''} matching your criteria`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 flex gap-8">
        {/* Sidebar filters (desktop) */}
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-5 sticky top-24">
            <h3 className="m-0 mb-5 font-bold text-gray-900 flex items-center gap-2">
              <SlidersHorizontal size={16} /> Filters
            </h3>
            {filterPanel}
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3 mb-6">
            <Button className="lg:hidden" icon={<SlidersHorizontal size={14} />} onClick={() => setDrawerOpen(true)}>
              Filters {activeCount > 0 && `(${activeCount})`}
            </Button>
            <div className="hidden lg:block text-sm text-gray-500">
              Showing {cars.length} of {total} vehicles
            </div>
            <Select
              value={f.sort}
              onChange={(v) => setFilter('sort', v)}
              style={{ width: 190 }}
              options={[
                { value: 'newest', label: 'Newest Listings' },
                { value: 'price-asc', label: 'Price: Low to High' },
                { value: 'price-desc', label: 'Price: High to Low' },
                { value: 'mileage-asc', label: 'Lowest Mileage' },
                { value: 'year-desc', label: 'Newest Year' },
              ]}
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-24"><Spin size="large" /></div>
          ) : cars.length === 0 ? (
            <div className="bg-white rounded-xl p-16">
              <Empty description="No vehicles match your filters">
                <Button type="primary" danger onClick={clearAll}>Clear Filters</Button>
              </Empty>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {cars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          )}

          {total > PAGE_SIZE && (
            <div className="mt-10 flex justify-center">
              <Pagination current={f.page} total={total} pageSize={PAGE_SIZE}
                onChange={(p) => { setFilter('page', p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                showSizeChanger={false} />
            </div>
          )}
        </div>
      </div>

      <Drawer title="Filters" placement="left" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {filterPanel}
      </Drawer>
    </div>
  );
}
