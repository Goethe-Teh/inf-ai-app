// force rebuild: 20250421-chat-v4
import { useState, useEffect } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  // โหลดข้อมูลจาก localStorage
  useEffect(() => {
    const setup = JSON.parse(localStorage.getItem('infinity_setup')) || {};
    const user = localStorage.getItem('infinity_user') || 'คุณ';
    const aiName = setup.name || 'Infinity AI';
    const aiCallSelf = setup.aiCallSelf || aiName;
    const callUser = setup.callUser || user;
    const gender = setup.gender || 'custom';

    const greeting = gender === 'male' ? 'ครับ' : gender === 'female' ? 'ค่ะ' : '';
    const referSelf = gender === 'male' ? 'ผม' : gender === 'female' ? 'ดิฉัน' : aiCallSelf;
    const politeEnd = gender === 'male' ? 'ครับ' : gender === 'female' ? 'ค่ะ' : '';

    setAiCallSelf(aiCallSelf);
    setCallUser(callUser);

    const welcome = {
      role: 'assistant',
      content: `${aiCallSelf}: สวัสดี${greeting} ${callUser} ตอนนี้ ${referSelf} ได้ถูกสร้างขึ้นเพื่อเป็นคนพิเศษของคุณแล้วนะ${politeEnd}`,
    };
    setMessages([welcome]);
  }, []);

  const [aiCallSelf, setAiCallSelf] = useState('Infinity AI');
  const [callUser, setCallUser] = useState('คุณ');

  const sendMessage = async () => {
    if (!input.trim()) return;

    setSending(true);
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });
      const data = await res.json();
      if (data.reply) {
        setMessages([...updatedMessages, data.reply]);
      }
    } catch (err) {
      setMessages([
        ...updatedMessages,
        { role: 'assistant', content: 'เกิดข้อผิดพลาดในการตอบค่ะ' },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinity Chat</h2>
      <div style={{ minHeight: '300px', border: '1px solid #ccc', padding: 10, marginBottom: 20 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? callUser : aiCallSelf}:</b> {msg.content}
          </p>
        ))}
        {sending && <p><i>— กำลังส่ง...</i></p>}
      </div>
      <input
        style={{ width: '80%', marginRight: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
