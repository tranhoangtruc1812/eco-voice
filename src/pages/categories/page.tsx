import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function Categories() {
  const [isScrolled, setIsScrolled] = useState(false);

  const defaultCategories = [
    {
      name: 'Lối Sống Xanh',
      slug: 'loi-song-xanh',
      description: 'Khám phá cách sống thân thiện với môi trường trong cuộc sống hàng ngày',
      icon: 'ri-leaf-line',
      color: '#10b981',
      articleCount: 24
    },
    {
      name: 'Biến Đổi Khí Hậu',
      slug: 'bien-doi-khi-hau',
      description: 'Hiểu rõ về biến đổi khí hậu và tác động của nó đến hành tinh',
      icon: 'ri-earth-line',
      color: '#3b82f6',
      articleCount: 18
    },
    {
      name: 'Năng Lượng Tái Tạo',
      slug: 'nang-luong-tai-tao',
      description: 'Tìm hiểu về các nguồn năng lượng sạch và bền vững',
      icon: 'ri-sun-line',
      color: '#f59e0b',
      articleCount: 15
    },
    {
      name: 'Bảo Tồn Thiên Nhiên',
      slug: 'bao-ton-thien-nhien',
      description: 'Bảo vệ đa dạng sinh học và các hệ sinh thái tự nhiên',
      icon: 'ri-plant-line',
      color: '#059669',
      articleCount: 21
    },
    {
      name: 'Giảm Rác Thải',
      slug: 'giam-rac-thai',
      description: 'Giảm thiểu rác thải và tái chế hiệu quả',
      icon: 'ri-recycle-line',
      color: '#8b5cf6',
      articleCount: 12
    },
    {
      name: 'Nông Nghiệp Hữu Cơ',
      slug: 'nong-nghiep-huu-co',
      description: 'Phương pháp canh tác bền vững và thân thiện với môi trường',
      icon: 'ri-seedling-line',
      color: '#84cc16',
      articleCount: 9
    },
    {
      name: 'Giao Thông Xanh',
      slug: 'giao-thong-xanh',
      description: 'Phương tiện và giải pháp giao thông thân thiện môi trường',
      icon: 'ri-car-line',
      color: '#06b6d4',
      articleCount: 14
    },
    {
      name: 'Kiến Trúc Xanh',
      slug: 'kien-truc-xanh',
      description: 'Thiết kế và xây dựng công trình bền vững',
      icon: 'ri-building-line',
      color: '#6366f1',
      articleCount: 11
    },
    {
      name: 'Xử Lý Chất Thải',
      slug: 'xu-ly-chat-thai',
      description: 'Công nghệ và phương pháp xử lý chất thải hiệu quả',
      icon: 'ri-delete-bin-line',
      color: '#ef4444',
      articleCount: 8
    },
    {
      name: 'Cấp Phép Giấy Phép Môi Trường',
      slug: 'cap-phep-giay-phep-moi-truong',
      description: 'Hướng dẫn về các quy định và giấy phép môi trường',
      icon: 'ri-file-list-line',
      color: '#f97316',
      articleCount: 7
    }
  ];

  // Load custom categories from localStorage
  const [customCategories, setCustomCategories] = useState<Array<{
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: string;
    color: string;
  }>>([]);

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
    ...defaultCategories,
    ...customCategories.map(cat => ({
      ...cat,
      articleCount: 0 // Custom categories start with 0 articles
    }))
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar isScrolled={isScrolled} />

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">Danh Mục Bài Viết</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá các chủ đề về môi trường và phát triển bền vững
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allCategories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all group cursor-pointer"
              >
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full mb-4 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: category.color + '20' }}
                >
                  <i className={`${category.icon} text-3xl`} style={{ color: category.color }}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{category.articleCount} bài viết</span>
                  <div className="w-8 h-8 flex items-center justify-center">
                    <i className="ri-arrow-right-line text-xl text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all"></i>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
