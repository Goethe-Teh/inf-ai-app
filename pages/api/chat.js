// force rebuild: 20250422-api-public-key
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { messages } = req.body;
  const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

  console.log('✅ API KEY:', OPENROUTER_API_KEY);
  console.log('✅ ส่งข้อความไป:', JSON.stringify(messages, null, 2));

  if (!OPENROUTER_API_KEY) {
    console.error('❌ ไม่พบ OPENROUTER_API_KEY ในระบบ');
    return res.status(500).json({ error: 'Missing OPENROUTER_API_KEY' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4',
        messages: [
          {
            role: 'system',
            content: 'คุณคือ AI ส่วนตัวชื่อ Infinity AI พูดคุยอย่างเป็นธรรมชาติ ฉลาด อ่อนโยน และตอบสนองตามความรู้สึกของผู้ใช้',
          },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const replyContent = data.choices?.[0]?.message?.content || '';

    if (!replyContent) {
      console.warn('⚠️ GPT EMPTY REPLY:', JSON.stringify(data));
    }

    res.status(200).json({
      reply: {
        role: 'assistant',
        content: replyContent || 'ขออภัยค่ะ ไม่มีการตอบกลับจาก Infinity AI ในตอนนี้',
      },
    });
  } catch (err) {
    console.error('❌ FETCH FAIL:', err);
    res.status(200).json({
      reply: {
        role: 'assistant',
        content: 'ขออภัยค่ะ ระบบไม่สามารถเชื่อมต่อกับ Infinity AI ได้ในขณะนี้',
      },
    });
  }
}
