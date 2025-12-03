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

interface ArticlePreviewProps {
  articleData: ArticleData;
}

export default function ArticlePreview({ articleData }: ArticlePreviewProps) {
  const renderContent = (content: string) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements: JSX.Element[] = [];
    let key = 0;

    lines.forEach((line, index) => {
      // Headers
      if (line.startsWith('### ')) {
        elements.push(
          <h3 key={key++} className="text-2xl font-bold text-gray-900 mt-8 mb-4">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={key++} className="text-3xl font-bold text-gray-900 mt-10 mb-6">
            {line.replace('## ', '')}
          </h2>
        );
      }
      // Quote
      else if (line.startsWith('> ')) {
        elements.push(
          <blockquote key={key++} className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-lg my-6">
            <p className="text-lg text-gray-800 italic">{line.replace('> ', '')}</p>
          </blockquote>
        );
      }
      // List
      else if (line.startsWith('- ')) {
        elements.push(
          <li key={key++} className="text-gray-700 leading-relaxed ml-6">
            {line.replace('- ', '')}
          </li>
        );
      }
      // Image
      else if (line.match(/!\[.*\]\(.*\)/)) {
        const match = line.match(/!\[(.*)\]\((.*)\)/);
        if (match) {
          elements.push(
            <div key={key++} className="w-full h-80 rounded-2xl bg-cover bg-center my-8" style={{ backgroundImage: `url('${match[2]}')` }}></div>
          );
        }
      }
      // Link
      else if (line.match(/\[.*\]\(.*\)/)) {
        const parts = line.split(/(\[.*?\]\(.*?\))/);
        const linkElements = parts.map((part, i) => {
          const linkMatch = part.match(/\[(.*?)\]\((.*?)\)/);
          if (linkMatch) {
            return (
              <a key={i} href={linkMatch[2]} className="text-emerald-600 hover:text-emerald-700 underline cursor-pointer">
                {linkMatch[1]}
              </a>
            );
          }
          return formatInlineText(part, i);
        });
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed mb-4">
            {linkElements}
          </p>
        );
      }
      // Regular paragraph
      else if (line.trim()) {
        elements.push(
          <p key={key++} className="text-gray-700 leading-relaxed mb-4">
            {formatInlineText(line, key)}
          </p>
        );
      }
      // Empty line
      else {
        elements.push(<div key={key++} className="h-2"></div>);
      }
    });

    return elements;
  };

  const formatInlineText = (text: string, key: number) => {
    // Bold and italic
    const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={`${key}-${i}`}>{part.slice(2, -2)}</strong>;
      } else if (part.startsWith('*') && part.endsWith('*')) {
        return <em key={`${key}-${i}`}>{part.slice(1, -1)}</em>;
      }
      return part;
    });
  };

  const defaultImage = `https://readdy.ai/api/search-image?query=environmental%20protection%20nature%20conservation%20green%20earth%20sustainable%20living%20clean%20simple%20background&width=1200&height=600&seq=preview-default&orientation=landscape`;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
          {articleData.category}
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {articleData.title || 'Tiêu đề bài viết của bạn'}
        </h1>
        <div className="flex items-center gap-6 text-gray-600 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
              <i className="ri-user-line text-emerald-600"></i>
            </div>
            <span>{articleData.author || 'Tác giả'}</span>
          </div>
          <span>{new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
          <span>{Math.ceil(articleData.content.split(' ').length / 200)} phút đọc</span>
        </div>
      </div>

      {(articleData.featuredImage || !articleData.content) && (
        <div 
          className="w-full h-96 rounded-3xl bg-cover bg-center mb-10"
          style={{ backgroundImage: `url('${articleData.featuredImage || defaultImage}')` }}
        ></div>
      )}

      {articleData.excerpt && (
        <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
          {articleData.excerpt}
        </p>
      )}

      <div className="prose prose-lg max-w-none">
        {articleData.content ? (
          renderContent(articleData.content)
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4 bg-gray-100 rounded-full">
              <i className="ri-file-text-line text-3xl text-gray-400"></i>
            </div>
            <p className="text-gray-500">Nội dung bài viết sẽ hiển thị ở đây</p>
            <p className="text-sm text-gray-400 mt-2">Hãy bắt đầu viết ở tab Chỉnh Sửa</p>
          </div>
        )}
      </div>

      {articleData.tags.length > 0 && (
        <div className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-600">Tags:</span>
            {articleData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-gray-600 font-medium">Chia sẻ bài viết:</span>
          <div className="flex gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors cursor-pointer">
              <i className="ri-facebook-fill"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors cursor-pointer">
              <i className="ri-twitter-x-fill"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors cursor-pointer">
              <i className="ri-whatsapp-fill"></i>
            </button>
            <button className="w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors cursor-pointer">
              <i className="ri-link"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}