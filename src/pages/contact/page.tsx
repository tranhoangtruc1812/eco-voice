import { useState, useEffect } from 'react';
import Navbar from '../home/components/Navbar';
import Footer from '../home/components/Footer';

export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (formData.message.length > 500) {
      alert('Tin nhắn không được vượt quá 500 ký tự');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const formBody = new URLSearchParams();
      formBody.append('name', formData.name);
      formBody.append('email', formData.email);
      formBody.append('subject', formData.subject);
      formBody.append('message', formData.message);

      const response = await fetch('https://readdy.ai/api/form/d4mrc8a32n60g3bh85c0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString()
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar isScrolled={isScrolled} />
      
      <div className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Liên Hệ Với Chúng Tôi
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Có câu hỏi hoặc muốn chia sẻ ý kiến? Chúng tôi luôn sẵn sàng lắng nghe và hỗ trợ bạn
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-2xl mb-6">
                  <i className="ri-mail-line text-3xl text-emerald-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Email</h3>
                <p className="text-gray-600 mb-4">Gửi email cho chúng tôi bất cứ lúc nào</p>
                <a href="mailto:contact@ecovoice.vn" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                  contact@ecovoice.vn
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-2xl mb-6">
                  <i className="ri-phone-line text-3xl text-emerald-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Điện Thoại</h3>
                <p className="text-gray-600 mb-4">Liên hệ trực tiếp qua điện thoại</p>
                <a href="tel:+84123456789" className="text-emerald-600 font-medium hover:text-emerald-700 transition-colors">
                  +84 123 456 789
                </a>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-2xl mb-6">
                  <i className="ri-map-pin-line text-3xl text-emerald-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Địa Chỉ</h3>
                <p className="text-gray-600 mb-4">Ghé thăm văn phòng của chúng tôi</p>
                <p className="text-emerald-600 font-medium">
                  123 Đường Lê Lợi, Quận 1<br />
                  Thành phố Hồ Chí Minh, Việt Nam
                </p>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 flex items-center justify-center bg-emerald-100 rounded-2xl mb-6">
                  <i className="ri-time-line text-3xl text-emerald-600"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Giờ Làm Việc</h3>
                <p className="text-gray-600">
                  Thứ Hai - Thứ Sáu: 9:00 - 18:00<br />
                  Thứ Bảy: 9:00 - 12:00<br />
                  Chủ Nhật: Nghỉ
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 md:p-10 shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Gửi Tin Nhắn</h2>
              
              <form id="contact-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Họ và Tên <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    placeholder="Nhập họ và tên của bạn"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Tiêu Đề <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    placeholder="Chủ đề tin nhắn"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Tin Nhắn <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors resize-none"
                    placeholder="Nhập tin nhắn của bạn (tối đa 500 ký tự)"
                  />
                  <p className="text-xs text-gray-500 mt-2">
                    {formData.message.length}/500 ký tự
                  </p>
                </div>

                {submitStatus === 'success' && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-checkbox-circle-fill text-emerald-600 text-xl"></i>
                    </div>
                    <p className="text-sm text-emerald-800">
                      Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
                    </p>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <i className="ri-error-warning-fill text-red-600 text-xl"></i>
                    </div>
                    <p className="text-sm text-red-800">
                      Có lỗi xảy ra. Vui lòng thử lại sau.
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-emerald-600 text-white text-base font-medium rounded-xl hover:bg-emerald-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-loader-4-line animate-spin"></i>
                      Đang gửi...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="ri-send-plane-fill"></i>
                      Gửi Tin Nhắn
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="mt-16 bg-white rounded-3xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4967076041!2d106.69522831533417!3d10.775015992321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f4b3330bcc9%3A0x5a8b2d0f8e8e8e8e!2zTMOqIEzhu6NpLCBRdeG6rW4gMSwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1234567890123!5m2!1svi!2s"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ văn phòng EcoVoice"
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
