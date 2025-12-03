import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import CommentSection from './components/CommentSection';
import { db } from '../../config/firebase'; 
import { doc, getDoc } from 'firebase/firestore';
export default function ArticleDetail() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { id } = useParams();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  // Đảm bảo có ID trước khi cố gắng tải
  if (!id) {
    setLoading(false);
    return;
  }

  const loadArticleFromFirebase = async () => {
    try {
      // 1. Tạo tham chiếu (Reference) đến document cụ thể
      // doc(db, 'tên_collection', ID_của_document)
      const docRef = doc(db, 'published_articles', id);

      // 2. Tải document
      const docSnap = await getDoc(docRef);

      // 3. Xử lý kết quả
      if (docSnap.exists()) {
        // Nếu document tồn tại, lấy dữ liệu và thêm ID
        const foundArticle = {
          id: docSnap.id,
          ...docSnap.data()
        };
        setArticle(foundArticle);
        console.log("Đã tải bài viết thành công:", foundArticle.id);
      } else {
        // Document không tồn tại
        console.log("Không tìm thấy bài viết với ID:", id);
        setArticle(null); // Đặt trạng thái bài viết là null hoặc hiển thị lỗi
      }
    } catch (error) {
      console.error('Lỗi khi tải bài viết từ Firebase:', error);
      // Xử lý lỗi (ví dụ: hiển thị thông báo lỗi cho người dùng)
    } finally {
      // Đặt loading thành false sau khi thao tác hoàn tất (thành công hoặc thất bại)
      setLoading(false);
    }
  };

  // Gọi hàm tải dữ liệu khi component được mount hoặc ID thay đổi
  loadArticleFromFirebase();
}, [id]); // Dependency array chứa id

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', { 
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar isScrolled={isScrolled} />
        <div className="pt-32 pb-16 text-center">
          <div className="max-w-4xl mx-auto px-6">
            <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
              <i className="ri-file-damage-line text-7xl text-gray-400"></i>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Không tìm thấy bài viết</h1>
            <p className="text-gray-600 mb-8">Bài viết bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
            >
              <i className="ri-arrow-left-line"></i>
              Quay lại trang chủ
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} />
      
      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium cursor-pointer">
              <i className="ri-arrow-left-line"></i>
              Quay lại trang chủ
            </Link>
          </div>

          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-6 text-gray-600 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                  <i className="ri-user-line text-emerald-600"></i>
                </div>
                <span>{article.author || 'Ẩn danh'}</span>
              </div>
              <span>{formatDate(article.publishedAt)}</span>
              <span>{calculateReadTime(article.content)} phút đọc</span>
            </div>
          </div>

          {article.featuredImage && (
            <div 
              className="w-full h-96 rounded-3xl bg-cover bg-center mb-12"
              style={{
                backgroundImage: `url('${article.featuredImage}')`
              }}
            ></div>
          )}

          <div className="prose prose-lg max-w-none">
            {article.excerpt && (
              <p className="text-xl text-gray-700 leading-relaxed mb-8">
                {article.excerpt}
              </p>
            )}

            <div 
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content.replace(/\n/g, '<br />') }}
            />

            {article.tags && article.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-200">
                <span className="text-gray-600 font-medium">Thẻ:</span>
                {article.tags.map((tag: string, index: number) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between py-8 border-t border-b border-gray-200 my-12">
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">Chia sẻ bài viết:</span>
              <div className="flex gap-2">
                <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
                  <i className="ri-facebook-fill"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
                  <i className="ri-twitter-x-fill"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors cursor-pointer">
                  <i className="ri-whatsapp-fill"></i>
                </button>
                <button className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors cursor-pointer">
                  <i className="ri-link"></i>
                </button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-heart-line"></i>
                <span className="text-sm font-medium">Yêu thích</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap">
                <i className="ri-bookmark-line"></i>
                <span className="text-sm font-medium">Lưu</span>
              </button>
            </div>
          </div>

          <CommentSection />
        </div>
      </article>

      <Footer />
    </div>
  );
}