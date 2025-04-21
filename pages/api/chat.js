// force rebuild: 20250421-chat-api-v2
export default async function handler(req, res) {
  const { messages } = req.body;

  try {
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
            content: `คุณคือ AI ส่วนตัวชื่อ Infinity AI พูดคุยอย่างเป็นธรรมชาติ ฉลาด อ่อนโยน และตอบสนองตามความรู้สึกของผู้ใช้`,
          },
          ...messages,
        ],
      }),
    });

    const data = await response.json();

    // ตรวจสอบว่ามี error หรือไม่
    if (data.error) {
      console.error('GPT ERROR:', data.error);
      return res.status(200).json({
        reply: {
          role: 'assistant',
          content: 'ขออภัยค่ะ เกิดข้อผิดพลาดจากระบบตอบกลับ',
        },
      });
    }

    // อ่านคำตอบปกติ
    const replyContent = data.choices?.[0]?.message?.content;
    if (!replyContent) {
      console.warn('GPT EMPTY REPLY:', JSON.stringify(data));
    }

    res.status(200).json({
      reply: {
        role: 'assistant',
        content: replyContent || 'ขออภัยค่ะ ไม่มีการตอบกลับจาก Infinity AI',
      },
    });
  } catch (err) {
    console.error('FETCH FAIL:', err);
    res.status(200).json({
      reply: {
        role: 'assistant',
        content: 'ขออภัยค่ะ ระบบไม่สามารถเชื่อมต่อกับ Infinity AI ได้ในขณะนี้',
      },
    });
  }
}
