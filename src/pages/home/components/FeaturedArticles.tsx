import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../../config/firebase'; 
import { collection, query, getDocs, limit } from 'firebase/firestore';
export default function FeaturedArticles() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [articles, setArticles] = useState<any[]>([]);

  useEffect(() => {
    // Load published articles from localStorage
    const loadArticlesFromFirebase = async () => {
    try {
      // 1. Tạo một tham chiếu đến collection
      const articlesCollectionRef = collection(db, 'published_articles');

      // 2. Tạo truy vấn (Query): Giới hạn chỉ lấy 4 bài viết đầu tiên
      const q = query(articlesCollectionRef, limit(4));

      // 3. Thực hiện truy vấn
      const querySnapshot = await getDocs(q);

      // 4. Xử lý dữ liệu: Map qua các document để lấy data và id
      const fetchedArticles = querySnapshot.docs.map(doc => ({
        // Lấy ID của document (quan trọng cho các hoạt động sau này)
        id: doc.id,
        // Lấy các trường dữ liệu còn lại
        ...doc.data(), 
      }));

      // 5. Cập nhật state
      setArticles(fetchedArticles);

      console.log(`Đã tải thành công ${fetchedArticles.length} bài viết từ Firestore.`);

    } catch (error) {
      console.error('Lỗi khi tải bài viết từ Firebase:', error);
      // Fallback: Sử dụng các bài viết mặc định nếu có lỗi
      setArticles(getDefaultArticles());
    }
  };

  // Gọi hàm tải dữ liệu
  loadArticlesFromFirebase();
  }, []);

  const getDefaultArticles = () => [
    {
      id: '1',
      title: '10 Cách Đơn Giản Giảm Rác Thải Nhựa Hàng Ngày',
      category: 'Lối Sống Xanh',
      publishedAt: '2025-01-15T00:00:00.000Z',
      featuredImage: 'https://readdy.ai/api/search-image?query=reusable%20shopping%20bags%20and%20containers%20zero%20waste%20lifestyle%20eco%20friendly%20products%20sustainable%20living%20items%20bamboo%20products%20simple%20clean%20white%20background%20minimalist%20style&width=500&height=500&seq=art-001&orientation=squarish',
      author: 'Mai Anh'
    },
    {
      id: '2',
      title: 'Năng Lượng Mặt Trời: Tương Lai Của Việt Nam',
      category: 'Năng Lượng',
      publishedAt: '2025-01-12T00:00:00.000Z',
      featuredImage: 'https://readdy.ai/api/search-image?query=solar%20panel%20installation%20on%20rooftop%20in%20vietnam%20tropical%20setting%20renewable%20energy%20system%20modern%20house%20with%20solar%20power%20blue%20sky%20simple%20clean%20background&width=500&height=500&seq=art-002&orientation=squarish',
      author: 'Tuấn Minh'
    },
    {
      id: '3',
      title: 'Bảo Vệ Rừng Nhiệt Đới: Vai Trò Của Mỗi Người',
      category: 'Bảo Tồn',
      publishedAt: '2025-01-10T00:00:00.000Z',
      featuredImage: 'https://readdy.ai/api/search-image?query=tropical%20rainforest%20canopy%20with%20diverse%20wildlife%20lush%20green%20vegetation%20biodiversity%20conservation%20pristine%20jungle%20environment%20natural%20habitat%20simple%20clean%20background&width=500&height=500&seq=art-003&orientation=squarish',
      author: 'Hương Giang'
    },
    {
      id: '4',
      title: 'Nông Nghiệp Hữu Cơ: Xu Hướng Bền Vững',
      category: 'Nông Nghiệp',
      publishedAt: '2025-01-08T00:00:00.000Z',
      featuredImage: 'https://readdy.ai/api/search-image?query=organic%20farming%20vegetables%20growing%20in%20healthy%20soil%20sustainable%20agriculture%20fresh%20produce%20natural%20farming%20methods%20green%20crops%20simple%20clean%20background&width=500&height=500&seq=art-004&orientation=squarish',
      author: 'Đức Anh'
    }
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getDefaultImage = (category: string) => {
    const imageMap: Record<string, string> = {
      'Lối Sống Xanh': 'https://readdy.ai/api/search-image?query=eco%20friendly%20green%20lifestyle%20sustainable%20living%20natural%20products%20simple%20clean%20background&width=500&height=500&seq=default-1&orientation=squarish',
      'Biến Đổi Khí Hậu': 'https://readdy.ai/api/search-image?query=climate%20change%20environmental%20impact%20earth%20protection%20simple%20clean%20background&width=500&height=500&seq=default-2&orientation=squarish',
      'Năng Lượng Tái Tạo': 'https://readdy.ai/api/search-image?query=renewable%20energy%20solar%20wind%20power%20clean%20energy%20simple%20clean%20background&width=500&height=500&seq=default-3&orientation=squarish',
      'Bảo Tồn Thiên Nhiên': 'https://readdy.ai/api/search-image?query=nature%20conservation%20wildlife%20protection%20forest%20preservation%20simple%20clean%20background&width=500&height=500&seq=default-4&orientation=squarish',
      'Giảm Rác Thải': 'https://readdy.ai/api/search-image?query=waste%20reduction%20recycling%20zero%20waste%20lifestyle%20simple%20clean%20background&width=500&height=500&seq=default-5&orientation=squarish',
      'Nông Nghiệp Hữu Cơ': 'https://readdy.ai/api/search-image?query=organic%20farming%20fresh%20vegetables%20sustainable%20agriculture%20simple%20clean%20background&width=500&height=500&seq=default-6&orientation=squarish',
      'Giao Thông Xanh': 'https://readdy.ai/api/search-image?query=green%20transportation%20electric%20vehicles%20sustainable%20mobility%20simple%20clean%20background&width=500&height=500&seq=default-7&orientation=squarish',
      'Kiến Trúc Xanh': 'https://readdy.ai/api/search-image?query=green%20architecture%20sustainable%20building%20eco%20friendly%20design%20simple%20clean%20background&width=500&height=500&seq=default-8&orientation=squarish'
    };
    return imageMap[category] || 'https://readdy.ai/api/search-image?query=environmental%20protection%20nature%20conservation%20simple%20clean%20background&width=500&height=500&seq=default-9&orientation=squarish';
  };

  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 border border-white/30 rounded-full text-white text-sm whitespace-nowrap">
              Bài Viết Nổi Bật
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white flex-1 ml-8">
            Đọc Những Câu Chuyện Truyền Cảm Hứng
          </h2>
        </div>

        {articles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <i className="ri-article-line text-5xl text-gray-600"></i>
            </div>
            <p className="text-gray-400 text-lg mb-6">Chưa có bài viết nào được đăng</p>
            <Link
              to="/write"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-add-line"></i>
              Viết Bài Đầu Tiên
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 gap-6 overflow-x-auto">
            {articles.map((article, index) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="bg-amber-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all">
                  <div 
                    className="w-full h-80 bg-cover bg-top relative"
                    style={{ backgroundImage: `url('${article.featuredImage || getDefaultImage(article.category)}')` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="bg-gray-900 p-6">
                    <h3 className="text-white text-lg font-bold mb-3 leading-snug group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <div className="flex items-center justify-between text-gray-400 text-sm">
                      <span>{article.category}</span>
                      <span>{formatDate(article.publishedAt)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <span className="text-gray-500 text-sm">Bởi {article.author || 'Ẩn danh'}</span>
                      <div className="flex gap-2">
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                          <i className="ri-facebook-fill text-gray-400 hover:text-blue-400"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                          <i className="ri-twitter-x-fill text-gray-400 hover:text-gray-200"></i>
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
                          <i className="ri-share-line text-gray-400 hover:text-emerald-400"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}