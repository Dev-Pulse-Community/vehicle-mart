import { Link, useLocation, useNavigate } from 'react-router';
import { Form, Input, Button, Alert, message } from 'antd';
import { Car } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async ({ email, password }) => {
    setError(null);
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    message.success(`Welcome back, ${res.user.name.split(' ')[0]}!`);
    const dest = location.state?.from || (res.user.role === 'admin' ? '/admin' : '/');
    navigate(dest, { replace: true });
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="inline-flex bg-[#e0292f] rounded-xl p-3 mb-4"><Car size={28} color="white" /></span>
            <h1 className="text-2xl font-extrabold text-gray-900 m-0">Welcome Back</h1>
            <p className="text-gray-500 text-sm mt-2 m-0">Sign in to manage favorites and your account</p>
          </div>

          {error && <Alert type="error" message={error} showIcon className="mb-5" />}

          <Form layout="vertical" onFinish={onFinish} requiredMark={false}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Valid email required' }]}>
              <Input size="large" placeholder="you@example.com" autoComplete="email" />
            </Form.Item>
            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password required' }]}>
              <Input.Password size="large" placeholder="••••••••" autoComplete="current-password" />
            </Form.Item>
            <Button htmlType="submit" type="primary" danger size="large" block className="font-bold mt-2" loading={submitting}>
              Sign In
            </Button>
          </Form>

          <p className="text-center text-sm text-gray-500 mt-6 m-0">
            Don’t have an account?{' '}
            <Link to="/register" className="text-[#e0292f] font-semibold no-underline">Create one</Link>
          </p>
        </div>

        <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 mt-5 text-xs text-gray-600">
          <strong>Demo accounts:</strong>
          <div className="mt-1.5 space-y-1">
            <div>Admin — <code>admin@autodeal.com</code> / <code>admin123</code></div>
            <div>User — <code>john@example.com</code> / <code>password123</code></div>
          </div>
        </div>
      </div>
    </div>
  );
}
