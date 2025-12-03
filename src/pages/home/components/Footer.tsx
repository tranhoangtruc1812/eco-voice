import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter subscription:', email);
    setEmail('');
  };

  return (
    <footer className="bg-emerald-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 flex items-center justify-center">
                <i className="ri-leaf-line text-3xl text-emerald-300"></i>
              </div>
              <span className="text-xl font-bold">EcoVoice</span>
            </div>
            <p className="text-emerald-200 text-sm leading-relaxed">
              Nền tảng chia sẻ kiến thức và hành động vì môi trường bền vững
            </p>
          </div>

          <div>
            <h4 className="text-emerald-200 text-xs uppercase tracking-wider mb-4 font-semibold">
              Nhận Tin Mới
            </h4>
            <form onSubmit={handleSubmit} className="mb-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email của bạn"
                  className="w-full bg-transparent border-b border-emerald-600 pb-2 text-white placeholder-emerald-300 focus:outline-none focus:border-emerald-400 text-sm"
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-0 bottom-2 w-6 h-6 flex items-center justify-center hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </form>
            <p className="text-emerald-300 text-xs">
              Đăng ký để nhận bài viết mới nhất{' '}
              <Link to="/privacy" className="underline hover:text-white cursor-pointer">
                Chính sách
              </Link>
            </p>
          </div>

          <div>
            <h4 className="text-emerald-200 text-xs uppercase tracking-wider mb-4 font-semibold">
              Liên Kết
            </h4>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-emerald-100 hover:text-white transition-colors text-sm cursor-pointer">
                  Chính Sách Bảo Mật
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-emerald-100 hover:text-white transition-colors text-sm cursor-pointer">
                  Điều Khoản Sử Dụng
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-emerald-100 hover:text-white transition-colors text-sm cursor-pointer">
                  Hỗ Trợ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-emerald-200 text-xs uppercase tracking-wider mb-4 font-semibold">
              Kết Nối
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white transition-colors text-sm cursor-pointer">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white transition-colors text-sm cursor-pointer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-emerald-100 hover:text-white transition-colors text-sm cursor-pointer">
                  Twitter
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-emerald-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-emerald-200 text-sm">
              © 2025 EcoVoice. Bảo vệ môi trường là trách nhiệm của chúng ta.
            </p>
            <a 
              href="https://readdy.ai/?origin=logo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-300 hover:text-white text-sm transition-colors cursor-pointer"
            >
              Powered by Readdy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}