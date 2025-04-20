// force rebuild: 20250421-v4
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [thinking, setThinking] = useState(false);
  const [aiCallSelf, setAiCallSelf] = useState('Infinity AI');
  const [callUser, setCallUser] = useState('คุณ');

  useEffect(() => {
    const setup = JSON.parse(localStorage.getItem('infinity_setup') || '{}');
    const user = localStorage.getItem('infinity_user') || 'คุณ';
    const aiName = setup.name || 'Infinity AI';
    const aiCall = setup.aiCallSelf || aiName;
    const userCall = setup.callUser || user;

    setAiCallSelf(aiCall);
    setCallUser(userCall);

    const welcome = {
      role: 'assistant',
      content: `${aiCall}: สวัสดีค่ะ ${userCall} ตอนนี้ ${aiCall} พร้อมจะอยู่เคียงข้างคุณแล้วนะคะ ถ้ามีอะไรให้ช่วย พิมพ์มาได้เลยค่ะ`,
    };

    setMessages([welcome]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    setThinking(true);

    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const thinkingMsg = { role: 'assistant', content: '— กำลังคิด...' };
      setMessages([...updatedMessages, thinkingMsg]);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      const data = await res.json();
      const replyText = data?.reply?.content || '[No reply received]';
      const aiMessage = { role: 'assistant', content: replyText };
      setMessages([...updatedMessages, aiMessage]);
      localStorage.setItem('chatMessages', JSON.stringify([...updatedMessages, aiMessage]));
    } catch (err) {
      const errorMsg = { role: 'assistant', content: '[Error communicating with server]' };
      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setThinking(false);
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && input.trim()) {
      sendMessage();
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinity Chat</h2>
      <div style={{ minHeight: '300px', marginBottom: 20, border: '1px solid #ccc', padding: 10 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? callUser : aiCallSelf}:</b> {msg.content}
          </p>
        ))}
        {thinking && <p><i>— กำลังพิมพ์...</i></p>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="พิมพ์ข้อความที่นี่..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()}>
        {loading ? 'กำลังส่ง...' : 'ส่ง'}
      </button>
    </div>
  );
}
