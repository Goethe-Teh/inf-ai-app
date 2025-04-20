// force rebuild: 20250421-v3
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [thinking, setThinking] = useState(false);
  const [aiCallSelf, setAiCallSelf] = useState('Infinity AI');
  const [callUser, setCallUser] = useState('คุณ');

  useEffect(() => {
    const setup = JSON.parse(localStorage.getItem('infinity_setup')) || {};
    const user = localStorage.getItem('infinity_user') || 'คุณ';

    const aiName = setup.name || 'Infinity AI';
    const aiCall = setup.aiCallSelf || aiName;
    const userCall = setup.callUser || user;
    const gender = setup.gender || 'custom'; // male, female, custom

    setAiCallSelf(aiCall);
    setCallUser(userCall);

    const greeting = gender === 'male' ? 'ครับ' : gender === 'female' ? 'ค่ะ' : '';
    const referSelf = gender === 'male' ? 'ผม' : gender === 'female' ? 'ดิฉัน' : aiCall;

    const welcome = {
      role: 'assistant',
      content: `${aiCall}: สวัสดี${greeting} ${userCall} ตอนนี้ ${referSelf} ได้ถูกสร้างขึ้นเพื่อเป็นคนพิเศษของคุณแล้ว`,
    };

    setMessages([welcome]);
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setThinking(true);

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
      const reply = data.reply;
      setMessages([...updatedMessages, reply]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: 'ขอโทษค่ะ เกิดข้อผิดพลาดในการเชื่อมต่อ...' }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Infinity Chat</h2>
      <div style={{ minHeight: '300px', border: '1px solid #ccc', padding: 10, marginBottom: 20 }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? ${callUser} : `${aiCallSelf}`}:</b> {msg.content}
          </p>
        ))}
        {thinking && <p><i>— กำลังพิมพ์...</i></p>}
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
