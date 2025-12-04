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
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-6 cursor-pointer">
              <div className="w-10 h-10 flex items-center justify-center bg-emerald-600 rounded-lg">
                <i className="ri-recycle-line text-2xl text-white"></i>
              </div>
              <span className="text-2xl font-bold text-white">Ecovoice</span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Giải pháp xử lý chất thải chuyên nghiệp, công nghệ tiên tiến, 
              cam kết bảo vệ môi trường và phát triển bền vững.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                <i className="ri-youtube-fill text-xl"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-emerald-600 rounded-lg transition-colors cursor-pointer">
                <i className="ri-mail-fill text-xl"></i>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-6">Dịch Vụ</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/category/xu-ly-chat-thai-ran" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Xử Lý Chất Thải Rắn
                </Link>
              </li>
              <li>
                <Link to="/category/xu-ly-nuoc-thai" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Xử Lý Nước Thải
                </Link>
              </li>
              <li>
                <Link to="/category/xu-ly-khi-thai" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Xử Lý Khí Thải
                </Link>
              </li>
              <li>
                <Link to="/category/tai-che-tai-su-dung" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Tái Chế & Tái Sử Dụng
                </Link>
              </li>
              <li>
                <Link to="/category/cap-phep-moi-truong" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Cấp Phép Môi Trường
                </Link>
              </li>
              <li>
                <Link to="/category/giam-sat-moi-truong" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Giám Sát Môi Trường
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Liên Kết</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Về Chúng Tôi
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Lĩnh Vực Hoạt Động
                </Link>
              </li>
              <li>
                <Link to="/write" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Kiến Thức & Tin Tức
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Liên Hệ
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  Đăng Nhập
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-6">Liên Hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 flex items-center justify-center flex-shrink-0 mt-1">
                  <i className="ri-map-pin-line text-emerald-400"></i>
                </div>
                <span className="text-gray-400">
                  Tầng 10, Tòa nhà ABC<br />
                  123 Đường XYZ, Quận 1, TP.HCM
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-phone-line text-emerald-400"></i>
                </div>
                <a href="tel:1900xxxx" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  1900 xxxx
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-mail-line text-emerald-400"></i>
                </div>
                <a href="mailto:info@wastemanagement.vn" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  info@wastemanagement.vn
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-time-line text-emerald-400"></i>
                </div>
                <span className="text-gray-400">
                  24/7 Hỗ Trợ Khẩn Cấp
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 WasteManage. Bản quyền thuộc về Công ty Xử Lý Chất Thải & Môi Trường.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                Chính Sách Bảo Mật
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                Điều Khoản Sử Dụng
              </a>
              <a href="https://readdy.ai/?origin=logo" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                Powered by Readdy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
