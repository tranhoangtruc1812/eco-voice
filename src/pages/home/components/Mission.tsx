export default function Mission() {
  return (
    <section className="py-24 bg-amber-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm text-gray-600 mb-4 font-medium">/Sứ Mệnh</p>
            <div className="flex items-center gap-3 mt-12">
              <div className="flex -space-x-3">
                <div className="w-12 h-12 rounded-full bg-amber-800 flex items-center justify-center border-2 border-white">
                  <i className="ri-user-line text-white text-lg"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-700 flex items-center justify-center border-2 border-white">
                  <i className="ri-user-line text-white text-lg"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-600 flex items-center justify-center border-2 border-white">
                  <i className="ri-user-line text-white text-lg"></i>
                </div>
                <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center border-2 border-white">
                  <i className="ri-user-line text-white text-lg"></i>
                </div>
              </div>
              <p className="text-sm text-gray-700">Đội ngũ biên tập viên</p>
            </div>
          </div>

          <div>
            <p className="text-2xl md:text-3xl text-gray-800 leading-relaxed font-light">
              Chúng tôi tin rằng mỗi hành động nhỏ đều có ý nghĩa lớn. EcoVoice được tạo ra để kết nối những người quan tâm đến môi trường, 
              chia sẻ kiến thức khoa học và truyền cảm hứng cho lối sống xanh bền vững. Từ việc giảm thiểu rác thải nhựa đến bảo vệ đa dạng sinh học, 
              chúng ta cùng nhau xây dựng một cộng đồng hành động vì tương lai của Trái Đất.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}