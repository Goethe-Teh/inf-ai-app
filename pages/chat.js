import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Chat() {
  const router = useRouter();
  const { language } = router.query;
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [...messages, userMessage], language }),
    });
    const data = await res.json();
    if (data.result) {
      setMessages(prev => [...prev, { role: 'assistant', content: data.result }]);
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Chatting in: {language || 'Unknown Language'}</h2>
      <div style={{ minHeight: 200, marginBottom: 20 }}>
        {messages.map((msg, i) => (
          <p key={i}><strong>{msg.role}:</strong> {msg.content}</p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type your message..."
        style={{ width: '80%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}