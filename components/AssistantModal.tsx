import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage, LoadingState } from '../types';

interface AssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssistantModal: React.FC<AssistantModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'أهلاً بك في أشجارنا! 🌿 أنا هنا لمساعدتك. اسألني عن خدماتنا، أنواع النباتات، أو كيفية التواصل معنا.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loadingState, setLoadingState] = useState<LoadingState>(LoadingState.IDLE);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputValue.trim() || loadingState === LoadingState.LOADING) return;

    const userText = inputValue;
    setInputValue('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setLoadingState(LoadingState.LOADING);

    try {
      const responseText = await sendMessageToGemini(userText);
      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      setLoadingState(LoadingState.SUCCESS);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "عذراً، حدث خطأ أثناء الاتصال بالخادم.", isError: true }]);
      setLoadingState(LoadingState.ERROR);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-ash-green-950 w-full max-w-lg h-[600px] max-h-[90vh] rounded-2xl shadow-2xl flex flex-col border border-ash-green-800 overflow-hidden relative">
        
        {/* Header */}
        <div className="p-4 border-b border-ash-green-800 flex justify-between items-center bg-ash-green-900/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-lime-500 to-emerald-600 flex items-center justify-center shadow-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">مساعد أشجارنا الذكي</h3>
              <p className="text-xs text-ash-green-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> مدعوم بالذكاء الاصطناعي
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-ash-green-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-ash-green-700">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`
                  max-w-[85%] p-3 rounded-2xl text-sm md:text-base leading-relaxed
                  ${msg.role === 'user' 
                    ? 'bg-lime-600 text-white rounded-tl-none' 
                    : 'bg-ash-green-800 text-ash-green-50 rounded-tr-none border border-ash-green-700'}
                  ${msg.isError ? 'bg-red-900/50 border-red-800' : ''}
                `}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {loadingState === LoadingState.LOADING && (
            <div className="flex justify-start">
              <div className="bg-ash-green-800 p-3 rounded-2xl rounded-tr-none border border-ash-green-700 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-lime-500" />
                <span className="text-ash-green-300 text-sm">جاري الكتابة...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 bg-ash-green-900/30 border-t border-ash-green-800">
          <div className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="اكتب استفسارك هنا..."
              className="w-full bg-ash-green-900 text-white placeholder-ash-green-500 rounded-full py-3 pr-4 pl-12 border border-ash-green-700 focus:border-lime-500 focus:ring-1 focus:ring-lime-500 outline-none transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loadingState === LoadingState.LOADING || !inputValue.trim()}
              className="absolute left-2 p-2 bg-lime-600 hover:bg-lime-500 disabled:bg-ash-green-800 disabled:text-ash-green-600 text-white rounded-full transition-all"
            >
              <Send className="w-4 h-4 transform rotate-180" /> {/* Rotated for RTL feel if needed, but icon usually points right. Removing rotation for clarity */}
            </button>
          </div>
          <p className="text-[10px] text-center text-ash-green-600 mt-2">
            يمكن للذكاء الاصطناعي أن يرتكب أخطاء. يرجى التحقق من المعلومات الهامة.
          </p>
        </div>

      </div>
    </div>
  );
};

export default AssistantModal;