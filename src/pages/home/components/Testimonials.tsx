export default function Testimonials() {
  const testimonials = [
    {
      name: 'Nguyễn Văn Minh',
      position: 'Giám Đốc Nhà Máy',
      company: 'Công ty TNHH Sản Xuất ABC',
      content: 'Hệ thống xử lý nước thải do công ty triển khai hoạt động rất hiệu quả, giúp chúng tôi đạt chuẩn QCVN và tiết kiệm chi phí vận hành đáng kể. Đội ngũ kỹ thuật hỗ trợ rất nhiệt tình.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20factory%20manager%20in%20industrial%20setting%20wearing%20safety%20helmet%20confident%20smile%20modern%20manufacturing%20plant%20background&width=200&height=200&seq=test-1&orientation=squarish'
    },
    {
      name: 'Trần Thị Hương',
      position: 'Trưởng Phòng Môi Trường',
      company: 'Tập Đoàn Công Nghiệp XYZ',
      content: 'Dịch vụ tư vấn cấp phép môi trường rất chuyên nghiệp. Hồ sơ được chuẩn bị kỹ lưỡng, thủ tục nhanh chóng. Chúng tôi đã nhận được giấy phép đúng tiến độ cam kết.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20environmental%20manager%20in%20office%20wearing%20business%20attire%20confident%20expression%20modern%20workplace%20background&width=200&height=200&seq=test-2&orientation=squarish'
    },
    {
      name: 'Lê Hoàng Nam',
      position: 'Chủ Tịch HĐQT',
      company: 'Công ty CP Chế Biến Thực Phẩm DEF',
      content: 'Hệ thống xử lý khí thải được lắp đặt hoàn hảo, giảm 95% mùi hôi và đạt tiêu chuẩn khí thải. Nhân viên xung quanh khu vực sản xuất cảm thấy môi trường làm việc tốt hơn rất nhiều.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20business%20executive%20in%20suit%20confident%20leader%20modern%20office%20background%20successful%20entrepreneur&width=200&height=200&seq=test-3&orientation=squarish'
    },
    {
      name: 'Phạm Thị Lan',
      position: 'Giám Đốc Điều Hành',
      company: 'Khu Công Nghiệp GHI',
      content: 'Giải pháp quản lý chất thải rắn cho toàn khu công nghiệp rất hiệu quả. Hệ thống phân loại tự động giúp tăng tỷ lệ tái chế lên 80%. Đội ngũ vận hành chuyên nghiệp, đúng giờ.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20executive%20director%20in%20business%20suit%20confident%20smile%20modern%20industrial%20park%20background&width=200&height=200&seq=test-4&orientation=squarish'
    },
    {
      name: 'Đỗ Minh Tuấn',
      position: 'Kỹ Sư Trưởng',
      company: 'Công ty Hóa Chất JKL',
      content: 'Hệ thống giám sát môi trường tự động giúp chúng tôi theo dõi các thông số 24/7, báo cáo tự động gửi cơ quan quản lý đúng hạn. Công nghệ hiện đại, vận hành ổn định.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20chief%20engineer%20in%20industrial%20uniform%20wearing%20safety%20gear%20confident%20expression%20chemical%20plant%20background&width=200&height=200&seq=test-5&orientation=squarish'
    },
    {
      name: 'Vũ Thị Mai',
      position: 'Giám Đốc Nhà Máy',
      company: 'Công ty Dệt May MNO',
      content: 'Dự án xử lý nước thải nhuộm được triển khai đúng tiến độ, chất lượng tốt. Nước sau xử lý đạt chuẩn tái sử dụng, giúp tiết kiệm 40% chi phí nước sạch. Rất hài lòng với dịch vụ.',
      rating: 5,
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20textile%20factory%20manager%20in%20industrial%20setting%20confident%20smile%20modern%20manufacturing%20background&width=200&height=200&seq=test-6&orientation=squarish'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Khách Hàng Nói Gì
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Đánh Giá Từ Khách Hàng
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Hơn 500 doanh nghiệp đã tin tưởng và hài lòng với dịch vụ của chúng tôi
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <div key={i} className="w-5 h-5 flex items-center justify-center">
                    <i className="ri-star-fill text-yellow-400"></i>
                  </div>
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-emerald-600 font-medium">{testimonial.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
            <div className="text-gray-600">Khách Hàng</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">98%</div>
            <div className="text-gray-600">Hài Lòng</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">15+</div>
            <div className="text-gray-600">Năm Kinh Nghiệm</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
            <div className="text-gray-600">Hỗ Trợ</div>
          </div>
        </div>
      </div>
    </section>
  );
}
