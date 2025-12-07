import { 
  Globe, 
  Facebook, 
  Instagram, 
  MessageCircle, 
  Phone, 
  Mail,
  MapPin,
  Youtube,
  PhoneCall,
  LucideProps
} from 'lucide-react';
import { LinkItem, SocialLink } from './types';

// Custom TikTok Icon Component
const TikTokIcon = (props: LucideProps) => (
  <svg 
    {...props}
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const PROFILE_DATA = {
  name: "Ashgarna | أشجارنا",
  bio: "للاستثمار والاستصلاح الزراعي. نزرع المستقبل، شجرة تلو الأخرى.",
  subBio: "Agricultural Investment & Reclamation",
  // Trying to fetch the logo directly from your Facebook Page ID (113168587999623)
  // If this doesn't load, please replace this URL with a direct link to your logo image.
  avatar: "https://graph.facebook.com/113168587999623/picture?type=large", 
  location: "المقطم، القاهرة، مصر",
  contactEmail: "ourtrees05@gmail.com"
};

export const MAIN_LINKS: LinkItem[] = [
  {
    id: 'whatsapp',
    title: 'تواصل معنا عبر واتساب',
    subtitle: '+20 114 118 3744',
    url: 'https://wa.me/201141183744',
    icon: MessageCircle,
    featured: true
  },
  {
    id: 'phone',
    title: 'اتصل بنا هاتفياً',
    subtitle: '+20 111 774 0075',
    url: 'tel:+201117740075',
    icon: PhoneCall,
    featured: true
  },
  {
    id: 'location',
    title: 'موقعنا على الخريطة',
    subtitle: 'اضغط للوصول إلينا',
    url: 'https://maps.app.goo.gl/nHoGPjJzMK9usuev5',
    icon: MapPin,
    featured: true
  },
  {
    id: 'facebook',
    title: 'صفحتنا على فيسبوك',
    subtitle: 'Ashgarna - أشجارنا',
    url: 'https://www.facebook.com/OurTrees05',
    icon: Facebook
  },
  {
    id: 'instagram',
    title: 'تابعنا على انستجرام',
    subtitle: '@our.trees05',
    url: 'https://www.instagram.com/our.trees05',
    icon: Instagram
  },
  {
    id: 'youtube',
    title: 'قناتنا على يوتيوب',
    subtitle: '@OurTrees',
    url: 'https://www.youtube.com/@OurTrees',
    icon: Youtube
  },
  {
    id: 'tiktok',
    title: 'تابعنا على تيك توك',
    subtitle: '@ourtrees',
    url: 'https://www.tiktok.com/@ourtrees',
    icon: TikTokIcon
  }
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: 'Facebook', url: 'https://www.facebook.com/OurTrees05', icon: Facebook },
  { platform: 'Instagram', url: 'https://www.instagram.com/our.trees05', icon: Instagram },
  { platform: 'YouTube', url: 'https://www.youtube.com/@OurTrees', icon: Youtube },
  { platform: 'TikTok', url: 'https://www.tiktok.com/@ourtrees', icon: TikTokIcon },
  { platform: 'Email', url: `mailto:${PROFILE_DATA.contactEmail}`, icon: Mail },
];

export const SYSTEM_INSTRUCTION = `
You are an intelligent assistant for a company called "Ashgarna" (أشجارنا) for Agricultural Investment and Reclamation.
Your goal is to help visitors understand what the company does based on the links provided on the page.
The company contact info:
- Phone: +201117740075
- WhatsApp: +201141183744
- Email: ourtrees05@gmail.com
- Location: Mokattam, Cairo, Egypt (https://maps.app.goo.gl/nHoGPjJzMK9usuev5)

The company specializes in:
- Agricultural investment
- Land reclamation
- Landscaping (Hardscape & Softscape)
- Indoor and outdoor plants
- Irrigation systems

Tone: Friendly, professional, and eco-conscious.
Language: Reply in the same language the user asks (Arabic or English).
If asked about contact info, refer them to the WhatsApp link or Phone button.
`;