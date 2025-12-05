import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { db, auth} from '../../config/firebase'; 
import { collection, query, getDocs, limit, orderBy, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface Article {
  id: string;
  title: string;
  category: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  author: string;
  readTime: number;
  publishedAt: string;
  status: string;
}

export default function ManageArticles() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [articles, setArticles] = useState<any[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title'>('newest');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const categories = [
    'Lối Sống Xanh',
    'Biến Đổi Khí Hậu',
    'Năng Lượng Tái Tạo',
    'Bảo Tồn Thiên Nhiên',
    'Giảm Rác Thải',
    'Nông Nghiệp Hữu Cơ',
    'Giao Thông Xanh',
    'Kiến Trúc Xanh',
    'Xử Lý Chất Thải',
    'Cấp Phép Giấy Phép Môi Trường'
  ];

  // Load custom categories from localStorage
  const [customCategories, setCustomCategories] = useState<Array<{ name: string }>>([]);

  useEffect(() => {
    const stored = localStorage.getItem('custom_categories');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setCustomCategories(parsed);
      } catch (error) {
        console.error('Error loading custom categories:', error);
      }
    }
  }, []);

  // Combine default and custom categories
  const allCategories = [
    ...categories,
    ...customCategories.map(cat => cat.name)
  ];

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    filterAndSortArticles();
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const loadArticles = async () => {
    try {
      const q = query(
        collection(db, "published_articles"),
        orderBy("publishedAt", "desc")
      );

      const snapshot = await getDocs(q);

      const articlesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setArticles(articlesData);
    } catch (error) {
      console.error("Error loading articles:", error);
      showToastMessage("Lỗi khi tải danh sách bài viết", "error");
    }
  };

  const filterAndSortArticles = () => {
    let filtered = [...articles];

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      } else if (sortBy === 'oldest') {
        return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    setFilteredArticles(filtered);
  };

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDeleteClick = (id: string) => {
    setArticleToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!articleToDelete) return;

    try {
      await deleteDoc(doc(db, 'published_articles', articleToDelete));

      setArticles(prev => prev.filter(a => a.id !== articleToDelete));
      showToastMessage('Đã xóa bài viết thành công!', 'success');
    } catch (error) {
      console.error(error);
      showToastMessage('Lỗi khi xóa bài viết', 'error');
    }

    setShowDeleteModal(false);
    setArticleToDelete(null);
  };

  const handleEdit = (article: Article) => {
    navigate(`/write?id=${article.id}`);
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
              Bạn có chắc chắn muốn xóa bài viết này? Hành động này không thể hoàn tác.
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
                Xóa Bài Viết
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Quản Lý Bài Viết</h1>
                <p className="text-gray-600">Quản lý tất cả bài viết đã xuất bản của bạn</p>
              </div>
              <Link
                to="/write"
                className="px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
              >
                <i className="ri-add-line text-xl"></i>
                Viết Bài Mới
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 rounded-full">
                    <i className="ri-file-text-line text-2xl text-emerald-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tổng Bài Viết</p>
                    <p className="text-2xl font-bold text-gray-900">{articles.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-full">
                    <i className="ri-folder-line text-2xl text-blue-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Danh Mục</p>
                    <p className="text-2xl font-bold text-gray-900">{allCategories.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full">
                    <i className="ri-eye-line text-2xl text-purple-600"></i>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Đang Hiển Thị</p>
                    <p className="text-2xl font-bold text-gray-900">{filteredArticles.length}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Search */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">Tìm Kiếm</label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center">
                    <i className="ri-search-line text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Tìm theo tiêu đề, nội dung, tác giả..."
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Danh Mục</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
                >
                  <option value="all">Tất Cả Danh Mục</option>
                  {allCategories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Sort */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Sắp Xếp</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'title')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
                >
                  <option value="newest">Mới Nhất</option>
                  <option value="oldest">Cũ Nhất</option>
                  <option value="title">Theo Tiêu Đề</option>
                </select>
              </div>
            </div>
          </div>

          {/* Articles List */}
          {filteredArticles.length === 0 ? (
            <div className="bg-white rounded-xl p-16 text-center border border-gray-200">
              <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mx-auto mb-4">
                <i className="ri-file-list-line text-4xl text-gray-400"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Chưa Có Bài Viết</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || selectedCategory !== 'all' 
                  ? 'Không tìm thấy bài viết phù hợp với bộ lọc của bạn'
                  : 'Bạn chưa có bài viết nào. Hãy bắt đầu viết bài đầu tiên!'}
              </p>
              <Link
                to="/write"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-add-line"></i>
                Viết Bài Mới
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    {article.featuredImage && (
                      <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                        <div
                          className="w-full h-full bg-cover bg-center"
                          style={{ backgroundImage: `url('${article.featuredImage}')` }}
                        ></div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">
                              {article.category}
                            </span>
                            <span className="text-sm text-gray-500">{formatDate(article.publishedAt)}</span>
                          </div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                            {article.excerpt || article.content.substring(0, 150) + '...'}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <i className="ri-user-line"></i>
                              {article.author || 'Ẩn danh'}
                            </span>
                            <span className="flex items-center gap-1">
                              <i className="ri-time-line"></i>
                              {Math.ceil(article.content.split(' ').length / 200)} phút đọc
                            </span>
                            {article.tags.length > 0 && (
                              <span className="flex items-center gap-1">
                                <i className="ri-price-tag-3-line"></i>
                                {article.tags.length} tags
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 pt-4 border-t border-gray-200">
                        <Link
                          to={`/article/${article.id}`}
                          className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap text-center"
                        >
                          <i className="ri-eye-line mr-2"></i>
                          Xem
                        </Link>
                        <button
                          onClick={() => handleEdit(article)}
                          className="flex-1 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-200 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-edit-line mr-2"></i>
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteClick(article.id)}
                          className="flex-1 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition-colors cursor-pointer whitespace-nowrap"
                        >
                          <i className="ri-delete-bin-line mr-2"></i>
                          Xóa
                        </button>
                      </div>
                    </div>
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