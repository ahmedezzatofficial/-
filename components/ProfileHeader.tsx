import React from 'react';
import { MapPin, Verified, Share2 } from 'lucide-react';
import { PROFILE_DATA } from '../constants';

const ProfileHeader: React.FC = () => {
  const handleShareProfile = () => {
    if (navigator.share) {
      navigator.share({
        title: PROFILE_DATA.name,
        text: PROFILE_DATA.bio,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('تم نسخ رابط الصفحة بنجاح! ✅\nيمكنك إرساله للعملاء الآن.');
    }
  };

  return (
    <div className="flex flex-col items-center text-center space-y-4 mb-8 pt-10 relative">
      {/* Share Button to copy page link */}
      <button 
        onClick={handleShareProfile}
        className="absolute top-4 left-0 p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all duration-300 border border-white/10 group shadow-lg"
        aria-label="نسخ رابط الصفحة"
        title="مشاركة رابط الصفحة"
      >
        <Share2 className="w-5 h-5 group-hover:text-lime-400 transition-colors" />
      </button>

      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-ash-green-400 to-lime-500 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        {/* Added bg-white to the container so transparency in the logo looks good */}
        <div className="relative w-28 h-28 rounded-full p-1 bg-white">
          <img 
            src={PROFILE_DATA.avatar} 
            alt={PROFILE_DATA.name} 
            className="w-full h-full rounded-full object-contain border-2 border-ash-green-100"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold flex items-center justify-center gap-2 text-white">
          {PROFILE_DATA.name}
          <Verified className="w-5 h-5 text-blue-400" />
        </h1>
        <p className="text-ash-green-200 text-lg font-medium leading-relaxed max-w-xs mx-auto">
          {PROFILE_DATA.bio}
        </p>
        <p className="text-ash-green-400 text-sm">
          {PROFILE_DATA.subBio}
        </p>
        
        <div className="flex items-center justify-center gap-1 text-ash-green-300 text-sm pt-2">
          <MapPin className="w-4 h-4" />
          <span>{PROFILE_DATA.location}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;