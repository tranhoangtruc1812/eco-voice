import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="py-24 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-6">
              Liên Hệ Ngay Hôm Nay
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Sẵn Sàng Giải Quyết<br />
              Vấn Đề Môi Trường?
            </h2>
            <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
              Đội ngũ chuyên gia của chúng tôi sẵn sàng tư vấn miễn phí và đưa ra giải pháp 
              xử lý chất thải phù hợp nhất cho doanh nghiệp của bạn.
            </p>

            {/* Features */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0">
                  <i className="ri-check-line text-xl"></i>
                </div>
                <span className="text-emerald-50">Tư vấn miễn phí 24/7</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0">
                  <i className="ri-check-line text-xl"></i>
                </div>
                <span className="text-emerald-50">Khảo sát hiện trường trong 24h</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0">
                  <i className="ri-check-line text-xl"></i>
                </div>
                <span className="text-emerald-50">Báo giá chi tiết miễn phí</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0">
                  <i className="ri-check-line text-xl"></i>
                </div>
                <span className="text-emerald-50">Cam kết đúng tiến độ</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="px-8 py-4 bg-white text-emerald-600 rounded-full font-semibold text-lg hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
              >
                <i className="ri-phone-line"></i>
                Liên Hệ Ngay
              </Link>
              <Link
                to="/categories"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white rounded-full font-semibold text-lg hover:bg-white/20 transition-all cursor-pointer whitespace-nowrap inline-flex items-center gap-2"
              >
                <i className="ri-folder-line"></i>
                Xem Dịch Vụ
              </Link>
            </div>
          </div>

          {/* Right Content - Contact Info */}
          <div className="grid gap-6">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
                  <i className="ri-phone-line text-3xl text-white"></i>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-2">Hotline 24/7</h3>
                  <p className="text-2xl font-bold mb-1">1900 xxxx</p>
                  <p className="text-emerald-100 text-sm">Hỗ trợ khẩn cấp mọi lúc</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
                  <i className="ri-mail-line text-3xl text-white"></i>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-2">Email</h3>
                  <p className="text-xl font-semibold mb-1">info@wastemanagement.vn</p>
                  <p className="text-emerald-100 text-sm">Phản hồi trong 2 giờ</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 flex items-center justify-center bg-white/20 rounded-xl flex-shrink-0">
                  <i className="ri-map-pin-line text-3xl text-white"></i>
                </div>
                <div className="text-white">
                  <h3 className="font-bold text-lg mb-2">Văn Phòng</h3>
                  <p className="text-emerald-100">
                    Tầng 10, Tòa nhà ABC<br />
                    123 Đường XYZ, Quận 1, TP.HCM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
