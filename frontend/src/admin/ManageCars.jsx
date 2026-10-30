import { useCallback, useEffect, useState } from 'react';
import { Table, Button, Input, Modal, Form, InputNumber, Select, Switch, Tag, Popconfirm, message, Space } from 'antd';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import api, { apiError } from '../api/client';
import { BODY_TYPES, FUELS, TRANSMISSIONS } from '../data/constants';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=1200&q=70';

export default function ManageCars() {
  const [cars, setCars] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, car: null });
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const fetchCars = useCallback(async (p = page, q = search) => {
    setLoading(true);
    try {
      const { data } = await api.get('/cars', {
        params: { include_sold: true, per_page: 8, page: p, q: q || undefined },
      });
      setCars(data.data.data);
      setTotal(data.data.total);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(() => fetchCars(page, search), 300);
    return () => clearTimeout(timer);
  }, [page, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const openModal = (car = null) => {
    setModal({ open: true, car });
    form.setFieldsValue(
      car
        ? { ...car, images: (car.images || []).join('\n'), features: (car.features || []).join(', ') }
        : {
            year: 2026, price: 30000, mileage: 0, body_type: 'SUV', fuel: 'Petrol',
            transmission: 'Automatic', drivetrain: 'FWD', doors: 4, seats: 5,
            condition: 'Used', status: 'Available', featured: false,
            images: '', features: '', description: '', vin: '',
          }
    );
  };

  const onSubmit = async (values) => {
    const payload = {
      ...values,
      featured: !!values.featured,
      images: values.images.split('\n').map((s) => s.trim()).filter(Boolean),
      features: values.features.split(',').map((s) => s.trim()).filter(Boolean),
    };
    if (payload.images.length === 0) payload.images = [FALLBACK_IMG];

    setSaving(true);
    try {
      if (modal.car) {
        await api.put(`/cars/${modal.car.id}`, payload);
        message.success('Listing updated');
      } else {
        await api.post('/cars', payload);
        message.success('Listing added');
      }
      setModal({ open: false, car: null });
      form.resetFields();
      fetchCars();
    } catch (error) {
      message.error(apiError(error, 'Could not save listing.'));
    } finally {
      setSaving(false);
    }
  };

  const toggleFeatured = async (car, value) => {
    try {
      await api.put(`/cars/${car.id}`, { ...car, featured: value });
      setCars((prev) => prev.map((c) => (c.id === car.id ? { ...c, featured: value } : c)));
    } catch (error) {
      message.error(apiError(error, 'Could not update listing.'));
    }
  };

  const onDelete = async (car) => {
    try {
      await api.delete(`/cars/${car.id}`);
      message.success('Listing deleted');
      fetchCars();
    } catch (error) {
      message.error(apiError(error, 'Could not delete listing.'));
    }
  };

  const columns = [
    {
      title: 'Vehicle',
      key: 'vehicle',
      render: (_, c) => (
        <div className="flex items-center gap-3">
          <img src={c.images?.[0]} alt="" className="w-16 h-11 object-cover rounded-md hidden sm:block" />
          <div>
            <div className="font-semibold">{c.year} {c.make} {c.model}</div>
            <div className="text-xs text-gray-400">{c.body_type} · {c.fuel}</div>
          </div>
        </div>
      ),
    },
    { title: 'Price', dataIndex: 'price', render: (p) => `$${Number(p).toLocaleString()}` },
    { title: 'Mileage', dataIndex: 'mileage', responsive: ['md'], render: (m) => `${Number(m).toLocaleString()} mi` },
    {
      title: 'Status', dataIndex: 'status',
      render: (s) => <Tag color={s === 'Available' ? 'green' : s === 'Pending' ? 'orange' : 'default'}>{s}</Tag>,
    },
    {
      title: 'Featured', dataIndex: 'featured', responsive: ['lg'],
      render: (f, c) => <Switch size="small" checked={f} onChange={(v) => toggleFeatured(c, v)} />,
    },
    {
      title: 'Actions', key: 'actions',
      render: (_, c) => (
        <Space>
          <Button size="small" icon={<Pencil size={13} />} onClick={() => openModal(c)} />
          <Popconfirm title={`Delete ${c.year} ${c.make} ${c.model}?`} okText="Delete" okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(c)}>
            <Button size="small" danger icon={<Trash2 size={13} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">Car Listings ({total})</h1>
        <div className="flex gap-3">
          <Input
            prefix={<Search size={14} className="text-gray-400" />}
            placeholder="Search listings..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            allowClear
            style={{ width: 220 }}
          />
          <Button type="primary" danger icon={<Plus size={15} />} onClick={() => openModal()}>
            Add Listing
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table columns={columns} dataSource={cars} rowKey="id" scroll={{ x: 700 }} loading={loading}
          pagination={{ current: page, total, pageSize: 8, showSizeChanger: false, onChange: setPage }} />
      </div>

      <Modal
        title={modal.car ? 'Edit Listing' : 'Add New Listing'}
        open={modal.open}
        onCancel={() => setModal({ open: false, car: null })}
        onOk={() => form.submit()}
        okText={modal.car ? 'Save Changes' : 'Add Listing'}
        okButtonProps={{ danger: true, type: 'primary', loading: saving }}
        width={760}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={onSubmit} requiredMark={false} className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
            <Form.Item label="Make" name="make" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Model" name="model" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Year" name="year" rules={[{ required: true }]}>
              <InputNumber className="w-full" min={1990} max={2027} />
            </Form.Item>
            <Form.Item label="Price ($)" name="price" rules={[{ required: true }]}>
              <InputNumber className="w-full" min={0} step={500} formatter={(v) => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} />
            </Form.Item>
            <Form.Item label="Mileage" name="mileage" rules={[{ required: true }]}>
              <InputNumber className="w-full" min={0} step={1000} />
            </Form.Item>
            <Form.Item label="Body Type" name="body_type" rules={[{ required: true }]}>
              <Select options={BODY_TYPES.map((b) => ({ value: b, label: b }))} />
            </Form.Item>
            <Form.Item label="Fuel" name="fuel" rules={[{ required: true }]}>
              <Select options={FUELS.map((x) => ({ value: x, label: x }))} />
            </Form.Item>
            <Form.Item label="Transmission" name="transmission" rules={[{ required: true }]}>
              <Select options={TRANSMISSIONS.map((x) => ({ value: x, label: x }))} />
            </Form.Item>
            <Form.Item label="Drivetrain" name="drivetrain">
              <Select options={['FWD', 'RWD', 'AWD', '4WD'].map((x) => ({ value: x, label: x }))} />
            </Form.Item>
            <Form.Item label="Engine" name="engine"><Input placeholder="2.0L Turbo I4" /></Form.Item>
            <Form.Item label="Exterior Color" name="exterior_color"><Input /></Form.Item>
            <Form.Item label="Interior Color" name="interior_color"><Input /></Form.Item>
            <Form.Item label="Doors" name="doors"><InputNumber className="w-full" min={2} max={6} /></Form.Item>
            <Form.Item label="Seats" name="seats"><InputNumber className="w-full" min={2} max={9} /></Form.Item>
            <Form.Item label="VIN" name="vin" rules={[{ required: true }]}><Input /></Form.Item>
            <Form.Item label="Status" name="status">
              <Select options={['Available', 'Pending', 'Sold'].map((x) => ({ value: x, label: x }))} />
            </Form.Item>
            <Form.Item label="Condition" name="condition">
              <Select options={['New', 'Used', 'Certified'].map((x) => ({ value: x, label: x }))} />
            </Form.Item>
            <Form.Item label="Featured" name="featured" valuePropName="checked"><Switch /></Form.Item>
          </div>
          <Form.Item label="Image URLs (one per line)" name="images">
            <Input.TextArea rows={3} placeholder="https://..." />
          </Form.Item>
          <Form.Item label="Features (comma separated)" name="features">
            <Input.TextArea rows={2} placeholder="Sunroof, Heated Seats, Apple CarPlay" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
