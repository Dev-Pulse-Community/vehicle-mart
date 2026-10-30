import { useCallback, useEffect, useState } from 'react';
import { Table, Tag, Button, Input, Popconfirm, message, Space, Avatar, Modal, Descriptions } from 'antd';
import { Search, Trash2, Eye, Ban, CheckCircle } from 'lucide-react';
import moment from 'moment';
import api, { apiError } from '../api/client';
import { useApp } from '../context/AppContext';

export default function ManageUsers() {
  const { currentUser } = useApp();
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [viewing, setViewing] = useState(null);

  const fetchUsers = useCallback(async (p = page, q = search) => {
    setLoading(true);
    try {
      const { data } = await api.get('/admin/users', { params: { page: p, q: q || undefined, per_page: 10 } });
      setUsers(data.data.data);
      setTotal(data.data.total);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    const timer = setTimeout(() => fetchUsers(page, search), 300);
    return () => clearTimeout(timer);
  }, [page, search]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleStatus = async (u) => {
    try {
      await api.put(`/admin/users/${u.id}`, { is_active: !u.is_active });
      message.success(u.is_active ? 'User suspended' : 'User reactivated');
      fetchUsers();
    } catch (error) {
      message.error(apiError(error, 'Could not update user.'));
    }
  };

  const onDelete = async (u) => {
    try {
      await api.delete(`/admin/users/${u.id}`);
      message.success('User deleted');
      fetchUsers();
    } catch (error) {
      message.error(apiError(error, 'Could not delete user.'));
    }
  };

  const openDetails = async (u) => {
    try {
      const { data } = await api.get(`/admin/users/${u.id}`);
      setViewing(data.data);
    } catch (error) {
      message.error(apiError(error, 'Could not load user.'));
    }
  };

  const columns = [
    {
      title: 'User',
      key: 'user',
      render: (_, u) => (
        <div className="flex items-center gap-3">
          <Avatar style={{ background: u.role === 'admin' ? '#101828' : '#e0292f' }}>
            {u.name.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="font-semibold">{u.name}</div>
            <div className="text-xs text-gray-400">{u.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role', dataIndex: 'role',
      render: (r) => <Tag color={r === 'admin' ? 'geekblue' : 'default'}>{r}</Tag>,
    },
    { title: 'Joined', dataIndex: 'created_at', responsive: ['md'], render: (d) => moment(d).format('MMM D, YYYY') },
    { title: 'Purchases', dataIndex: 'orders_count', responsive: ['lg'] },
    {
      title: 'Status', dataIndex: 'is_active',
      render: (active) => <Tag color={active ? 'green' : 'red'}>{active ? 'active' : 'suspended'}</Tag>,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, u) => (
        <Space>
          <Button size="small" icon={<Eye size={13} />} onClick={() => openDetails(u)} />
          {u.id !== currentUser?.id && (
            <>
              <Button
                size="small"
                icon={u.is_active ? <Ban size={13} /> : <CheckCircle size={13} />}
                onClick={() => toggleStatus(u)}
              />
              <Popconfirm title={`Delete ${u.name}? This cannot be undone.`} okText="Delete" okButtonProps={{ danger: true }}
                onConfirm={() => onDelete(u)}>
                <Button size="small" danger icon={<Trash2 size={13} />} />
              </Popconfirm>
            </>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-gray-900 m-0">User Accounts ({total})</h1>
        <Input
          prefix={<Search size={14} className="text-gray-400" />}
          placeholder="Search users..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          allowClear
          style={{ width: 240 }}
        />
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table columns={columns} dataSource={users} rowKey="id" scroll={{ x: 700 }} loading={loading}
          pagination={{ current: page, total, pageSize: 10, showSizeChanger: false, onChange: setPage }} />
      </div>

      <Modal open={!!viewing} title="User Details" footer={null} onCancel={() => setViewing(null)}>
        {viewing && (
          <Descriptions column={1} bordered size="small" className="mt-4"
            items={[
              { key: 1, label: 'Name', children: viewing.name },
              { key: 2, label: 'Email', children: viewing.email },
              { key: 3, label: 'Phone', children: viewing.phone || '—' },
              { key: 4, label: 'Role', children: viewing.role },
              { key: 5, label: 'Status', children: viewing.is_active ? 'active' : 'suspended' },
              { key: 6, label: 'Joined', children: moment(viewing.created_at).format('MMMM D, YYYY') },
              { key: 7, label: 'Favorites', children: `${viewing.favorites_count ?? 0} saved vehicles` },
              {
                key: 8, label: 'Purchases',
                children: viewing.orders?.length
                  ? viewing.orders.map((o) => (
                      <div key={o.id}>{o.order_number} — {o.car_name} (${Number(o.price).toLocaleString()})</div>
                    ))
                  : 'None',
              },
            ]}
          />
        )}
      </Modal>
    </div>
  );
}
