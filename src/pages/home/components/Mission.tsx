export default function Mission() {
  const services = [
    {
      icon: 'ri-delete-bin-line',
      title: 'Xử Lý Chất Thải Rắn',
      description: 'Hệ thống thu gom, phân loại và xử lý chất thải rắn sinh hoạt, công nghiệp theo tiêu chuẩn quốc tế',
      color: 'from-emerald-500 to-teal-600'
    },
    {
      icon: 'ri-drop-line',
      title: 'Xử Lý Nước Thải',
      description: 'Công nghệ xử lý nước thải sinh hoạt, công nghiệp đạt chuẩn QCVN, tái sử dụng nước hiệu quả',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      icon: 'ri-mist-line',
      title: 'Xử Lý Khí Thải',
      description: 'Giải pháp kiểm soát và xử lý khí thải công nghiệp, giảm thiểu ô nhiễm không khí',
      color: 'from-gray-500 to-slate-600'
    },
    {
      icon: 'ri-recycle-line',
      title: 'Tái Chế & Tái Sử Dụng',
      description: 'Công nghệ tái chế chất thải thành nguyên liệu, sản phẩm mới, xây dựng kinh tế tuần hoàn',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: 'ri-file-list-3-line',
      title: 'Cấp Phép Môi Trường',
      description: 'Tư vấn hồ sơ, thủ tục cấp phép môi trường, đánh giá tác động môi trường (ĐTM)',
      color: 'from-orange-500 to-amber-600'
    },
    {
      icon: 'ri-line-chart-line',
      title: 'Giám Sát & Báo Cáo',
      description: 'Hệ thống giám sát môi trường tự động, báo cáo định kỳ theo quy định pháp luật',
      color: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Dịch Vụ Của Chúng Tôi
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Giải Pháp Xử Lý Chất Thải<br />
            <span className="text-emerald-600">Toàn Diện & Chuyên Nghiệp</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp đầy đủ các dịch vụ từ tư vấn, thiết kế, thi công đến vận hành 
            hệ thống xử lý chất thải cho mọi quy mô doanh nghiệp
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200"
            >
              <div className={`w-16 h-16 flex items-center justify-center bg-gradient-to-br ${service.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`${service.icon} text-3xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl p-12 text-white">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-6">Tại Sao Chọn Chúng Tôi?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Công Nghệ Tiên Tiến</h4>
                    <p className="text-emerald-100">Áp dụng công nghệ xử lý chất thải hiện đại nhất từ Nhật Bản, Châu Âu</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Đội Ngũ Chuyên Gia</h4>
                    <p className="text-emerald-100">Kỹ sư môi trường giàu kinh nghiệm, được đào tạo bài bản</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Tuân Thủ Pháp Luật</h4>
                    <p className="text-emerald-100">Đảm bảo 100% các quy định về môi trường hiện hành</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-lg flex-shrink-0 mt-1">
                    <i className="ri-check-line text-xl"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Hỗ Trợ Lâu Dài</h4>
                    <p className="text-emerald-100">Bảo hành, bảo trì và hỗ trợ kỹ thuật 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">15+</div>
                <div className="text-emerald-100">Năm Kinh Nghiệm</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">500+</div>
                <div className="text-emerald-100">Dự Án</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">98%</div>
                <div className="text-emerald-100">Hài Lòng</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-emerald-100">Hỗ Trợ</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}