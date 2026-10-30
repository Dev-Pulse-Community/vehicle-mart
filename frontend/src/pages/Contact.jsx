import { useState } from 'react';
import { Form, Input, Button, Select, message } from 'antd';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import api, { apiError } from '../api/client';
import { DEALERSHIP } from '../data/constants';

export default function Contact() {
  const [form] = Form.useForm();
  const [sending, setSending] = useState(false);

  const onFinish = async (values) => {
    setSending(true);
    try {
      await api.post('/inquiries', {
        name: values.name,
        email: values.email,
        phone: values.phone || undefined,
        department: values.department,
        message: values.message,
      });
      form.resetFields();
      message.success('Message sent! We will get back to you within one business day.');
    } catch (error) {
      message.error(apiError(error, 'Could not send your message.'));
    } finally {
      setSending(false);
    }
  };

  return (
    <div>
      <div className="bg-[#101828]">
        <div className="max-w-7xl mx-auto px-4 py-14">
          <h1 className="text-white text-3xl lg:text-4xl font-extrabold m-0">Contact Us</h1>
          <p className="text-gray-400 mt-2 m-0">Questions about a vehicle, financing, or service? We’re here to help.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Info cards */}
        <div className="space-y-5">
          {[
            [MapPin, 'Visit Us', DEALERSHIP.address],
            [Phone, 'Call Us', `${DEALERSHIP.phone} — Sales, Service & Parts`],
            [Mail, 'Email Us', DEALERSHIP.email],
          ].map(([Icon, title, text]) => (
            <div key={title} className="bg-white rounded-xl shadow-sm p-5 flex gap-4">
              <span className="bg-red-50 text-[#e0292f] rounded-lg p-2.5 h-fit"><Icon size={22} /></span>
              <div>
                <h3 className="m-0 font-bold text-gray-900">{title}</h3>
                <p className="m-0 mt-1 text-sm text-gray-500 leading-relaxed">{text}</p>
              </div>
            </div>
          ))}

          <div className="bg-white rounded-xl shadow-sm p-5">
            <div className="flex gap-4 mb-4">
              <span className="bg-red-50 text-[#e0292f] rounded-lg p-2.5 h-fit"><Clock size={22} /></span>
              <h3 className="m-0 font-bold text-gray-900 self-center">Business Hours</h3>
            </div>
            <ul className="list-none p-0 m-0 space-y-2.5 text-sm">
              {DEALERSHIP.hours.map((h) => (
                <li key={h.days} className="flex justify-between text-gray-600">
                  <span>{h.days}</span>
                  <span className="font-semibold text-gray-900">{h.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8">
            <h2 className="section-title-bar text-2xl font-extrabold m-0 mb-8">Send Us a Message</h2>
            <Form form={form} layout="vertical" onFinish={onFinish} requiredMark={false}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5">
                <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
                  <Input size="large" placeholder="John Doe" />
                </Form.Item>
                <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
                  <Input size="large" placeholder="john@example.com" />
                </Form.Item>
                <Form.Item label="Phone" name="phone">
                  <Input size="large" placeholder="(555) 000-0000" />
                </Form.Item>
                <Form.Item label="Department" name="department" initialValue="sales">
                  <Select size="large" options={[
                    { value: 'sales', label: 'Sales' },
                    { value: 'service', label: 'Service & Parts' },
                    { value: 'finance', label: 'Financing' },
                    { value: 'other', label: 'Other' },
                  ]} />
                </Form.Item>
              </div>
              <Form.Item label="Message" name="message" rules={[{ required: true, message: 'Please enter a message' }]}>
                <Input.TextArea rows={5} placeholder="How can we help you?" />
              </Form.Item>
              <Button htmlType="submit" type="primary" danger size="large" className="font-bold px-10" loading={sending}>
                Send Message
              </Button>
            </Form>
          </div>

          {/* Map */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden mt-8">
            <iframe
              title="Dealership location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=-89.699%2C39.771%2C-89.617%2C39.812&layer=mapnik&marker=39.7917%2C-89.6584"
              className="w-full h-80 border-0 block"
              loading="lazy"
            />
            <div className="p-4 text-sm text-gray-500">
              <strong className="text-gray-900">AutoDeal Motors</strong> — {DEALERSHIP.address}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
