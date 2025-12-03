import { useState } from 'react';

interface ArticleData {
  title: string;
  category: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  tags: string[];
  author: string;
  readTime: number;
}

interface ArticleEditorProps {
  articleData: ArticleData;
  setArticleData: (data: ArticleData) => void;
}

export default function ArticleEditor({ articleData, setArticleData }: ArticleEditorProps) {
  const [tagInput, setTagInput] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);

  const categories = [
    'Lối Sống Xanh',
    'Biến Đổi Khí Hậu',
    'Năng Lượng Tái Tạo',
    'Bảo Tồn Thiên Nhiên',
    'Giảm Rác Thải',
    'Nông Nghiệp Hữu Cơ',
    'Giao Thông Xanh',
    'Kiến Trúc Xanh'
  ];

  const handleAddTag = () => {
    if (tagInput.trim() && !articleData.tags.includes(tagInput.trim())) {
      setArticleData({
        ...articleData,
        tags: [...articleData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setArticleData({
      ...articleData,
      tags: articleData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById('content-editor') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = articleData.content.substring(start, end);
    let newText = '';

    switch (format) {
      case 'bold':
        newText = `**${selectedText || 'văn bản in đậm'}**`;
        break;
      case 'italic':
        newText = `*${selectedText || 'văn bản in nghiêng'}*`;
        break;
      case 'h2':
        newText = `\n## ${selectedText || 'Tiêu đề lớn'}\n`;
        break;
      case 'h3':
        newText = `\n### ${selectedText || 'Tiêu đề nhỏ'}\n`;
        break;
      case 'quote':
        newText = `\n> ${selectedText || 'Trích dẫn'}\n`;
        break;
      case 'list':
        newText = `\n- ${selectedText || 'Mục danh sách'}\n`;
        break;
      case 'link':
        newText = `[${selectedText || 'văn bản liên kết'}](url)`;
        break;
      case 'image':
        setShowImageInput(true);
        return;
    }

    const newContent = 
      articleData.content.substring(0, start) + 
      newText + 
      articleData.content.substring(end);

    setArticleData({ ...articleData, content: newContent });
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + newText.length, start + newText.length);
    }, 0);
  };

  const insertImage = (imageUrl: string) => {
    const newContent = articleData.content + `\n![Mô tả hình ảnh](${imageUrl})\n`;
    setArticleData({ ...articleData, content: newContent });
    setShowImageInput(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Tiêu Đề Bài Viết <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="title"
          value={articleData.title}
          onChange={(e) => setArticleData({ ...articleData, title: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-lg font-semibold"
          placeholder="Nhập tiêu đề hấp dẫn cho bài viết..."
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Danh Mục
          </label>
          <select
            id="category"
            value={articleData.category}
            onChange={(e) => setArticleData({ ...articleData, category: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm cursor-pointer"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Tác Giả
          </label>
          <input
            type="text"
            id="author"
            value={articleData.author}
            onChange={(e) => setArticleData({ ...articleData, author: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
            placeholder="Tên tác giả"
          />
        </div>
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
          Mô Tả Ngắn
        </label>
        <textarea
          id="excerpt"
          value={articleData.excerpt}
          onChange={(e) => {
            if (e.target.value.length <= 200) {
              setArticleData({ ...articleData, excerpt: e.target.value });
            }
          }}
          rows={3}
          maxLength={200}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm resize-none"
          placeholder="Viết mô tả ngắn gọn về bài viết (tối đa 200 ký tự)..."
        ></textarea>
        <p className="text-xs text-gray-500 mt-1">{articleData.excerpt.length}/200 ký tự</p>
      </div>

      <div>
        <label htmlFor="featured-image" className="block text-sm font-medium text-gray-700 mb-2">
          Ảnh Đại Diện
        </label>
        <input
          type="text"
          id="featured-image"
          value={articleData.featuredImage}
          onChange={(e) => setArticleData({ ...articleData, featuredImage: e.target.value })}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
          placeholder="Nhập URL ảnh đại diện hoặc để trống để tự động tạo"
        />
        {articleData.featuredImage && (
          <div className="mt-3 w-full h-48 rounded-lg bg-cover bg-center" style={{ backgroundImage: `url('${articleData.featuredImage}')` }}></div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Thẻ Tag
        </label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-emerald-500 text-sm"
            placeholder="Nhập tag và nhấn Enter"
          />
          <button
            onClick={handleAddTag}
            className="px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors cursor-pointer whitespace-nowrap"
          >
            Thêm
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {articleData.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm"
            >
              {tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="w-4 h-4 flex items-center justify-center hover:text-emerald-900 cursor-pointer"
              >
                <i className="ri-close-line text-sm"></i>
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="content-editor" className="block text-sm font-medium text-gray-700 mb-2">
          Nội Dung Bài Viết <span className="text-red-500">*</span>
        </label>
        
        <div className="border border-gray-300 rounded-lg overflow-hidden">
          <div className="bg-gray-50 border-b border-gray-300 px-4 py-2 flex flex-wrap gap-2">
            <button
              onClick={() => insertFormatting('bold')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="In đậm"
            >
              <i className="ri-bold text-gray-700"></i>
            </button>
            <button
              onClick={() => insertFormatting('italic')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="In nghiêng"
            >
              <i className="ri-italic text-gray-700"></i>
            </button>
            <div className="w-px h-8 bg-gray-300"></div>
            <button
              onClick={() => insertFormatting('h2')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="Tiêu đề lớn"
            >
              <i className="ri-h-2 text-gray-700"></i>
            </button>
            <button
              onClick={() => insertFormatting('h3')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="Tiêu đề nhỏ"
            >
              <i className="ri-h-3 text-gray-700"></i>
            </button>
            <div className="w-px h-8 bg-gray-300"></div>
            <button
              onClick={() => insertFormatting('quote')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="Trích dẫn"
            >
              <i className="ri-double-quotes-l text-gray-700"></i>
            </button>
            <button
              onClick={() => insertFormatting('list')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="Danh sách"
            >
              <i className="ri-list-unordered text-gray-700"></i>
            </button>
            <div className="w-px h-8 bg-gray-300"></div>
            <button
              onClick={() => insertFormatting('link')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="Liên kết"
            >
              <i className="ri-link text-gray-700"></i>
            </button>
            <button
              onClick={() => insertFormatting('image')}
              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded transition-colors cursor-pointer"
              title="Hình ảnh"
            >
              <i className="ri-image-line text-gray-700"></i>
            </button>
          </div>

          {showImageInput && (
            <div className="bg-emerald-50 border-b border-gray-300 px-4 py-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Nhập URL hình ảnh"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm focus:outline-none focus:border-emerald-500"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      insertImage((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }}
                />
                <button
                  onClick={() => setShowImageInput(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded text-sm hover:bg-gray-300 cursor-pointer whitespace-nowrap"
                >
                  Hủy
                </button>
              </div>
            </div>
          )}

          <textarea
            id="content-editor"
            value={articleData.content}
            onChange={(e) => setArticleData({ ...articleData, content: e.target.value })}
            rows={20}
            className="w-full px-4 py-3 focus:outline-none text-sm resize-none font-mono"
            placeholder="Viết nội dung bài viết của bạn ở đây...&#10;&#10;Hỗ trợ Markdown:&#10;**in đậm** hoặc *in nghiêng*&#10;## Tiêu đề lớn&#10;### Tiêu đề nhỏ&#10;> Trích dẫn&#10;- Danh sách&#10;[liên kết](url)&#10;![hình ảnh](url)"
          ></textarea>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {articleData.content.length} ký tự • Khoảng {Math.ceil(articleData.content.split(' ').length / 200)} phút đọc
        </p>
      </div>

      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="ri-lightbulb-line text-emerald-600"></i>
          </div>
          <div className="text-sm text-gray-700">
            <p className="font-medium text-emerald-900 mb-1">Mẹo viết bài hiệu quả:</p>
            <ul className="space-y-1 text-gray-600">
              <li>• Sử dụng tiêu đề hấp dẫn và rõ ràng</li>
              <li>• Chia nhỏ nội dung thành các đoạn ngắn dễ đọc</li>
              <li>• Thêm hình ảnh minh họa để bài viết sinh động hơn</li>
              <li>• Sử dụng ví dụ thực tế và số liệu cụ thể</li>
              <li>• Kết thúc bằng lời kêu gọi hành động</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}