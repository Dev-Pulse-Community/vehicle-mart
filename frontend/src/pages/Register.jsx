import { Link, useNavigate } from 'react-router';
import { Form, Input, Button, Alert, message } from 'antd';
import { Car } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Register() {
  const { register } = useApp();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async ({ name, email, password, confirm, phone }) => {
    setError(null);
    setSubmitting(true);
    const res = await register({ name, email, password, confirm, phone });
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    message.success('Account created — welcome to AutoDeal!');
    navigate('/');
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <span className="inline-flex bg-[#e0292f] rounded-xl p-3 mb-4"><Car size={28} color="white" /></span>
          <h1 className="text-2xl font-extrabold text-gray-900 m-0">Create Your Account</h1>
          <p className="text-gray-500 text-sm mt-2 m-0">Save favorites, track purchases, and get price alerts</p>
        </div>

        {error && <Alert type="error" message={error} showIcon className="mb-5" />}

        <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
          <Form.Item label="Full Name" name="name" rules={[{ required: true, message: 'Please enter your name' }]}>
            <Input size="large" placeholder="John Doe" autoComplete="name" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
            <Input size="large" placeholder="you@example.com" autoComplete="email" />
          </Form.Item>
          <Form.Item label="Phone (optional)" name="phone">
            <Input size="large" placeholder="(555) 000-0000" autoComplete="tel" />
          </Form.Item>
          <Form.Item label="Password" name="password"
            rules={[{ required: true, message: 'Password required' }, { min: 6, message: 'At least 6 characters' }]}>
            <Input.Password size="large" placeholder="At least 6 characters" autoComplete="new-password" />
          </Form.Item>
          <Form.Item label="Confirm Password" name="confirm" dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) return Promise.resolve();
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}>
            <Input.Password size="large" placeholder="Repeat password" autoComplete="new-password" />
          </Form.Item>
          <Button htmlType="submit" type="primary" danger size="large" block className="font-bold mt-2" loading={submitting}>
            Create Account
          </Button>
        </Form>

        <p className="text-center text-sm text-gray-500 mt-6 m-0">
          Already have an account?{' '}
          <Link to="/login" className="text-[#e0292f] font-semibold no-underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
