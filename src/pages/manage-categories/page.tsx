import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

import { db, auth} from '../../config/firebase'; 
import { collection, query, getDocs, limit, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';


interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  createdAt: string;
}

export default function ManageCategories() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'ri-leaf-line',
    color: '#10b981'
  });

  const iconOptions = [
    'ri-leaf-line',
    'ri-plant-line',
    'ri-recycle-line',
    'ri-sun-line',
    'ri-water-flash-line',
    'ri-earth-line',
    'ri-seedling-line',
    'ri-tree-line',
    'ri-lightbulb-line',
    'ri-building-line',
    'ri-car-line',
    'ri-home-line'
  ];

  const colorOptions = [
    { name: 'Xanh Lá', value: '#10b981' },
    { name: 'Xanh Dương', value: '#3b82f6' },
    { name: 'Cam', value: '#f97316' },
    { name: 'Tím', value: '#a855f7' },
    { name: 'Hồng', value: '#ec4899' },
    { name: 'Vàng', value: '#eab308' },
    { name: 'Đỏ', value: '#ef4444' },
    { name: 'Xanh Ngọc', value: '#14b8a6' }
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
      loadCategories();
    });

    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadCategories = () => {
    try {
      const stored = localStorage.getItem('custom_categories');
      if (stored) {
        const parsed = JSON.parse(stored);
        setCategories(parsed);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      showToastMessage('Lỗi khi tải danh mục', 'error');
    }
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const generateSlug = (name: string): string => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
  };

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon,
        color: category.color
      });
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        description: '',
        icon: 'ri-leaf-line',
        color: '#10b981'
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({
      name: '',
      description: '',
      icon: 'ri-leaf-line',
      color: '#10b981'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      showToastMessage('Vui lòng nhập tên danh mục', 'error');
      return;
    }

    try {
      const slug = generateSlug(formData.name);

      if (editingCategory) {
        // Update existing category
        const updatedCategories = categories.map(cat =>
          cat.id === editingCategory.id
            ? { ...cat, ...formData, slug, name: formData.name.trim() }
            : cat
        );
        localStorage.setItem('custom_categories', JSON.stringify(updatedCategories));
        setCategories(updatedCategories);
        showToastMessage('Đã cập nhật danh mục thành công!', 'success');
      } else {
        // Create new category
        const newCategory: Category = {
          id: Date.now().toString(),
          name: formData.name.trim(),
          slug,
          description: formData.description.trim(),
          icon: formData.icon,
          color: formData.color,
          createdAt: new Date().toISOString()
        };
        const updatedCategories = [...categories, newCategory];
        localStorage.setItem('custom_categories', JSON.stringify(updatedCategories));
        setCategories(updatedCategories);
        showToastMessage('Đã tạo danh mục mới thành công!', 'success');
      }

      handleCloseModal();
    } catch (error) {
      showToastMessage('Lỗi khi lưu danh mục', 'error');
    }
  };

  const handleDeleteClick = (id: string) => {
    setCategoryToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (!categoryToDelete) return;

    try {
      const updatedCategories = categories.filter(cat => cat.id !== categoryToDelete);
      localStorage.setItem('custom_categories', JSON.stringify(updatedCategories));
      setCategories(updatedCategories);
      showToastMessage('Đã xóa danh mục thành công!', 'success');
    } catch (error) {
      showToastMessage('Lỗi khi xóa danh mục', 'error');
    }

    setShowDeleteModal(false);
    setCategoryToDelete(null);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={isScrolled} />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 animate-slide-in">
          <div className={`px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 ${
            toastType === 'success' 
              ? 'bg-emerald-600 text-white' 
              : 'bg-red-600 text-white'
          }`}>
            <div className="w-5 h-5 flex items-center justify-center">
              <i className={`${toastType === 'success' ? 'ri-check-line' : 'ri-error-warning-line'} text-xl`}></i>
            </div>
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mx-auto mb-4">
              <i className="ri-delete-bin-line text-3xl text-red-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-2">Xác Nhận Xóa</h3>
            <p className="text-gray-600 text-center mb-6">
              Bạn có chắc chắn muốn xóa danh mục này? Hành động này không thể hoàn tác.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
              >
                Hủy
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-6 py-3 bg-red-600 text-white rounded-full font-medium hover:bg-red-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                Xóa Danh Mục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full my-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {editingCategory ? 'Chỉnh Sửa Danh Mục' : 'Tạo Danh Mục Mới'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <i className="ri-close-line text-2xl"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên Danh Mục <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ví dụ: Lối Sống Xanh"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mô Tả
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Mô tả ngắn về danh mục này..."
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm resize-none"
                />
              </div>

              {/* Icon */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Biểu Tượng
                </label>
                <div className="grid grid-cols-6 gap-3">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setFormData({ ...formData, icon })}
                      className={`w-full aspect-square flex items-center justify-center rounded-lg border-2 transition-all cursor-pointer ${
                        formData.icon === icon
                          ? 'border-emerald-600 bg-emerald-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <i className={`${icon} text-2xl`} style={{ color: formData.color }}></i>
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu Sắc
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {colorOptions.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setFormData({ ...formData, color: color.value })}
                      className={`px-4 py-3 rounded-lg border-2 transition-all cursor-pointer whitespace-nowrap ${
                        formData.color === color.value
                          ? 'border-gray-900'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.value + '20' }}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: color.value }}
                        ></div>
                        <span className="text-sm font-medium text-gray-700">{color.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-6">
                <p className="text-sm font-medium text-gray-700 mb-3">Xem Trước:</p>
                <div className="bg-white rounded-xl p-6 border border-gray-200 inline-block">
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full mb-3"
                    style={{ backgroundColor: formData.color + '20' }}
                  >
                    <i className={`${formData.icon} text-3xl`} style={{ color: formData.color }}></i>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-1">
                    {formData.name || 'Tên Danh Mục'}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {formData.description || 'Mô tả danh mục'}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  {editingCategory ? 'Cập Nhật' : 'Tạo Danh Mục'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Quản Lý Danh Mục</h1>
                <p className="text-gray-600">Tạo và quản lý các danh mục bài viết của bạn</p>
              </div>
              <button
                onClick={() => handleOpenModal()}
                className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
              >
                <i className="ri-add-line text-xl"></i>
                Tạo Danh Mục
              </button>
            </div>

            {/* Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-full">
                  <i className="ri-folder-line text-2xl text-emerald-600"></i>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tổng Số Danh Mục</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Categories Grid */}
          {categories.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-gray-200">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                <i className="ri-folder-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa Có Danh Mục</h3>
              <p className="text-gray-600 mb-6">
                Bạn chưa tạo danh mục nào. Hãy tạo danh mục đầu tiên để bắt đầu!
              </p>
              <button
                onClick={() => handleOpenModal()}
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line"></i>
                Tạo Danh Mục Đầu Tiên
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center rounded-full mb-4"
                    style={{ backgroundColor: category.color + '20' }}
                  >
                    <i className={`${category.icon} text-3xl`} style={{ color: category.color }}></i>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description || 'Chưa có mô tả'}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    Tạo ngày: {formatDate(category.createdAt)}
                  </p>
                  <div className="flex gap-2">
                    <Link
                      to={`/category/${category.slug}`}
                      className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap text-center"
                    >
                      <i className="ri-eye-line mr-2"></i>
                      Xem
                    </Link>
                    <button
                      onClick={() => handleOpenModal(category)}
                      className="flex-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-edit-line mr-2"></i>
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDeleteClick(category.id)}
                      className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer whitespace-nowrap"
                    >
                      <i className="ri-delete-bin-line mr-2"></i>
                      Xóa
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}