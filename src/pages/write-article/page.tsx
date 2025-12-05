
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import ArticleEditor from './components/ArticleEditor';
import ArticlePreview from './components/ArticlePreview';

import { db, auth } from '../../config/firebase'; // Đảm bảo đường dẫn chính xác đến tệp cấu hình Firebase của bạn
import { collection, addDoc, doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
export default function WriteArticle() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [isEditing, setIsEditing] = useState(false);
  const [articleData, setArticleData] = useState({
    id: '',
    title: '',
    category: 'Lối Sống Xanh',
    content: '',
    excerpt: '',
    featuredImage: '',
    tags: [] as string[],
    author: '',
    readTime: 5
  });

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      } else {
        setArticleData(prev => ({
          ...prev,
          author: user.email || 'Người dùng'
        }));
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  // Load draft from localStorage on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('article_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setArticleData(draft);
        showToastMessage('Đã tải bản nháp trước đó', 'success');
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    const autoSaveInterval = setInterval(() => {
      if (articleData.title || articleData.content) {
        localStorage.setItem('article_draft', JSON.stringify(articleData));
      }
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, [articleData]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showToastMessage = (message: string, type: 'success' | 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSaveDraft = async () => {
    // Kiểm tra User ID để đảm bảo có nơi lưu bản nhá

    try {
      // 1. Chuẩn bị dữ liệu bản nháp
      const draftData = {
        ...articleData,
        // Lưu lại timestamp lần cuối cùng lưu
        savedAt: new Date().toISOString(), 
        status: 'draft',
      };

      // 2. LƯU BẢN NHÁP VÀO FIRESTORE
      // Sử dụng setDoc để tạo hoặc ghi đè tài liệu.
      // Tên collection: 'article_drafts'
      // ID của document: userId (đảm bảo mỗi người dùng chỉ có một bản nháp)
      await addDoc(collection(db, 'article_drafts'), draftData);

      // 3. (Tùy chọn) Xóa các mục lưu trữ cục bộ cũ
      localStorage.removeItem('article_draft');
      localStorage.removeItem('article_draft_timestamp');

      showToastMessage('Bản nháp đã được lưu thành công trên đám mây!', 'success');
      
    } catch (error) {
      console.error('Lỗi khi lưu bản nháp lên Firebase:', error);
      showToastMessage('Lỗi khi lưu bản nháp', 'error');
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    if (!id) return; // Write new article

    const loadArticleForEdit = async () => {
      try {
        const docRef = doc(db, "published_articles", id);
        const snap = await getDoc(docRef);

        if (snap.exists()) {
          setArticleData({
            ...snap.data(),
            id: snap.id
          });
          setIsEditing(true);
          showToastMessage("Đang chỉnh sửa bài viết", "success");
        }
      } catch (error) {
        console.error("Error loading article:", error);
        showToastMessage("Không thể tải bài viết để chỉnh sửa", "error");
      }
    };

    loadArticleForEdit();
  }, []);

  const handlePublish = async () => {
    if (!articleData.title || !articleData.content) {
      showToastMessage("Vui lòng điền đầy đủ tiêu đề và nội dung!", "error");
      return;
    }

    try {
      const newArticle = {
        ...articleData,
        publishedAt: new Date().toISOString(),
        status: "published"
      };

      // --- UPDATE MODE ---
      if (isEditing && articleData.id) {
        await setDoc(
          doc(db, "published_articles", articleData.id),
          newArticle,
          { merge: true }
        );
        showToastMessage("Bài viết đã được cập nhật!", "success");
      }

      // --- CREATE MODE ---
      else {
        const docRef = await addDoc(
          collection(db, "published_articles"),
          newArticle
        );
        console.log("New article ID:", docRef.id);
        showToastMessage("Bài viết đã được xuất bản!", "success");
      }

      localStorage.removeItem("article_draft");
      localStorage.removeItem("article_draft_timestamp");

      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      console.error("Lỗi publish:", error);
      showToastMessage("Lỗi khi xuất bản bài viết", "error");
    }
  };

  const handleClearDraft = () => {
    if (confirm('Bạn có chắc muốn xóa bản nháp này?')) {
      localStorage.removeItem('article_draft');
      localStorage.removeItem('article_draft_timestamp');
      setArticleData({
        title: '',
        category: 'Lối Sống Xanh',
        content: '',
        excerpt: '',
        featuredImage: '',
        tags: [],
        author: '',
        readTime: 5
      });
      showToastMessage('Đã xóa bản nháp', 'success');
    }
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

      <div className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8 flex items-center justify-between">
            <Link to="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 text-sm font-medium cursor-pointer">
              <i className="ri-arrow-left-line"></i>
              Quay lại trang chủ
            </Link>
            
            {(articleData.title || articleData.content) && (
              <button
                onClick={handleClearDraft}
                className="text-sm text-gray-500 hover:text-red-600 cursor-pointer"
              >
                <i className="ri-delete-bin-line mr-1"></i>
                Xóa bản nháp
              </button>
            )}
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200 px-8 py-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Viết Bài Mới</h1>
              <p className="text-gray-600">Chia sẻ kiến thức và ý tưởng của bạn về bảo vệ môi trường</p>
            </div>

            <div className="border-b border-gray-200 px-8 py-4 flex items-center justify-between">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('edit')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'edit'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-edit-line mr-2"></i>
                  Chỉnh Sửa
                </button>
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                    activeTab === 'preview'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <i className="ri-eye-line mr-2"></i>
                  Xem Trước
                </button>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleSaveDraft}
                  className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-save-line mr-2"></i>
                  Lưu Nháp
                </button>
                <button
                  onClick={handlePublish}
                  className="px-6 py-2 bg-emerald-600 text-white rounded-full text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-send-plane-fill mr-2"></i>
                  Xuất Bản
                </button>
              </div>
            </div>

            <div className="p-8">
              {activeTab === 'edit' ? (
                <ArticleEditor articleData={articleData} setArticleData={setArticleData} />
              ) : (
                <ArticlePreview articleData={articleData} />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}