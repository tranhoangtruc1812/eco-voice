import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=hands%20holding%20earth%20globe%20with%20green%20plants%20growing%20environmental%20protection%20concept%20hope%20for%20future%20sustainable%20planet%20care%20warm%20golden%20sunlight%20simple%20clean%20background&width=1920&height=1080&seq=cta-bg-001&orientation=landscape')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/20"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-wide uppercase">
          HÀNH ĐỘNG NGAY HÔM NAY
        </h2>
        <p className="text-lg md:text-xl text-white mb-10 leading-relaxed max-w-2xl mx-auto">
          Tham gia cộng đồng hơn 50,000 người đang tạo ra sự thay đổi tích cực<br />
          cho môi trường mỗi ngày
        </p>
        <Link 
          to="/join" 
          className="inline-flex items-center gap-4 px-10 py-5 bg-black text-white font-bold rounded-full hover:bg-gray-900 transition-all cursor-pointer whitespace-nowrap group"
        >
          <div className="w-12 h-12 flex items-center justify-center bg-orange-400 rounded-full">
            <i className="ri-user-add-line text-white text-xl"></i>
          </div>
          <span className="uppercase tracking-wide">Tham Gia Ngay</span>
          <i className="ri-arrow-right-up-line text-2xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"></i>
        </Link>
      </div>
    </section>
  );
}