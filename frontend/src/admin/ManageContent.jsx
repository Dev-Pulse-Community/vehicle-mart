import { useCallback, useEffect, useState } from 'react';
import { Table, Tag, Button, Modal, Form, Input, message, Space, Popconfirm } from 'antd';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import moment from 'moment';
import api, { apiError } from '../api/client';

const FALLBACK_IMG =
  'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?auto=format&fit=crop&w=1200&q=70';

export default function ManageContent() {
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState({ open: false, post: null });
  const [saving, setSaving] = useState(false);
  const [form] = Form.useForm();

  const fetchPosts = useCallback(async (p = page) => {
    setLoading(true);
    try {
      const { data } = await api.get('/news', { params: { all: true, page: p, per_page: 10 } });
      setPosts(data.data.data);
      setTotal(data.data.total);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchPosts(page); }, [page]); // eslint-disable-line react-hooks/exhaustive-deps

  const openModal = (post = null) => {
    setModal({ open: true, post });
    form.setFieldsValue(post || { title: '', author: '', excerpt: '', content: '', image: '' });
  };

  const onSubmit = async (values) => {
    const payload = { ...values, image: values.image || FALLBACK_IMG };
    setSaving(true);
    try {
      if (modal.post) {
        await api.put(`/news/${modal.post.id}`, payload);
        message.success('Post updated');
      } else {
        await api.post('/news', payload);
        message.success('Post published');
      }
      setModal({ open: false, post: null });
      form.resetFields();
      fetchPosts();
    } catch (error) {
      message.error(apiError(error, 'Could not save post.'));
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async (post) => {
    try {
      await api.delete(`/news/${post.id}`);
      message.success('Post deleted');
      fetchPosts();
    } catch (error) {
      message.error(apiError(error, 'Could not delete post.'));
    }
  };

  const columns = [
    {
      title: 'Post',
      key: 'post',
      render: (_, p) => (
        <div className="flex items-center gap-3">
          <img src={p.image} alt="" className="w-16 h-11 object-cover rounded-md hidden sm:block" />
          <div>
            <div className="font-semibold leading-snug">{p.title}</div>
            <div className="text-xs text-gray-400">by {p.author}</div>
          </div>
        </div>
      ),
    },
    { title: 'Published', dataIndex: 'published_at', responsive: ['md'], render: (d) => (d ? moment(d).format('MMM D, YYYY') : '—') },
    {
      title: 'Status', dataIndex: 'published_at',
      key: 'status',
      render: (d) => (d && moment(d).isSameOrBefore() ? <Tag color="green">Published</Tag> : <Tag>Draft</Tag>),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, p) => (
        <Space>
          <Button size="small" icon={<Pencil size={13} />} onClick={() => openModal(p)} />
          <Popconfirm title="Delete this post?" okText="Delete" okButtonProps={{ danger: true }}
            onConfirm={() => onDelete(p)}>
            <Button size="small" danger icon={<Trash2 size={13} />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900 m-0">Site Content ({total} posts)</h1>
          <p className="text-sm text-gray-500 mt-1 m-0">Manage news articles and promotional posts shown on the home page.</p>
        </div>
        <Button type="primary" danger icon={<Plus size={15} />} onClick={() => openModal()}>
          New Post
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-4">
        <Table columns={columns} dataSource={posts} rowKey="id" scroll={{ x: 600 }} loading={loading}
          pagination={{ current: page, total, pageSize: 10, showSizeChanger: false, onChange: setPage }} />
      </div>

      <Modal
        title={modal.post ? 'Edit Post' : 'New Post'}
        open={modal.open}
        onCancel={() => setModal({ open: false, post: null })}
        onOk={() => form.submit()}
        okText={modal.post ? 'Save Changes' : 'Publish'}
        okButtonProps={{ danger: true, type: 'primary', loading: saving }}
        width={640}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" onFinish={onSubmit} requiredMark={false} className="mt-4">
          <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Author" name="author" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Image URL" name="image"><Input placeholder="https://..." /></Form.Item>
          <Form.Item label="Excerpt" name="excerpt" rules={[{ required: true }]}><Input.TextArea rows={2} /></Form.Item>
          <Form.Item label="Content" name="content"><Input.TextArea rows={5} /></Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
