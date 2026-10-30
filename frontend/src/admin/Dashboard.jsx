import { useEffect, useState } from 'react';
import { Column, Line, Pie } from '@ant-design/plots';
import { Table, Tag, Spin } from 'antd';
import { CarFront, Users, DollarSign, TrendingUp } from 'lucide-react';
import moment from 'moment';
import api from '../api/client';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    api.get('/admin/analytics')
      .then(({ data: res }) => alive && setData(res.data))
      .finally(() => alive && setLoading(false));
    return () => { alive = false; };
  }, []);

  if (loading || !data) {
    return <div className="flex justify-center py-24"><Spin size="large" /></div>;
  }

  const { stats, monthly_sales, sales_by_body_type, newest_users } = data;

  const cards = [
    { icon: CarFront, label: 'Active Listings', value: stats.active_listings, sub: `${stats.total_listings} total` },
    { icon: Users, label: 'Registered Users', value: stats.registered_users, sub: `${stats.active_users} active` },
    { icon: DollarSign, label: 'Inventory Value', value: `$${(stats.inventory_value / 1e6).toFixed(2)}M`, sub: 'at listed prices' },
    { icon: TrendingUp, label: 'YTD Revenue', value: `$${(stats.ytd_revenue / 1e6).toFixed(2)}M`, sub: `${stats.ytd_sales} cars sold` },
  ];

  // Weekly visitor trend derived from sales activity (no tracking backend yet).
  const visitors = monthly_sales.map((m) => ({ week: m.month, visitors: m.sales * 180 + 2400 }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-extrabold text-gray-900 m-0">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map(({ icon: Icon, label, value, sub }) => (
          <div key={label} className="bg-white rounded-xl shadow-sm p-5 flex items-start gap-4">
            <span className="bg-red-50 text-[#e0292f] rounded-lg p-2.5"><Icon size={22} /></span>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-gray-400">{label}</div>
              <div className="text-2xl font-extrabold text-gray-900 mt-0.5">{value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="m-0 mb-4 font-bold text-gray-800">Monthly Sales ({new Date().getFullYear()})</h3>
          <Column
            data={monthly_sales}
            xField="month"
            yField="sales"
            height={280}
            color="#e0292f"
            style={{ fill: '#e0292f', radiusTopLeft: 6, radiusTopRight: 6 }}
            axis={{ y: { title: null }, x: { title: null } }}
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="m-0 mb-4 font-bold text-gray-800">Monthly Revenue</h3>
          <Line
            data={monthly_sales}
            xField="month"
            yField="revenue"
            height={280}
            smooth
            style={{ stroke: '#101828', lineWidth: 3 }}
            point={{ size: 4, style: { fill: '#e0292f' } }}
            axis={{ y: { title: null, labelFormatter: (v) => `$${(v / 1000).toFixed(0)}k` }, x: { title: null } }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="m-0 mb-4 font-bold text-gray-800">Sales by Body Type</h3>
          <Pie
            data={sales_by_body_type}
            angleField="value"
            colorField="type"
            height={280}
            radius={0.9}
            innerRadius={0.6}
            label={{ text: 'type', position: 'outside' }}
            legend={{ color: { position: 'bottom' } }}
          />
        </div>
        <div className="bg-white rounded-xl shadow-sm p-5">
          <h3 className="m-0 mb-4 font-bold text-gray-800">Newest Users</h3>
          <Table
            dataSource={newest_users}
            rowKey="id"
            pagination={false}
            size="small"
            columns={[
              { title: 'Name', dataIndex: 'name' },
              { title: 'Email', dataIndex: 'email', responsive: ['md'] },
              { title: 'Joined', dataIndex: 'created_at', render: (d) => moment(d).format('MMM D, YYYY') },
              {
                title: 'Status', dataIndex: 'is_active',
                render: (active) => <Tag color={active ? 'green' : 'red'}>{active ? 'active' : 'suspended'}</Tag>,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
