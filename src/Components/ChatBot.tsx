'use client';
import { useState, useRef, useEffect } from 'react';

type Message = { role: 'user' | 'assistant'; content: string };

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi! Welcome to Hill Street. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const send = async (text?: string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: msg }];
    setMessages(newMessages);
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages
        })
      });
      const data = await res.json();
      const reply = data.reply || 'Please call +91 99859 69666 for help.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry! Please call +91 99859 69666.' }]);
    }
    setLoading(false);
  };

  const quickQuestions = ['Room availability', 'Pricing', 'Amenities', 'Location', 'How to book'];

  return (
    <>
      <button onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg z-50 text-2xl">
        {open ? '✕' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-80 h-125 bg-white rounded-2xl shadow-2xl flex flex-col z-50 border border-gray-100">
          <div className="bg-green-900 text-white p-4 rounded-t-2xl flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">🏡</div>
            <div>
              <p className="font-medium text-sm">Hill Street Assistant</p>
              <p className="text-xs opacity-80">● Online now</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-2 ${m.role === 'user' ? 'justify-end' : ''}`}>
                {m.role === 'assistant' && <span className="text-lg mt-auto">🏡</span>}
                <div className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${
                  m.role === 'user' ? 'bg-green-800 text-white' : 'bg-white border border-gray-100'}`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-2">
                <span className="text-lg">🏡</span>
                <div className="bg-white border border-gray-100 px-3 py-2 rounded-2xl">
                  <span className="animate-pulse text-sm text-gray-400">Typing...</span>
                </div>
              </div>
            )}
            {messages.length === 1 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {quickQuestions.map(q => (
                  <button key={q} onClick={() => send(q)}
                    className="text-xs px-3 py-1.5 rounded-full border border-green-800 text-green-800 bg-white hover:bg-green-50">
                    {q}
                  </button>
                ))}
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="p-3 border-t flex gap-2 bg-white rounded-b-2xl">
            <input value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Ask anything..."
              className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-green-800" />
            <button onClick={() => send()}
              className="w-9 h-9 bg-green-800 rounded-full flex items-center justify-center text-white text-sm">
              ➤
            </button>
          </div>
          <p className="text-center text-xs text-gray-400 py-1 bg-white rounded-b-2xl">Sania Sultana</p>
        </div>
      )}
    </>
  );
}