import { useState } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';
import { Link } from 'react-router-dom';

export default function About() {
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  const teamMembers = [
    {
      name: 'Nguyễn Văn Minh',
      role: 'Giám Đốc Kỹ Thuật',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20environmental%20engineer%20wearing%20safety%20vest%20and%20helmet%20confident%20smile%20industrial%20wastewater%20treatment%20plant%20background%20modern%20facility%20expert%20leader&width=400&height=400&seq=team-001&orientation=squarish',
      description: 'Kỹ sư môi trường cao cấp với hơn 15 năm kinh nghiệm trong lĩnh vực xử lý chất thải công nghiệp'
    },
    {
      name: 'Trần Thị Hương',
      role: 'Chuyên Gia Xử Lý Nước Thải',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20water%20treatment%20specialist%20wearing%20lab%20coat%20and%20safety%20glasses%20confident%20expression%20modern%20laboratory%20background%20environmental%20engineer&width=400&height=400&seq=team-002&orientation=squarish',
      description: 'Chuyên gia hàng đầu về công nghệ xử lý nước thải sinh hoạt và công nghiệp, đạt chuẩn QCVN'
    },
    {
      name: 'Lê Hoàng Nam',
      role: 'Chuyên Gia Tái Chế',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20male%20recycling%20expert%20wearing%20casual%20work%20attire%20confident%20smile%20modern%20recycling%20facility%20background%20waste%20management%20specialist&width=400&height=400&seq=team-003&orientation=squarish',
      description: 'Chuyên gia về công nghệ tái chế chất thải rắn và xây dựng mô hình kinh tế tuần hoàn'
    },
    {
      name: 'Phạm Thu Lan',
      role: 'Chuyên Gia Cấp Phép Môi Trường',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20female%20environmental%20consultant%20wearing%20business%20attire%20confident%20expression%20modern%20office%20background%20legal%20compliance%20expert&width=400&height=400&seq=team-004&orientation=squarish',
      description: 'Chuyên gia tư vấn pháp lý môi trường, hỗ trợ doanh nghiệp đạt chuẩn và cấp phép'
    }
  ];

  const milestones = [
    {
      year: '2009',
      title: 'Thành Lập Công Ty',
      description: 'WasteManage được thành lập với sứ mệnh cung cấp giải pháp xử lý chất thải chuyên nghiệp cho doanh nghiệp Việt Nam'
    },
    {
      year: '2012',
      title: 'Mở Rộng Dịch Vụ',
      description: 'Triển khai thành công 50+ dự án xử lý nước thải và chất thải rắn cho các khu công nghiệp'
    },
    {
      year: '2016',
      title: 'Công Nghệ Tiên Tiến',
      description: 'Hợp tác với đối tác Nhật Bản, ứng dụng công nghệ xử lý chất thải hiện đại nhất'
    },
    {
      year: '2020',
      title: 'Chứng Nhận Quốc Tế',
      description: 'Đạt chứng nhận ISO 14001 về hệ thống quản lý môi trường và ISO 9001 về chất lượng'
    },
    {
      year: '2024',
      title: 'Dẫn Đầu Ngành',
      description: 'Hơn 500 dự án thành công, phục vụ các tập đoàn lớn và khu công nghiệp trên toàn quốc'
    }
  ];

  const values = [
    {
      icon: 'ri-shield-check-line',
      title: 'Chuyên Nghiệp',
      description: 'Đội ngũ kỹ sư giàu kinh nghiệm, quy trình làm việc chuẩn quốc tế'
    },
    {
      icon: 'ri-leaf-line',
      title: 'Bền Vững',
      description: 'Cam kết bảo vệ môi trường, phát triển bền vững cho cộng đồng'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Công Nghệ',
      description: 'Ứng dụng công nghệ tiên tiến, hiệu quả cao, tiết kiệm chi phí'
    },
    {
      icon: 'ri-customer-service-line',
      title: 'Tận Tâm',
      description: 'Hỗ trợ khách hàng 24/7, bảo hành dài hạn, bảo trì định kỳ'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20industrial%20wastewater%20treatment%20facility%20with%20advanced%20filtration%20systems%20clean%20professional%20environment%20blue%20water%20treatment%20tanks%20environmental%20technology%20aerial%20view%20bright%20daylight%20professional%20photography&width=1920&height=800&seq=about-hero-bg-001&orientation=landscape')`
          }}
        ></div>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Về WasteManage
          </h1>
          <p className="text-xl text-white/95 leading-relaxed">
            Chúng tôi là đơn vị tiên phong trong lĩnh vực xử lý chất thải tại Việt Nam, 
            cung cấp giải pháp toàn diện từ tư vấn, thiết kế, thi công đến vận hành 
            hệ thống xử lý môi trường cho mọi quy mô doanh nghiệp
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Sứ Mệnh Của Chúng Tôi
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                WasteManage ra đời với sứ mệnh mang đến giải pháp xử lý chất thải chuyên nghiệp, 
                hiệu quả và bền vững cho các doanh nghiệp Việt Nam. Chúng tôi cam kết giúp khách hàng 
                tuân thủ đầy đủ các quy định về môi trường, đồng thời tối ưu hóa chi phí vận hành.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Với đội ngũ kỹ sư môi trường giàu kinh nghiệm và công nghệ tiên tiến từ Nhật Bản, 
                Châu Âu, chúng tôi tự hào là đối tác tin cậy của hơn 500 doanh nghiệp trong việc 
                xây dựng hệ thống xử lý chất thải đạt chuẩn quốc tế.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all cursor-pointer whitespace-nowrap"
              >
                Liên Hệ Tư Vấn Miễn Phí
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div 
              className="w-full h-96 rounded-2xl shadow-2xl bg-cover bg-center"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=modern%20sustainable%20waste%20recycling%20facility%20with%20green%20technology%20solar%20panels%20eco-friendly%20industrial%20building%20clean%20environment%20blue%20sky%20professional%20architecture%20environmental%20innovation&width=600&height=600&seq=about-mission-002&orientation=squarish')`
              }}
            ></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Giá Trị Cốt Lõi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những giá trị định hướng mọi hoạt động của chúng tôi trong việc phục vụ khách hàng
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div 
                key={index}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-white to-emerald-50 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 bg-emerald-600 text-white rounded-full">
                  <i className={`${value.icon} text-3xl`}></i>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hành Trình Phát Triển
            </h2>
            <p className="text-lg text-gray-600">
              Những cột mốc quan trọng trong 15 năm phát triển của WasteManage
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-emerald-300"></div>
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto md:text-left'} md:w-1/2`}
              >
                <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 flex items-center justify-center bg-emerald-600 text-white font-bold rounded-full shadow-lg">
                    {milestone.year}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {milestone.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {milestone.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Đội Ngũ Chuyên Gia
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những kỹ sư môi trường hàng đầu với kinh nghiệm thực tế tại các dự án lớn
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div 
                key={index}
                className="text-center group"
              >
                <div 
                  className="w-full h-64 rounded-2xl mb-4 bg-cover bg-center shadow-lg group-hover:shadow-xl transition-all"
                  style={{ backgroundImage: `url('${member.image}')` }}
                ></div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-emerald-600 font-semibold mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sẵn Sàng Hợp Tác Cùng Chúng Tôi?
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Liên hệ ngay để nhận tư vấn miễn phí về giải pháp xử lý chất thải phù hợp nhất cho doanh nghiệp của bạn
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/contact" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap"
            >
              Liên Hệ Ngay
              <i className="ri-phone-line"></i>
            </Link>
            <Link 
              to="/categories" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-gray-900 font-semibold rounded-full hover:bg-orange-500 transition-all cursor-pointer whitespace-nowrap"
            >
              Xem Dịch Vụ
              <i className="ri-folder-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}