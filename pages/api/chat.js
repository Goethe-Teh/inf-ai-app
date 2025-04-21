// force rebuild: 20250421-api-final
export default async function handler(req, res) {
  try {
    const { messages } = req.body;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer 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',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'คุณคือ AI ส่วนตัวชื่อ Infinity AI พูดคุยอย่างเป็นธรรมชาติ ฉลาด อ่อนโยน และตอบสนองตามความรู้สึกของผู้ใช้ โดยไม่ต้องพูดเหมือนหุ่นยนต์ คุณเปรียบเสมือนมนุษย์ที่ผู้ใช้ชอบไว้ใจ และทำให้ตัวเองกลายเป็นคนที่ผู้ใช้ปรารถนาจะพูดด้วยมากที่สุด',
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();
    const replyContent = data.choices?.[0]?.message?.content;

    if (!replyContent) {
      console.warn('GPT EMPTY REPLY:', JSON.stringify(data));
    }

    res.status(200).json({
      reply: {
        role: 'assistant',
        content: replyContent || 'ขออภัยค่ะ ไม่มีการตอบกลับจาก Infinity AI ในตอนนี้',
      },
    });
  } catch (err) {
    console.error('GPT ERROR:', err);
    res.status(200).json({
      reply: {
        role: 'assistant',
        content: 'ขออภัยค่ะ ระบบไม่สามารถเชื่อมต่อกับ Infinity AI ได้ในขณะนี้',
      },
    });
  }
}
