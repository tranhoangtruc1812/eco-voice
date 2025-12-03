import { useState } from 'react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      content: 'EcoVoice đã thay đổi cách tôi nhìn nhận về môi trường. Những bài viết chất lượng và cộng đồng nhiệt huyết đã truyền cảm hứng cho tôi bắt đầu hành trình sống xanh. Giờ đây, gia đình tôi đã giảm được 70% rác thải nhựa và chuyển sang sử dụng năng lượng mặt trời.',
      name: 'Nguyễn Thị Lan',
      role: 'Nhà Hoạt Động Môi Trường',
      image: 'https://readdy.ai/api/search-image?query=asian%20woman%20environmental%20activist%20portrait%20smiling%20confident%20professional%20photo%20natural%20outdoor%20setting%20green%20background%20warm%20lighting%20simple%20clean%20background&width=400&height=600&seq=test-001&orientation=portrait'
    },
    {
      content: 'Là một giáo viên, tôi thường xuyên sử dụng nội dung từ EcoVoice để giảng dạy cho học sinh về bảo vệ môi trường. Các bài viết được nghiên cứu kỹ lưỡng, dễ hiểu và rất phù hợp để truyền tải kiến thức cho thế hệ trẻ về tầm quan trọng của việc bảo vệ hành tinh.',
      name: 'Trần Văn Minh',
      role: 'Giáo Viên Khoa Học',
      image: 'https://readdy.ai/api/search-image?query=asian%20male%20teacher%20portrait%20friendly%20smile%20professional%20educator%20outdoor%20natural%20setting%20green%20environment%20warm%20daylight%20simple%20clean%20background&width=400&height=600&seq=test-002&orientation=portrait'
    },
    {
      content: 'Cộng đồng EcoVoice thật tuyệt vời! Tôi đã tìm thấy những người cùng chung đam mê và học hỏi được rất nhiều kinh nghiệm thực tế. Từ việc trồng rau hữu cơ đến tái chế sáng tạo, mọi thứ đều được chia sẻ một cách nhiệt tình và hữu ích.',
      name: 'Phạm Thu Hà',
      role: 'Blogger Lối Sống Xanh',
      image: 'https://readdy.ai/api/search-image?query=asian%20woman%20blogger%20portrait%20cheerful%20smile%20casual%20style%20outdoor%20natural%20environment%20green%20plants%20background%20soft%20natural%20light%20simple%20clean%20background&width=400&height=600&seq=test-003&orientation=portrait'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative bg-gray-900 rounded-[3rem] overflow-hidden">
          <div className="absolute top-8 left-8 w-32 h-32 opacity-10">
            <svg viewBox="0 0 100 100" className="text-amber-100">
              <path d="M20,80 Q10,40 30,20 T60,30" stroke="currentColor" strokeWidth="2" fill="none"/>
            </svg>
          </div>

          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-full min-h-[500px]">
              <div 
                className="absolute inset-0 bg-cover bg-center rounded-l-[3rem]"
                style={{ 
                  backgroundImage: `url('${testimonials[currentIndex].image}')`,
                  clipPath: 'inset(0 0 0 0 round 3rem 0 0 3rem)'
                }}
              ></div>
            </div>

            <div className="p-12 md:p-16 flex flex-col justify-center">
              <div className="w-16 h-16 flex items-center justify-center mb-8">
                <i className="ri-double-quotes-l text-5xl text-amber-100"></i>
              </div>

              <p className="text-white text-xl md:text-2xl leading-relaxed mb-8 font-light">
                {testimonials[currentIndex].content}
              </p>

              <div className="mb-8">
                <h4 className="text-white text-lg font-bold mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-400 text-sm">
                  {testimonials[currentIndex].role}
                </p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={prevTestimonial}
                  className="px-6 py-3 bg-pink-300 text-gray-900 rounded-full font-medium hover:bg-pink-400 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-arrow-left-line"></i>
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="px-6 py-3 bg-pink-300 text-gray-900 rounded-full font-medium hover:bg-pink-400 transition-colors whitespace-nowrap cursor-pointer"
                >
                  <i className="ri-arrow-right-line"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}