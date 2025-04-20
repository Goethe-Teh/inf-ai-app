// force rebuild: 20250421-v1
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function ChatPage() {
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);

  const setup = JSON.parse(typeof window !== 'undefined' ? localStorage.getItem('infinity_setup') : '{}') || {};
  const username = typeof window !== 'undefined' ? localStorage.getItem('infinity_user') : '';
  const aiName = setup.name || 'Infinity AI';
  const callUser = setup.callUser || username || 'User';
  const aiCallSelf = setup.aiCallSelf || aiName;

  useEffect(() => {
    const welcomeMessage = `${aiCallSelf}: สวัสดีค่ะ ${callUser} ตอนนี้ ${aiCallSelf} พร้อมจะอยู่เคียงข้างคุณแล้วนะคะ ถ้ามีอะไรให้ช่วย แค่พิมพ์มาได้เลยค่ะ`;
    setMessages([{ role: 'assistant', content: welcomeMessage }]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setThinking(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      const reply = data?.reply?.content || '[ไม่มีคำตอบ]';
      setMessages([...updatedMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '[เกิดข้อผิดพลาดในการเชื่อมต่อ]' }]);
    } finally {
      setThinking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && input.trim()) {
      sendMessage();
    }
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <h2>Infinity Chat</h2>

      <div style={{ minHeight: '300px', marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? ${callUser} : `${aiCallSelf}`}:</b> {msg.content}
          </p>
        ))}
        {thinking && <p><i>— กำลังพิมพ์...</i></p>}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="พิมพ์ข้อความของคุณที่นี่..."
        style={{ width: '100%', padding: 12, marginBottom: 10 }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ width: '100%', padding: 12 }}>
        {loading ? 'กำลังส่ง...' : 'ส่งข้อความ'}
      </button>
    </div>
  );
}
