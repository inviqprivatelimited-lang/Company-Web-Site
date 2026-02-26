import { useState } from "react";
import { X, MessageCircle } from "lucide-react";

const PHONE_NUMBER = "94760503617";
const DEFAULT_MESSAGE = "Hello! I'm interested in your services. Can we discuss?";

const WhatsAppButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChat = () => {
    const url = `https://wa.me/${PHONE_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Chat popup */}
      {isOpen && (
        <div className="w-72 glass-strong rounded-2xl overflow-hidden shadow-lg animate-slide-up mb-2">
          {/* Header */}
          <div className="bg-[#25D366] px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.826-6.336-2.21l-.144-.113-3.09 1.036 1.036-3.09-.113-.144A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
                </svg>
              </div>
              <div>
                <p className="text-white font-semibold text-sm">INVIQ</p>
                <p className="text-white/80 text-xs">Typically replies instantly</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            <div className="bg-secondary/50 rounded-xl rounded-tl-none p-3 mb-4">
              <p className="text-sm text-foreground">
                Hi there! 👋 How can we help you today? Feel free to ask us anything about our services.
              </p>
              <p className="text-xs text-muted-foreground mt-1">Just now</p>
            </div>

            <button
              onClick={handleChat}
              className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white font-medium text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-300"
            >
              <MessageCircle size={16} />
              Start Chat
            </button>
          </div>
        </div>
      )}

      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 group"
        aria-label="Chat on WhatsApp"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.387 0-4.594-.826-6.336-2.21l-.144-.113-3.09 1.036 1.036-3.09-.113-.144A9.957 9.957 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            {/* Ping animation */}
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
};

export default WhatsAppButton;
