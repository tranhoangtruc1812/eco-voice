import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  tags: string[];
  author: string;
  date: string;
  image?: string;
  readTime?: number;
  excerpt?: string;
  publishedAt?: string;
}

const categoryInfo: Record<string, { name: string; description: string; icon: string; color: string; bgColor?: string }> = {
  'climate-change': {
    name: 'Biến Đổi Khí Hậu',
    description: 'Tìm hiểu về biến đổi khí hậu toàn cầu, nguyên nhân, tác động và các giải pháp ứng phó hiệu quả',
    icon: 'ri-temp-hot-line',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-50'
  },
  'renewable-energy': {
    name: 'Năng Lượng Tái Tạo',
    description: 'Khám phá các nguồn năng lượng sạch như năng lượng mặt trời, gió, thủy điện và sinh khối',
    icon: 'ri-sun-line',
    color: 'from-yellow-500 to-orange-500',
    bgColor: 'bg-yellow-50'
  },
  'nature-conservation': {
    name: 'Bảo Tồn Thiên Nhiên',
    description: 'Bảo vệ đa dạng sinh học, hệ sinh thái và các loài động thực vật quý hiếm',
    icon: 'ri-leaf-line',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-50'
  },
  'pollution': {
    name: 'Ô Nhiễm Môi Trường',
    description: 'Nhận biết các dạng ô nhiễm không khí, nước, đất và cách giảm thiểu tác động',
    icon: 'ri-mist-line',
    color: 'from-gray-500 to-slate-600',
    bgColor: 'bg-gray-50'
  },
  'sustainable-living': {
    name: 'Sống Bền Vững',
    description: 'Áp dụng lối sống thân thiện với môi trường trong cuộc sống hàng ngày',
    icon: 'ri-recycle-line',
    color: 'from-teal-500 to-cyan-500',
    bgColor: 'bg-teal-50'
  },
  'ocean-protection': {
    name: 'Bảo Vệ Đại Dương',
    description: 'Giữ gìn đại dương, bảo vệ sinh vật biển và chống ô nhiễm nhựa',
    icon: 'ri-water-flash-line',
    color: 'from-blue-500 to-indigo-500',
    bgColor: 'bg-blue-50'
  },
  'forest-protection': {
    name: 'Bảo Vệ Rừng',
    description: 'Chống phá rừng, trồng cây xanh và bảo vệ lá phổi xanh của hành tinh',
    icon: 'ri-plant-line',
    color: 'from-lime-500 to-green-600',
    bgColor: 'bg-lime-50'
  },
  'recycling': {
    name: 'Tái Chế & Giảm Rác',
    description: 'Tái chế vật liệu, giảm thiểu rác thải và xây dựng nền kinh tế tuần hoàn',
    icon: 'ri-delete-bin-line',
    color: 'from-emerald-500 to-teal-500',
    bgColor: 'bg-emerald-50'
  },
  'waste-management': {
    name: 'Xử Lý Chất Thải',
    description: 'Quản lý và xử lý chất thải rắn, lỏng, khí một cách hiệu quả và an toàn',
    icon: 'ri-delete-bin-2-line',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50'
  },
  'environmental-permits': {
    name: 'Cấp Phép Giấy Phép Môi Trường',
    description: 'Hướng dẫn thủ tục, quy định pháp lý về giấy phép môi trường cho doanh nghiệp',
    icon: 'ri-file-list-3-line',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50'
  }
};

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');
  const [customCategories, setCustomCategories] = useState<any[]>([]);

  const category = slug ? categoryInfo[slug] : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load custom categories
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

  useEffect(() => {
    // Đọc từ published_articles thay vì articles
    const savedArticles = localStorage.getItem('published_articles');
    if (savedArticles) {
      const allArticles: Article[] = JSON.parse(savedArticles);
      setArticles(allArticles);
      
      if (slug) {
        // Lọc bài viết theo slug của danh mục
        const filtered = allArticles.filter(article => {
          // Chuyển tên danh mục thành slug để so sánh
          const articleCategorySlug = article.category
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
          
          return articleCategorySlug === slug;
        });
        setFilteredArticles(filtered);
      }
    }
  }, [slug]);

  useEffect(() => {
    let sorted = [...filteredArticles];
    if (sortBy === 'newest') {
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'oldest') {
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    setFilteredArticles(sorted);
  }, [sortBy]);

  // Tìm thông tin danh mục từ custom categories nếu không có trong categoryInfo
  const getCurrentCategory = () => {
    if (category) return category;
    
    const customCat = customCategories.find(cat => cat.slug === slug);
    if (customCat) {
      return {
        name: customCat.name,
        description: customCat.description,
        icon: customCat.icon,
        color: 'text-gray-900',
        bgColor: 'bg-gray-50'
      };
    }
    
    return null;
  };

  const currentCategory = getCurrentCategory();

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <i className="ri-error-warning-line text-6xl text-gray-400 mb-4"></i>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy danh mục</h1>
          <Link to="/" className="text-teal-600 hover:text-teal-700 cursor-pointer">
            Quay về trang chủ
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className={`${currentCategory.bgColor || 'bg-gray-50'} pt-32 pb-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-16 h-16 flex items-center justify-center ${currentCategory.bgColor || 'bg-gray-100'} rounded-2xl`}>
              <i className={`${currentCategory.icon} text-4xl ${currentCategory.color}`}></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Danh Mục</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {currentCategory.name}
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            {currentCategory.description}
          </p>
        </div>
      </section>

      {/* Filter & Sort */}
      <section className="py-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {filteredArticles.length} bài viết
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">Sắp xếp:</span>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortBy('newest')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    sortBy === 'newest'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Mới nhất
                </button>
                <button
                  onClick={() => setSortBy('oldest')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    sortBy === 'oldest'
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Cũ nhất
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-20">
              <i className="ri-article-line text-6xl text-gray-300 mb-4"></i>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Chưa có bài viết nào
              </h3>
              <p className="text-gray-600 mb-6">
                Hãy là người đầu tiên viết bài về chủ đề này!
              </p>
              <Link
                to="/write"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-full font-medium hover:bg-teal-700 transition-colors cursor-pointer whitespace-nowrap"
              >
                <i className="ri-edit-line"></i>
                Viết Bài Ngay
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Link
                  key={article.id}
                  to={`/article/${article.id}`}
                  className="group cursor-pointer"
                >
                  <div className="bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                    {article.image ? (
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className={`w-full h-48 ${currentCategory.bgColor || 'bg-gray-100'} flex items-center justify-center`}>
                        <i className={`${currentCategory.icon} text-6xl ${currentCategory.color}`}></i>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 ${currentCategory.bgColor || 'bg-gray-100'} ${currentCategory.color} rounded-full text-xs font-medium whitespace-nowrap`}>
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(article.publishedAt || article.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt || article.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                            <span className="text-teal-600 text-xs font-bold">
                              {article.author.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm text-gray-700">{article.author}</span>
                        </div>
                        {article.readTime && (
                          <span className="text-xs text-gray-500">
                            {article.readTime} phút đọc
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Khám Phá Thêm</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(categoryInfo)
              .filter(([key]) => key !== slug)
              .slice(0, 4)
              .map(([key, cat]) => (
                <Link
                  key={key}
                  to={`/category/${key}`}
                  className={`${cat.bgColor || 'bg-gray-100'} rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center mb-4`}>
                    <i className={`${cat.icon} text-3xl ${cat.color}`}></i>
                  </div>
                  <h3 className={`text-lg font-bold text-gray-900 mb-2 group-hover:${cat.color} transition-colors`}>
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {cat.description}
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
