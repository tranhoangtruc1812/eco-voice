import { useState } from 'react';
import { Link } from 'react-router-dom';

interface NavbarProps {
  isScrolled: boolean;
}

export default function Navbar({ isScrolled }: NavbarProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 flex items-center justify-center">
              <i className="ri-leaf-line text-3xl text-emerald-600"></i>
            </div>
            <span className={`text-xl font-bold transition-colors ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              EcoVoice
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Trang Chủ
            </Link>
            <Link to="/categories" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Danh Mục
            </Link>
            <Link to="/write" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              Đăng Bài
            </Link>
            <Link to="/contact" className={`text-sm font-medium transition-colors hover:text-emerald-600 ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
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
            <Link 
              to="/write" 
              className="px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors whitespace-nowrap cursor-pointer"
            >
              Đăng Bài
            </Link>
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