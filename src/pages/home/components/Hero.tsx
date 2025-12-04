import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20industrial%20wastewater%20treatment%20plant%20with%20advanced%20filtration%20systems%20clean%20professional%20facility%20blue%20water%20treatment%20tanks%20environmental%20technology%20aerial%20view%20bright%20daylight%20professional%20photography&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`
        }}
      ></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Giải Pháp Xử Lý Chất Thải<br />
            <span className="text-emerald-400">Chuyên Nghiệp & Bền Vững</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto">
            Cung cấp dịch vụ xử lý chất thải rắn, nước thải, khí thải toàn diện 
            với công nghệ tiên tiến, đạt chuẩn QCVN, phục vụ hơn 500 doanh nghiệp
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
            >
              <i className="ri-phone-line"></i>
              Tư Vấn Miễn Phí
            </Link>
            <Link 
              to="/categories" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white text-lg font-semibold rounded-full hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
            >
              <i className="ri-folder-line"></i>
              Xem Dịch Vụ
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">15+</div>
              <div className="text-emerald-200 text-sm">Năm Kinh Nghiệm</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">500+</div>
              <div className="text-emerald-200 text-sm">Dự Án Thành Công</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">98%</div>
              <div className="text-emerald-200 text-sm">Khách Hàng Hài Lòng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">24/7</div>
              <div className="text-emerald-200 text-sm">Hỗ Trợ Kỹ Thuật</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}