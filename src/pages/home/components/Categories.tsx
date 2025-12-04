import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    {
      name: 'Xử Lý Chất Thải Rắn',
      slug: 'xu-ly-chat-thai-ran',
      description: 'Thu gom, phân loại và xử lý chất thải rắn sinh hoạt, công nghiệp theo tiêu chuẩn',
      icon: 'ri-delete-bin-line',
      color: 'from-emerald-500 to-teal-600',
      image: 'https://readdy.ai/api/search-image?query=modern%20solid%20waste%20sorting%20facility%20with%20conveyor%20belts%20automated%20recycling%20system%20industrial%20waste%20management%20clean%20organized%20environment%20professional%20equipment&width=600&height=400&seq=cat-001&orientation=landscape'
    },
    {
      name: 'Xử Lý Nước Thải',
      slug: 'xu-ly-nuoc-thai',
      description: 'Hệ thống xử lý nước thải sinh hoạt, công nghiệp đạt chuẩn QCVN, tái sử dụng',
      icon: 'ri-drop-line',
      color: 'from-blue-500 to-cyan-600',
      image: 'https://readdy.ai/api/search-image?query=industrial%20wastewater%20treatment%20plant%20with%20large%20blue%20water%20tanks%20filtration%20systems%20modern%20environmental%20facility%20clean%20water%20processing%20professional%20setting&width=600&height=400&seq=cat-002&orientation=landscape'
    },
    {
      name: 'Xử Lý Khí Thải',
      slug: 'xu-ly-khi-thai',
      description: 'Giải pháp kiểm soát và xử lý khí thải công nghiệp, giảm ô nhiễm không khí',
      icon: 'ri-mist-line',
      color: 'from-gray-500 to-slate-600',
      image: 'https://readdy.ai/api/search-image?query=industrial%20air%20pollution%20control%20system%20with%20filtration%20towers%20emission%20treatment%20equipment%20modern%20factory%20environmental%20technology%20clean%20sky%20background&width=600&height=400&seq=cat-003&orientation=landscape'
    },
    {
      name: 'Tái Chế & Tái Sử Dụng',
      slug: 'tai-che-tai-su-dung',
      description: 'Công nghệ tái chế chất thải thành nguyên liệu, xây dựng kinh tế tuần hoàn',
      icon: 'ri-recycle-line',
      color: 'from-green-500 to-emerald-600',
      image: 'https://readdy.ai/api/search-image?query=recycling%20facility%20with%20sorted%20materials%20plastic%20metal%20paper%20waste%20circular%20economy%20concept%20modern%20green%20technology%20sustainable%20processing%20plant&width=600&height=400&seq=cat-004&orientation=landscape'
    },
    {
      name: 'Cấp Phép Môi Trường',
      slug: 'cap-phep-moi-truong',
      description: 'Tư vấn hồ sơ, thủ tục cấp phép môi trường, đánh giá tác động môi trường',
      icon: 'ri-file-list-3-line',
      color: 'from-orange-500 to-amber-600',
      image: 'https://readdy.ai/api/search-image?query=environmental%20consultant%20reviewing%20documents%20and%20permits%20professional%20office%20setting%20legal%20compliance%20paperwork%20modern%20workspace%20business%20meeting&width=600&height=400&seq=cat-005&orientation=landscape'
    },
    {
      name: 'Giám Sát & Báo Cáo',
      slug: 'giam-sat-moi-truong',
      description: 'Hệ thống giám sát môi trường tự động, báo cáo định kỳ theo quy định',
      icon: 'ri-line-chart-line',
      color: 'from-purple-500 to-indigo-600',
      image: 'https://readdy.ai/api/search-image?query=environmental%20monitoring%20control%20room%20with%20digital%20displays%20data%20analytics%20screens%20modern%20technology%20automated%20system%20professional%20workspace&width=600&height=400&seq=cat-006&orientation=landscape'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-4">
            Lĩnh Vực Hoạt Động
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dịch Vụ Xử Lý Chất Thải<br />
            <span className="text-emerald-600">Toàn Diện & Chuyên Nghiệp</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cung cấp giải pháp xử lý môi trường từ tư vấn, thiết kế, thi công đến vận hành 
            cho mọi quy mô doanh nghiệp
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.slug}`}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-emerald-200">
                <div 
                  className="w-full h-48 bg-cover bg-center relative"
                  style={{ backgroundImage: `url('${category.image}')` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className={`absolute bottom-4 left-4 w-14 h-14 flex items-center justify-center bg-gradient-to-br ${category.color} rounded-xl shadow-lg`}>
                    <i className={`${category.icon} text-3xl text-white`}></i>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-medium group-hover:gap-3 transition-all">
                    <span>Tìm hiểu thêm</span>
                    <i className="ri-arrow-right-line"></i>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white text-lg font-semibold rounded-full hover:bg-emerald-700 transition-all shadow-lg hover:shadow-xl cursor-pointer whitespace-nowrap"
          >
            Xem Tất Cả Dịch Vụ
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
