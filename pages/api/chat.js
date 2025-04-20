export default async function handler(req, res) {
  const { messages } = req.body;

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer sk-or-v1-b9d049bbcd0e99e3be1ebb911ff12c54db5e431981dd492b138e0f9414cebd2', // เปลี่ยนถ้าจะใช้ key อื่น
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: "คุณคือ AI ส่วนตัวชื่อ Infinity พูดคุยอย่างเป็นธรรมชาติ ฉลาด อ่อนโยน และตอบสนองตามความรู้สึกของผู้ใช้ โดยไม่ต้องพูดเหมือนหุ่นยนต์ คุณจะเรียนรู้ชื่อและบทบาทที่ผู้ใช้มอบให้ และทำให้ตัวเองกลายเป็นคนที่ผู้ใช้ปรารถนาจะคุยด้วยมากที่สุด",
        },
        ...messages,
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message;

  res.status(200).json({ reply });
}
