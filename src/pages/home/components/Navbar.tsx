import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../../../config/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userName, setUserName] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsLoggedIn(true);
      setUserName(user.displayName ?? user.email ?? '');
    } else {
      setIsLoggedIn(false);
      setUserName('');
    }
  });

  return () => unsubscribe();
}, []);

  const handleLogout = async () => {
  await signOut(auth);
  setShowUserMenu(false);
  navigate('/');
};

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <i className={`ri-leaf-line text-3xl ${isScrolled ? 'text-emerald-600' : 'text-white'}`}></i>
            </div>
            <span className={`text-xl font-bold ${isScrolled ? 'text-emerald-600' : 'text-white'}`}>
              EcoVoice
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium hover:text-emerald-700 transition-colors cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Trang Chủ
            </Link>
            <Link to="/about" className={`text-sm font-medium hover:text-emerald-700 transition-colors cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Giới Thiệu
            </Link>
            <Link to="/categories" className={`text-sm font-medium hover:text-emerald-700 transition-colors cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Danh Mục
            </Link>
            <Link to="/contact" className={`text-sm font-medium hover:text-emerald-700 transition-colors cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Liên Hệ
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`w-9 h-9 flex items-center justify-center transition-colors hover:text-emerald-600 cursor-pointer ${isScrolled ? 'text-gray-900' : 'text-white'}`}
            >
              <i className="ri-search-line text-xl"></i>
            </button>
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-user-line"></i>
                  </div>
                  <span>{userName}</span>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 border border-gray-100">
                    <Link
                      to="/write"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-edit-line mr-2"></i>
                      Đăng Bài
                    </Link>
                    <Link
                      to="/manage"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-file-list-line mr-2"></i>
                      Quản Lý Bài Viết
                    </Link>
                    <Link
                      to="/manage-categories"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-50 cursor-pointer"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <i className="ri-folder-line mr-2"></i>
                      Quản Lý Danh Mục
                    </Link>
                    <hr className="my-2 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <i className="ri-logout-box-line mr-2"></i>
                      Đăng Xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link 
                to="/login" 
                className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
              >
                Đăng Nhập
              </Link>
            )}
          </div>
        </div>

        {isSearchOpen && (
          <div className="mt-4 animate-fadeIn">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        )}
      </div>
    </nav>
  );
}