import { Link } from 'react-router-dom';

export default function Categories() {
  const categories = [
    {
      title: 'Biến Đổi Khí Hậu',
      description: 'Hiểu rõ nguyên nhân, tác động và giải pháp cho cuộc khủng hoảng khí hậu toàn cầu',
      image: 'https://readdy.ai/api/search-image?query=climate%20change%20melting%20glacier%20with%20blue%20ice%20global%20warming%20impact%20environmental%20crisis%20arctic%20landscape%20dramatic%20sky%20simple%20clean%20background%20documentary%20style&width=600&height=400&seq=cat-001&orientation=landscape',
      icon: 'ri-temp-hot-line',
      color: 'bg-red-50'
    },
    {
      title: 'Năng Lượng Tái Tạo',
      description: 'Khám phá các nguồn năng lượng sạch và bền vững cho tương lai',
      image: 'https://readdy.ai/api/search-image?query=solar%20panels%20array%20in%20sunny%20field%20renewable%20energy%20installation%20sustainable%20power%20technology%20clean%20energy%20solution%20blue%20sky%20simple%20clean%20background&width=400&height=400&seq=cat-002&orientation=squarish',
      icon: 'ri-sun-line',
      color: 'bg-yellow-50'
    },
    {
      title: 'Bảo Tồn Thiên Nhiên',
      description: 'Bảo vệ đa dạng sinh học và các hệ sinh thái quý giá',
      image: 'https://readdy.ai/api/search-image?query=wildlife%20conservation%20endangered%20species%20in%20natural%20habitat%20biodiversity%20protection%20lush%20green%20environment%20animals%20in%20nature%20simple%20clean%20background&width=400&height=400&seq=cat-003&orientation=squarish',
      icon: 'ri-plant-line',
      color: 'bg-green-50'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Khám Phá<br />Các Chủ Đề
          </h2>
          <p className="text-gray-600 text-lg md:self-start">
            Tìm hiểu sâu về các vấn đề môi trường quan trọng và cách chúng ta có thể tạo ra sự thay đổi tích cực
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Link 
            to="/category/climate-change" 
            className={`${categories[0].color} rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer group`}
          >
            <div 
              className="w-full h-48 rounded-2xl bg-cover bg-center mb-6"
              style={{ backgroundImage: `url('${categories[0].image}')` }}
            ></div>
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <i className={`${categories[0].icon} text-3xl text-red-600`}></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
              {categories[0].title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {categories[0].description}
            </p>
          </Link>

          <Link 
            to="/category/renewable-energy" 
            className={`${categories[1].color} rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer group`}
          >
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <i className={`${categories[1].icon} text-3xl text-yellow-600`}></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-yellow-600 transition-colors">
              {categories[1].title}
            </h3>
            <div 
              className="w-full h-48 rounded-2xl bg-cover bg-center mt-6"
              style={{ backgroundImage: `url('${categories[1].image}')` }}
            ></div>
          </Link>

          <Link 
            to="/category/conservation" 
            className={`${categories[2].color} rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer group`}
          >
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <i className={`${categories[2].icon} text-3xl text-green-600`}></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 text-center group-hover:text-green-600 transition-colors">
              {categories[2].title}
            </h3>
            <div 
              className="w-full h-48 rounded-2xl bg-cover bg-center mt-6"
              style={{ backgroundImage: `url('${categories[2].image}')` }}
            ></div>
          </Link>
        </div>
      </div>
    </section>
  );
}