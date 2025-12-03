
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function CategoriesPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = [
    {
      slug: 'climate-change',
      title: 'Biến Đổi Khí Hậu',
      description: 'Hiểu rõ nguyên nhân, tác động và giải pháp cho cuộc khủng hoảng khí hậu toàn cầu',
      image: 'https://readdy.ai/api/search-image?query=melting%20glacier%20arctic%20ice%20caps%20climate%20change%20global%20warming%20environmental%20crisis%20dramatic%20landscape%20with%20blue%20ice%20formations%20and%20clear%20sky%20showing%20environmental%20impact&width=600&height=400&seq=cat001&orientation=landscape',
      icon: 'ri-temp-hot-line',
      color: 'bg-red-50',
      iconColor: 'text-red-600'
    },
    {
      slug: 'renewable-energy',
      title: 'Năng Lượng Tái Tạo',
      description: 'Khám phá các nguồn năng lượng sạch và bền vững cho tương lai',
      image: 'https://readdy.ai/api/search-image?query=solar%20panel%20array%20field%20renewable%20energy%20installation%20with%20blue%20sky%20sustainable%20power%20technology%20clean%20energy%20solution%20modern%20photovoltaic%20system&width=600&height=400&seq=cat002&orientation=landscape',
      icon: 'ri-sun-line',
      color: 'bg-yellow-50',
      iconColor: 'text-yellow-600'
    },
    {
      slug: 'conservation',
      title: 'Bảo Tồn Thiên Nhiên',
      description: 'Bảo vệ đa dạng sinh học và các hệ sinh thái quý giá',
      image: 'https://readdy.ai/api/search-image?query=wildlife%20conservation%20natural%20habitat%20with%20diverse%20animals%20lush%20green%20forest%20biodiversity%20protection%20endangered%20species%20in%20pristine%20environment&width=600&height=400&seq=cat003&orientation=landscape',
      icon: 'ri-plant-line',
      color: 'bg-green-50',
      iconColor: 'text-green-600'
    },
    {
      slug: 'pollution',
      title: 'Ô Nhiễm Môi Trường',
      description: 'Giải quyết các vấn đề ô nhiễm không khí, nước và đất',
      image: 'https://readdy.ai/api/search-image?query=environmental%20pollution%20industrial%20smoke%20stacks%20air%20pollution%20contaminated%20water%20environmental%20damage%20showing%20impact%20of%20pollution%20on%20nature&width=600&height=400&seq=cat004&orientation=landscape',
      icon: 'ri-flask-line',
      color: 'bg-gray-50',
      iconColor: 'text-gray-600'
    },
    {
      slug: 'sustainable-living',
      title: 'Sống Bền Vững',
      description: 'Thực hành lối sống thân thiện với môi trường trong cuộc sống hàng ngày',
      image: 'https://readdy.ai/api/search-image?query=sustainable%20living%20eco%20friendly%20home%20with%20organic%20garden%20green%20lifestyle%20zero%20waste%20practices%20natural%20materials%20renewable%20resources%20modern%20sustainable%20house&width=600&height=400&seq=cat005&orientation=landscape',
      icon: 'ri-home-heart-line',
      color: 'bg-teal-50',
      iconColor: 'text-teal-600'
    },
    {
      slug: 'ocean-protection',
      title: 'Bảo Vệ Đại Dương',
      description: 'Bảo vệ hệ sinh thái biển và chống rác thải nhựa',
      image: 'https://readdy.ai/api/search-image?query=ocean%20protection%20coral%20reef%20underwater%20marine%20life%20sea%20conservation%20colorful%20fish%20pristine%20blue%20water%20healthy%20ocean%20ecosystem%20biodiversity&width=600&height=400&seq=cat006&orientation=landscape',
      icon: 'ri-water-flash-line',
      color: 'bg-blue-50',
      iconColor: 'text-blue-600'
    },
    {
      slug: 'forest-protection',
      title: 'Bảo Vệ Rừng',
      description: 'Chống phá rừng và bảo vệ lá phổi xanh của hành tinh',
      image: 'https://readdy.ai/api/search-image?query=forest%20protection%20dense%20rainforest%20tall%20green%20trees%20tropical%20jungle%20lush%20vegetation%20biodiversity%20conservation%20pristine%20woodland%20natural%20habitat&width=600&height=400&seq=cat007&orientation=landscape',
      icon: 'ri-tree-line',
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600'
    },
    {
      slug: 'recycling',
      title: 'Tái Chế & Giảm Rác',
      description: 'Giảm thiểu rác thải và thúc đẩy kinh tế tuần hoàn',
      image: 'https://readdy.ai/api/search-image?query=recycling%20waste%20management%20circular%20economy%20reusable%20materials%20eco%20friendly%20packaging%20zero%20waste%20lifestyle%20sustainable%20consumption%20green%20practices&width=600&height=400&seq=cat008&orientation=landscape',
      icon: 'ri-recycle-line',
      color: 'bg-lime-50',
      iconColor: 'text-lime-600'
    }
  ];

  const getArticleCount = (slug: string) => {
    const articles = JSON.parse(localStorage.getItem('articles') || '[]');
    return articles.filter((article: any) => article.category === slug).length;
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar isScrolled={true} />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Khám Phá Các Chủ Đề
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tìm hiểu sâu về các vấn đề môi trường quan trọng và cách chúng ta có thể tạo ra sự thay đổi tích cực cho hành tinh
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => {
              const articleCount = getArticleCount(category.slug);
              
              return (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className={`${category.color} rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group block`}
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <img 
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  
                  <div className="p-8">
                    <div className="w-12 h-12 flex items-center justify-center mb-4">
                      <i className={`${category.icon} text-3xl ${category.iconColor}`}></i>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                      {category.title}
                    </h3>
                    
                    <p className="text-gray-600 leading-relaxed mb-4 text-base">
                      {category.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500 font-medium">
                        {articleCount} bài viết
                      </span>
                      <div className="w-8 h-8 flex items-center justify-center">
                        <i className={`ri-arrow-right-line text-xl ${category.iconColor} group-hover:translate-x-1 transition-transform`}></i>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
