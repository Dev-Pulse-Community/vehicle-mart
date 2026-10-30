import { Navigate, Outlet, useLocation, Link } from 'react-router';
import { Result, Button, Spin } from 'antd';
import { useApp } from '../context/AppContext';

function CenteredSpin() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Spin size="large" />
    </div>
  );
}

export function RequireAuth() {
  const { currentUser, authLoading } = useApp();
  const location = useLocation();
  if (authLoading) return <CenteredSpin />;
  if (!currentUser) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  return <Outlet />;
}

export function RequireAdmin() {
  const { currentUser, authLoading } = useApp();
  const location = useLocation();
  if (authLoading) return <CenteredSpin />;
  if (!currentUser) return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  if (currentUser.role !== 'admin') {
    return (
      <Result
        status="403"
        title="Access Denied"
        subTitle="You need administrator privileges to view this page."
        extra={<Link to="/"><Button type="primary" danger>Back to Home</Button></Link>}
      />
    );
  }
  return <Outlet />;
}
