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
      name: 'Nguyễn Minh Anh',
      role: 'Nhà Sáng Lập & Biên Tập Viên Trưởng',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20woman%20environmental%20activist%20wearing%20casual%20green%20clothing%20smiling%20confidently%20portrait%20photography%20natural%20lighting%20simple%20clean%20white%20background%20modern%20professional%20headshot%20warm%20friendly%20expression&width=400&height=400&seq=team-001&orientation=squarish',
      description: 'Chuyên gia về biến đổi khí hậu với hơn 10 năm kinh nghiệm trong lĩnh vực bảo vệ môi trường'
    },
    {
      name: 'Trần Hoàng Nam',
      role: 'Chuyên Gia Năng Lượng Tái Tạo',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20man%20renewable%20energy%20expert%20wearing%20casual%20shirt%20smiling%20warmly%20portrait%20photography%20natural%20lighting%20simple%20clean%20white%20background%20modern%20professional%20headshot%20confident%20expression&width=400&height=400&seq=team-002&orientation=squarish',
      description: 'Kỹ sư năng lượng với nhiều dự án thành công về năng lượng sạch và bền vững'
    },
    {
      name: 'Lê Thu Hà',
      role: 'Chuyên Gia Bảo Tồn Thiên Nhiên',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20woman%20nature%20conservationist%20wearing%20outdoor%20clothing%20smiling%20gently%20portrait%20photography%20natural%20lighting%20simple%20clean%20white%20background%20modern%20professional%20headshot%20peaceful%20expression&width=400&height=400&seq=team-003&orientation=squarish',
      description: 'Nhà sinh học với đam mê bảo vệ đa dạng sinh học và các hệ sinh thái tự nhiên'
    },
    {
      name: 'Phạm Đức Thắng',
      role: 'Chuyên Gia Kinh Tế Xanh',
      image: 'https://readdy.ai/api/search-image?query=professional%20asian%20man%20green%20economy%20expert%20wearing%20business%20casual%20attire%20smiling%20professionally%20portrait%20photography%20natural%20lighting%20simple%20clean%20white%20background%20modern%20professional%20headshot%20intelligent%20expression&width=400&height=400&seq=team-004&orientation=squarish',
      description: 'Chuyên gia tư vấn về phát triển bền vững và kinh tế tuần hoàn cho doanh nghiệp'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'Khởi Đầu Hành Trình',
      description: 'EcoVoice được thành lập với sứ mệnh nâng cao nhận thức về bảo vệ môi trường tại Việt Nam'
    },
    {
      year: '2021',
      title: 'Mở Rộng Cộng Đồng',
      description: 'Đạt 50,000 thành viên tích cực và tổ chức 20+ sự kiện bảo vệ môi trường'
    },
    {
      year: '2022',
      title: 'Hợp Tác Chiến Lược',
      description: 'Hợp tác với các tổ chức môi trường quốc tế và triển khai nhiều dự án xanh'
    },
    {
      year: '2023',
      title: 'Tác Động Lan Tỏa',
      description: 'Hơn 200,000 người tham gia và góp phần giảm 5,000 tấn CO2 mỗi năm'
    },
    {
      year: '2024',
      title: 'Tương Lai Xanh',
      description: 'Tiếp tục mở rộng và xây dựng cộng đồng bền vững cho thế hệ tương lai'
    }
  ];

  const values = [
    {
      icon: 'ri-leaf-line',
      title: 'Bền Vững',
      description: 'Cam kết hành động vì một tương lai xanh và bền vững cho mọi thế hệ'
    },
    {
      icon: 'ri-team-line',
      title: 'Cộng Đồng',
      description: 'Xây dựng cộng đồng gắn kết, cùng nhau hành động vì môi trường'
    },
    {
      icon: 'ri-lightbulb-line',
      title: 'Sáng Tạo',
      description: 'Tìm kiếm giải pháp sáng tạo và hiệu quả cho các vấn đề môi trường'
    },
    {
      icon: 'ri-heart-line',
      title: 'Trách Nhiệm',
      description: 'Hành động với trách nhiệm và tận tâm vì hành tinh của chúng ta'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={isScrolled} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=beautiful%20green%20earth%20planet%20from%20space%20with%20lush%20forests%20and%20blue%20oceans%20environmental%20protection%20concept%20hope%20for%20future%20simple%20clean%20background%20peaceful%20atmosphere%20inspiring%20view&width=1920&height=800&seq=about-hero-001&orientation=landscape')`
          }}
        ></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Về EcoVoice
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Chúng tôi là cộng đồng những người yêu thiên nhiên, tin tưởng vào sức mạnh của hành động tập thể và cam kết xây dựng một tương lai xanh bền vững cho hành tinh của chúng ta
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
                EcoVoice ra đời với sứ mệnh nâng cao nhận thức cộng đồng về bảo vệ môi trường thông qua việc chia sẻ kiến thức, truyền cảm hứng hành động và kết nối những người có cùng chung tầm nhìn về một hành tinh xanh.
              </p>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Chúng tôi tin rằng mỗi hành động nhỏ đều có ý nghĩa lớn. Từ việc giảm thiểu rác thải nhựa, tiết kiệm năng lượng, đến việc trồng cây và bảo vệ đa dạng sinh học - tất cả đều góp phần tạo nên sự thay đổi tích cực cho môi trường.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white font-semibold rounded-full hover:bg-emerald-700 transition-all cursor-pointer whitespace-nowrap"
              >
                Liên Hệ Với Chúng Tôi
                <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
            <div 
              className="w-full h-96 rounded-2xl shadow-2xl bg-cover bg-center"
              style={{
                backgroundImage: `url('https://readdy.ai/api/search-image?query=diverse%20group%20of%20people%20planting%20trees%20together%20community%20environmental%20action%20volunteers%20working%20in%20garden%20teamwork%20for%20nature%20conservation%20simple%20clean%20background%20natural%20lighting%20hopeful%20atmosphere&width=600&height=600&seq=about-mission-001&orientation=squarish')`
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
              Những giá trị định hướng mọi hành động của chúng tôi vì một tương lai xanh
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
              Hành Trình Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600">
              Những cột mốc quan trọng trong sứ mệnh bảo vệ môi trường
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
              Đội Ngũ Của Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những chuyên gia tận tâm với sứ mệnh bảo vệ môi trường và xây dựng tương lai bền vững
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
            Cùng Nhau Tạo Nên Sự Khác Biệt
          </h2>
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            Tham gia cộng đồng EcoVoice để cùng nhau hành động vì một hành tinh xanh hơn. Mỗi bước đi nhỏ của bạn đều có ý nghĩa lớn!
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link 
              to="/categories" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-emerald-600 font-semibold rounded-full hover:bg-gray-100 transition-all cursor-pointer whitespace-nowrap"
            >
              Khám Phá Bài Viết
              <i className="ri-article-line"></i>
            </Link>
            <Link 
              to="/write" 
              className="inline-flex items-center gap-2 px-8 py-4 bg-orange-400 text-gray-900 font-semibold rounded-full hover:bg-orange-500 transition-all cursor-pointer whitespace-nowrap"
            >
              Chia Sẻ Câu Chuyện
              <i className="ri-edit-line"></i>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}