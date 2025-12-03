import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://readdy.ai/api/search-image?query=lush%20green%20forest%20with%20sunlight%20filtering%20through%20trees%20creating%20a%20peaceful%20natural%20environment%20with%20vibrant%20foliage%20and%20soft%20morning%20light%20nature%20photography%20style%20serene%20atmosphere%20clean%20simple%20background%20emphasizing%20environmental%20beauty&width=1920&height=1080&seq=hero-bg-001&orientation=landscape')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Cùng Nhau Bảo Vệ<br />Hành Tinh Xanh
        </h1>
        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
          Khám phá kiến thức, chia sẻ ý tưởng và hành động vì một tương lai bền vững cho thế hệ mai sau
        </p>
        <Link 
          to="/articles" 
          className="inline-flex items-center gap-3 px-8 py-4 bg-orange-400 text-gray-900 font-semibold rounded-full hover:bg-orange-500 transition-all cursor-pointer whitespace-nowrap"
        >
          Khám Phá Ngay
          <i className="ri-arrow-right-line text-xl"></i>
        </Link>

        <div className="mt-16 flex items-center justify-center gap-6">
          <div 
            className="w-64 h-80 rounded-2xl shadow-2xl transform rotate-[-8deg] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=renewable%20energy%20wind%20turbines%20in%20green%20field%20with%20blue%20sky%20sustainable%20power%20generation%20clean%20energy%20concept%20modern%20environmental%20technology%20simple%20clean%20background&width=400&height=500&seq=hero-card-001&orientation=portrait')`
            }}
          ></div>
          <div 
            className="w-64 h-96 rounded-2xl shadow-2xl z-10 bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=person%20planting%20tree%20seedling%20in%20soil%20hands%20holding%20young%20plant%20environmental%20conservation%20reforestation%20concept%20hope%20for%20future%20simple%20clean%20background%20natural%20lighting&width=400&height=600&seq=hero-card-002&orientation=portrait')`
            }}
          ></div>
          <div 
            className="w-64 h-80 rounded-2xl shadow-2xl transform rotate-[8deg] bg-cover bg-center"
            style={{
              backgroundImage: `url('https://readdy.ai/api/search-image?query=ocean%20waves%20with%20clean%20blue%20water%20marine%20conservation%20pristine%20sea%20environment%20underwater%20ecosystem%20protection%20natural%20beauty%20simple%20clean%20background%20peaceful%20atmosphere&width=400&height=500&seq=hero-card-003&orientation=portrait')`
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}