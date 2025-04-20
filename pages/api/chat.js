export default async function handler(req, res) {
  const { messages, language } = req.body;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer sk-or-xxx'
      },
      body: JSON.stringify({
        model: 'openai/gpt-4',
        messages: [
          { role: 'system', content: 'You are Infinity AI, a personal assistant.' },
          ...messages,
        ],
      }),
    });
    const data = await response.json();
    const result = data.choices?.[0]?.message?.content || 'Sorry, no response.';
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ result: 'Error contacting model API.' });
  }
}