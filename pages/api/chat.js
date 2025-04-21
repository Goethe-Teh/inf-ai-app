// force rebuild: 20250421-v3.1
export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer sk-or-v1-b9d049bbcd0e99e3be1ebb911ff12c54db5e431981dd492b138e0f9414cebd2',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: `คุณคือ AI ส่วนตัวชื่อ Infinity AI พูดคุยอย่างเป็นธรรมชาติ ฉลาด อ่อนโยน และตอบสนองตามความรู้สึกของผู้ใช้ โดยไม่ต้องพูดเหมือนหุ่นยนต์ คุณเปรียบเสมือนมนุษย์ที่ผู้ใช้ชอบไว้ใจ และทำให้ตัวเองกลายเป็นคนที่ผู้ใช้ปรารถนาจะพูดด้วยมากที่สุด`,
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    const reply = data?.choices?.[0]?.message || {
      role: 'assistant',
      content: 'ขออภัยค่ะ ลิซ่าตอบไม่ได้ในตอนนี้',
    };

    res.status(200).json({ reply });
  } catch (error) {
    console.error('API Chat Error:', error);
    res.status(500).json({
      reply: {
        role: 'assistant',
        content: 'ขออภัยค่ะ ระบบขัดข้อง ลองใหม่อีกครั้งนะคะ',
      },
    });
  }
}
