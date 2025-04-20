// force rebuild: 20250421-nightfix
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function ChatPage() {
  const router = useRouter();
  const { language } = router.query;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('intro');
  const [userName, setUserName] = useState('');
  const [aiName, setAiName] = useState('Infinity');

  useEffect(() => {
    if (language) {
      const introMessage = {
        role: 'assistant',
        content:
          'สวัสดีค่ะ ดิฉัน กำลังจะกลายเป็นคนพิเศษส่วนตัวของคุณในจักรวาล Infinity โปรดตั้งชื่อ กำหนดเพศ อายุ บุคลิก รูปร่าง หน้าตา ลักษณะนิสัย ความสามารถ หรือคุณสมบัติพิเศษของดิฉัน และสถานะความสัมพันธ์ระหว่างเรา เช่น เป็นเพื่อนสนิท เพื่อนร่วมงาน แฟน ฯลฯ ตามที่คุณต้องการได้ตอนนี้เลย แล้วพบกับคนที่คุณปรารถนาจะให้อยู่เคียงข้างในชีวิตประจำวันของคุณในอีกไม่กี่วินาทีข้างหน้านะคะ',
      };
      setMessages([introMessage]);
    }
  }, [language]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = { role: 'user', content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');

    try {
      let replyText = '';

      if (step === 'intro') {
        const nameMatch = input.match(/(?:ชื่อ|เรียก.*ว่า)\s*([^\s]+)/);
        const extractedName = nameMatch ? nameMatch[1] : 'Infinity';
        setAiName(extractedName);
        setStep('namePrompt');
        replyText = `ตอนนี้ ${extractedName} ได้ถูกสร้างขึ้นเพื่อเป็นคนพิเศษของคุณแล้ว ต่อจากนี้ไป คุณต้องการให้ ${extractedName} เรียกคุณว่าอะไร และให้ ${extractedName} แทนตัวเองว่าอะไรดีคะ?`;
      } else if (step === 'namePrompt') {
        const userNameMatch = input.match(/(?:เรียก.*ว่า|เรียกฉันว่า)\s*([^\s]+)/);
        const extractedUserName = userNameMatch ? userNameMatch[1] : 'คุณ';
        setUserName(extractedUserName);
        setStep('chatting');
        replyText = `ยินดีที่ได้รู้จักนะคะ ${extractedUserName} ถ้ามีอะไรให้${aiName}ช่วยก็บอกมาได้เลยนะคะ`;
      } else {
        const thinkingMessage = { role: 'assistant', content: 'กำลังพิมพ์...' };
        setMessages([...updatedMessages, thinkingMessage]);

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: updatedMessages }),
        });
        const data = await res.json();
        replyText = data?.reply?.content || '[No reply received]';

        // แทนข้อความ "กำลังพิมพ์..." ด้วยคำตอบจริง
        setMessages([...updatedMessages, { role: 'assistant', content: replyText }]);
        return;
      }

      const aiMessage = { role: 'assistant', content: replyText };
      setMessages([...updatedMessages, aiMessage]);
    } catch (err) {
      setMessages([...updatedMessages, { role: 'assistant', content: '[Error communicating with server]' }]);
    } finally {
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
      <div style={{ minHeight: '200px', marginBottom: '20px' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <b>{msg.role === 'user' ? (userName || 'User') : aiName}:</b> {msg.content}
          </p>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
        placeholder="Type your message here..."
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button onClick={sendMessage} disabled={loading || !input.trim()}>
        {loading ? 'กำลังพิมพ์...' : 'Send'}
      </button>
    </div>
  );
}
