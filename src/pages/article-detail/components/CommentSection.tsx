import { useState } from 'react';

interface Comment {
  id: number;
  name: string;
  date: string;
  content: string;
  rating: number;
  avatar: string;
}

export default function CommentSection() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      name: 'Nguyễn Văn A',
      date: '16 Tháng 1, 2025',
      content: 'Bài viết rất hữu ích! Tôi đã bắt đầu áp dụng một số cách và thấy hiệu quả rõ rệt. Đặc biệt là việc sử dụng túi vải và bình nước cá nhân, vừa tiết kiệm vừa thân thiện với môi trường.',
      rating: 5,
      avatar: 'https://readdy.ai/api/search-image?query=asian%20man%20portrait%20smiling%20friendly%20professional%20headshot%20natural%20lighting%20simple%20clean%20background&width=200&height=200&seq=avatar-001&orientation=squarish'
    },
    {
      id: 2,
      name: 'Trần Thị B',
      date: '16 Tháng 1, 2025',
      content: 'Cảm ơn tác giả đã chia sẻ! Tôi đặc biệt thích phần về mua sắm thực phẩm không bao bì. Có thể chia sẻ thêm địa chỉ các cửa hàng zero waste ở Hà Nội được không?',
      rating: 5,
      avatar: 'https://readdy.ai/api/search-image?query=asian%20woman%20portrait%20smiling%20friendly%20professional%20headshot%20natural%20lighting%20simple%20clean%20background&width=200&height=200&seq=avatar-002&orientation=squarish'
    },
    {
      id: 3,
      name: 'Lê Minh C',
      date: '15 Tháng 1, 2025',
      content: 'Những lời khuyên rất thực tế và dễ áp dụng. Tôi nghĩ nếu mọi người cùng thực hiện, chúng ta có thể tạo ra sự thay đổi lớn cho môi trường.',
      rating: 4,
      avatar: 'https://readdy.ai/api/search-image?query=asian%20man%20portrait%20confident%20professional%20headshot%20natural%20lighting%20simple%20clean%20background&width=200&height=200&seq=avatar-003&orientation=squarish'
    }
  ]);

  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    content: '',
    rating: 5
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new URLSearchParams();
    formData.append('name', newComment.name);
    formData.append('email', newComment.email);
    formData.append('content', newComment.content);
    formData.append('rating', newComment.rating.toString());

    try {
      const response = await fetch('https://readdy.ai/api/form/d4mq6j3ifile0aqbfpd0', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString()
      });

      if (response.ok) {
        const newCommentData: Comment = {
          id: comments.length + 1,
          name: newComment.name,
          date: new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' }),
          content: newComment.content,
          rating: newComment.rating,
          avatar: 'https://readdy.ai/api/search-image?query=default%20user%20avatar%20simple%20icon%20clean%20background&width=200&height=200&seq=avatar-default&orientation=squarish'
        };
        
        setComments([newCommentData, ...comments]);
        setNewComment({ name: '', email: '', content: '', rating: 5 });
        alert('Cảm ơn bạn đã chia sẻ ý kiến!');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
  };

  return (
    <div className="mt-16">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">
        Bình Luận & Đánh Giá ({comments.length})
      </h2>

      <form onSubmit={handleSubmit} className="bg-gray-50 rounded-2xl p-8 mb-12" data-readdy-form>
        <h3 className="text-xl font-bold text-gray-900 mb-6">Chia sẻ ý kiến của bạn</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Đánh giá của bạn
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewComment({ ...newComment, rating: star })}
                className="w-10 h-10 flex items-center justify-center cursor-pointer"
              >
                <i className={`ri-star-${star <= newComment.rating ? 'fill' : 'line'} text-2xl ${star <= newComment.rating ? 'text-yellow-400' : 'text-gray-300'}`}></i>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Họ và tên <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={newComment.name}
              onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
              required
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
              value={newComment.email}
              onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Nội dung bình luận <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            name="content"
            value={newComment.content}
            onChange={(e) => {
              if (e.target.value.length <= 500) {
                setNewComment({ ...newComment, content: e.target.value });
              }
            }}
            rows={5}
            maxLength={500}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm resize-none"
            placeholder="Chia sẻ suy nghĩ của bạn về bài viết..."
            required
          ></textarea>
          <p className="text-xs text-gray-500 mt-2">
            {newComment.content.length}/500 ký tự
          </p>
        </div>

        <button
          type="submit"
          className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
        >
          Gửi Bình Luận
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url('${comment.avatar}')` }}
              ></div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-gray-900">{comment.name}</h4>
                    <p className="text-sm text-gray-500">{comment.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`ri-star-${star <= comment.rating ? 'fill' : 'line'} text-yellow-400`}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                <div className="flex items-center gap-4 mt-4">
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                    <i className="ri-thumb-up-line"></i>
                    <span>Hữu ích</span>
                  </button>
                  <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors cursor-pointer">
                    <i className="ri-reply-line"></i>
                    <span>Trả lời</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}