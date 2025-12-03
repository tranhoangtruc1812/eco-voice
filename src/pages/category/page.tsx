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
}

const categoryInfo: Record<string, { title: string; description: string; icon: string; color: string; bgColor: string }> = {
  'climate-change': {
    title: 'Biến Đổi Khí Hậu',
    description: 'Hiểu rõ nguyên nhân, tác động và giải pháp cho cuộc khủng hoảng khí hậu toàn cầu',
    icon: 'ri-temp-hot-line',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  'renewable-energy': {
    title: 'Năng Lượng Tái Tạo',
    description: 'Khám phá các nguồn năng lượng sạch và bền vững cho tương lai',
    icon: 'ri-sun-line',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  'conservation': {
    title: 'Bảo Tồn Thiên Nhiên',
    description: 'Bảo vệ đa dạng sinh học và các hệ sinh thái quý giá',
    icon: 'ri-plant-line',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  'pollution': {
    title: 'Ô Nhiễm Môi Trường',
    description: 'Giải quyết các vấn đề ô nhiễm không khí, nước và đất',
    icon: 'ri-mist-line',
    color: 'text-gray-600',
    bgColor: 'bg-gray-50'
  },
  'sustainable-living': {
    title: 'Sống Bền Vững',
    description: 'Thực hành lối sống thân thiện với môi trường',
    icon: 'ri-leaf-line',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  'ocean': {
    title: 'Bảo Vệ Đại Dương',
    description: 'Giữ gìn và phục hồi các hệ sinh thái biển',
    icon: 'ri-water-flash-line',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  'forest': {
    title: 'Bảo Vệ Rừng',
    description: 'Chống phá rừng và phục hồi rừng nhiệt đới',
    icon: 'ri-tree-line',
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50'
  },
  'recycling': {
    title: 'Tái Chế & Giảm Rác',
    description: 'Quản lý chất thải và kinh tế tuần hoàn',
    icon: 'ri-recycle-line',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  }
};

export default function Category() {
  const { slug } = useParams<{ slug: string }>();
  const [isScrolled, setIsScrolled] = useState(false);
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'popular'>('newest');

  const category = slug ? categoryInfo[slug] : null;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const allArticles: Article[] = JSON.parse(savedArticles);
      setArticles(allArticles);
      
      if (slug) {
        const filtered = allArticles.filter(article => {
          const articleCategory = article.category.toLowerCase().replace(/\s+/g, '-');
          return articleCategory === slug;
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

  if (!category) {
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
      <section className={`${category.bgColor} pt-32 pb-20`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-16 h-16 flex items-center justify-center ${category.bgColor} rounded-2xl`}>
              <i className={`${category.icon} text-4xl ${category.color}`}></i>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Danh Mục</p>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {category.title}
              </h1>
            </div>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl">
            {category.description}
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
                      <div className={`w-full h-48 ${category.bgColor} flex items-center justify-center`}>
                        <i className={`${category.icon} text-6xl ${category.color}`}></i>
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`px-3 py-1 ${category.bgColor} ${category.color} rounded-full text-xs font-medium whitespace-nowrap`}>
                          {article.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(article.date).toLocaleDateString('vi-VN')}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-teal-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.description}
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
                  className={`${cat.bgColor} rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer group`}
                >
                  <div className={`w-12 h-12 flex items-center justify-center mb-4`}>
                    <i className={`${cat.icon} text-3xl ${cat.color}`}></i>
                  </div>
                  <h3 className={`text-lg font-bold text-gray-900 mb-2 group-hover:${cat.color} transition-colors`}>
                    {cat.title}
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
