import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Tabs, Form, Input, Button, Table, Tag, Empty, Avatar, message, Popconfirm, Spin } from 'antd';
import { Heart, History, Settings, User } from 'lucide-react';
import moment from 'moment';
import api from '../api/client';
import { useApp } from '../context/AppContext';
import CarCard from '../components/CarCard';

export default function Profile() {
  const { currentUser, updateProfile, changePassword, logout } = useApp();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const [favCars, setFavCars] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    Promise.allSettled([api.get('/favorites'), api.get('/orders')]).then(([f, o]) => {
      if (!alive) return;
      if (f.status === 'fulfilled') setFavCars(f.value.data.data);
      if (o.status === 'fulfilled') setOrders(o.value.data.data);
      setLoading(false);
    });
    return () => { alive = false; };
  }, [currentUser?.favorites?.length]); // refetch when favorites change

  if (!currentUser) return null; // guarded by route

  const saveProfile = async (values) => {
    setSaving(true);
    const res = await updateProfile(values);
    setSaving(false);
    if (res.ok) message.success('Profile updated');
    else message.error(res.error);
  };

  const savePassword = async ({ current, next }) => {
    const res = await changePassword({ current, next });
    if (res.ok) message.success('Password changed');
    else message.error(res.error);
  };

  const purchaseColumns = [
    { title: 'Order #', dataIndex: 'order_number', key: 'order_number' },
    { title: 'Vehicle', dataIndex: 'car_name', key: 'car_name' },
    { title: 'Price', dataIndex: 'price', key: 'price', render: (p) => `$${Number(p).toLocaleString()}` },
    { title: 'Date', dataIndex: 'purchased_at', key: 'purchased_at', render: (d) => moment(d).format('MMM D, YYYY') },
    {
      title: 'Status', dataIndex: 'status', key: 'status',
      render: (s) => <Tag color={s === 'Completed' ? 'green' : s === 'Cancelled' ? 'red' : 'orange'}>{s}</Tag>,
    },
  ];

  const items = [
    {
      key: 'favorites',
      label: <span className="flex items-center gap-1.5"><Heart size={15} /> Favorites ({favCars.length})</span>,
      children: loading ? (
        <div className="flex justify-center py-16"><Spin /></div>
      ) : favCars.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {favCars.map((car) => <CarCard key={car.id} car={car} />)}
        </div>
      ) : (
        <Empty description="No saved vehicles yet" className="py-16">
          <Button type="primary" danger onClick={() => navigate('/inventory')}>Browse Inventory</Button>
        </Empty>
      ),
    },
    {
      key: 'purchases',
      label: <span className="flex items-center gap-1.5"><History size={15} /> Purchase History</span>,
      children: loading ? (
        <div className="flex justify-center py-16"><Spin /></div>
      ) : orders.length ? (
        <Table className="mt-4" columns={purchaseColumns} dataSource={orders}
          rowKey="id" pagination={false} scroll={{ x: 600 }} />
      ) : (
        <Empty description="No purchases yet" className="py-16" />
      ),
    },
    {
      key: 'settings',
      label: <span className="flex items-center gap-1.5"><Settings size={15} /> Account Settings</span>,
      children: (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4 max-w-4xl">
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="m-0 mb-5 font-bold">Profile Information</h3>
            <Form layout="vertical" requiredMark={false} onFinish={saveProfile}
              initialValues={{ name: currentUser.name, email: currentUser.email, phone: currentUser.phone }}>
              <Form.Item label="Full Name" name="name" rules={[{ required: true }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
                <Input size="large" />
              </Form.Item>
              <Form.Item label="Phone" name="phone">
                <Input size="large" />
              </Form.Item>
              <Button htmlType="submit" type="primary" danger className="font-semibold" loading={saving}>Save Changes</Button>
            </Form>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="m-0 mb-5 font-bold">Change Password</h3>
              <Form layout="vertical" requiredMark={false} onFinish={savePassword}>
                <Form.Item label="Current Password" name="current" rules={[{ required: true }]}>
                  <Input.Password size="large" />
                </Form.Item>
                <Form.Item label="New Password" name="next"
                  rules={[{ required: true }, { min: 6, message: 'At least 6 characters' }]}>
                  <Input.Password size="large" />
                </Form.Item>
                <Button htmlType="submit" className="font-semibold">Update Password</Button>
              </Form>
            </div>

            <div className="bg-red-50 border border-red-100 rounded-xl p-6">
              <h3 className="m-0 mb-2 font-bold text-red-700">Sign Out</h3>
              <p className="text-sm text-red-600/80 mt-0">End your session on this device.</p>
              <Popconfirm title="Sign out of your account?" onConfirm={async () => { await logout(); navigate('/'); }}>
                <Button danger>Sign Out</Button>
              </Popconfirm>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
        <Avatar size={64} style={{ background: '#e0292f', fontSize: 26 }}>
          {currentUser.name.charAt(0).toUpperCase()}
        </Avatar>
        <div className="flex-1">
          <h1 className="m-0 text-2xl font-extrabold text-gray-900">{currentUser.name}</h1>
          <p className="m-0 mt-1 text-sm text-gray-500 flex items-center gap-2">
            <User size={13} /> {currentUser.email} · Member since {moment(currentUser.joined).format('MMMM YYYY')}
          </p>
        </div>
        {currentUser.role === 'admin' && (
          <Button type="primary" danger onClick={() => navigate('/admin')}>Admin Dashboard</Button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <Tabs
          activeKey={params.get('tab') || 'favorites'}
          onChange={(k) => setParams({ tab: k }, { replace: true })}
          items={items}
        />
      </div>
    </div>
  );
}
