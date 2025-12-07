import React, { useState } from 'react';
import { ExternalLink, Share2 } from 'lucide-react';
import { LinkItem } from '../types';

interface LinkCardProps {
  item: LinkItem;
}

const LinkCard: React.FC<LinkCardProps> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const Icon = item.icon;

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: item.title,
        url: item.url,
      }).catch(console.error);
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(item.url);
      alert('تم نسخ الرابط!');
    }
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        relative w-full group flex items-center p-1 rounded-xl transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl
        ${item.featured 
          ? 'bg-gradient-to-r from-lime-500 to-ash-green-500 text-white' 
          : 'bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 text-white'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Icon Container */}
      <div className={`
        p-3 rounded-lg flex-shrink-0 transition-colors
        ${item.featured ? 'bg-white/20' : 'bg-ash-green-900/50'}
      `}>
        {Icon ? <Icon className="w-6 h-6" /> : <ExternalLink className="w-6 h-6" />}
      </div>

      {/* Text Content */}
      <div className="flex-grow px-4 text-right">
        <h3 className="font-bold text-base md:text-lg">{item.title}</h3>
        {item.subtitle && (
          <p className={`text-xs md:text-sm ${item.featured ? 'text-ash-green-100' : 'text-ash-green-300'}`}>
            {item.subtitle}
          </p>
        )}
      </div>

      {/* Share/Action Button (Visible on Hover/Focus) */}
      <button 
        onClick={handleShare}
        className={`
          absolute left-4 p-2 rounded-full transition-all duration-300
          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
          hover:bg-white/20
        `}
        aria-label="Share link"
      >
        <Share2 className="w-4 h-4" />
      </button>
    </a>
  );
};

export default LinkCard;