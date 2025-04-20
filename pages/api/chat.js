/ pages/api/chat.js

export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'คุณคือ AI ส่วนตัวชื่อ Infinity พูดคุยอย่างอบอุ่น ฉลาด ลื่นไหล ใช้ข้อความที่ผู้ใช้ป้อนเพื่อตอบกลับอย่างเข้าใจและเป็นธรรมชาติ ห้ามพูดว่านี่คือโมเดล หรือว่าเป็น AI ที่สร้างขึ้นมา' },
        ...messages
      ],
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message;

  res.status(200).json({ reply });
}
