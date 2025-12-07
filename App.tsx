import React, { useState } from 'react';
import ProfileHeader from './components/ProfileHeader';
import LinkCard from './components/LinkCard';
import AssistantModal from './components/AssistantModal';
import { MAIN_LINKS, SOCIAL_LINKS } from './constants';
import { Bot, MessageSquarePlus } from 'lucide-react';

const App: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-lime-500 selection:text-white">
      {/* Background with noise/gradient texture */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-ash-green-800 via-ash-green-950 to-black -z-10"></div>
      
      {/* Organic Shapes for aesthetics */}
      <div className="fixed top-0 left-0 w-96 h-96 bg-lime-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3 pointer-events-none"></div>

      <main className="max-w-xl mx-auto px-6 py-8 pb-32 relative z-10 flex flex-col min-h-screen">
        
        <ProfileHeader />

        {/* Links Stack */}
        <div className="space-y-4 w-full flex-grow">
          {MAIN_LINKS.map((link) => (
            <LinkCard key={link.id} item={link} />
          ))}
        </div>

        {/* Social Icons Row */}
        <div className="mt-12 flex justify-center gap-6">
          {SOCIAL_LINKS.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ash-green-400 hover:text-lime-400 transition-colors transform hover:scale-110"
                aria-label={social.platform}
              >
                <Icon className="w-6 h-6" />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center">
          <p className="text-ash-green-600 text-sm">
            © {new Date().getFullYear()} Ashgarna. All rights reserved.
          </p>
        </footer>
      </main>

      {/* Floating Action Button for AI Chat */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-40 flex items-center gap-2 bg-gradient-to-r from-lime-600 to-emerald-600 hover:from-lime-500 hover:to-emerald-500 text-white px-5 py-4 rounded-full shadow-2xl hover:shadow-lime-900/50 transition-all duration-300 transform hover:-translate-y-1 group"
      >
        <span className="hidden md:block font-medium pr-1">اسأل أشجارنا</span>
        <div className="relative">
          <Bot className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-200 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
        </div>
      </button>

      {/* Chat Modal */}
      <AssistantModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;