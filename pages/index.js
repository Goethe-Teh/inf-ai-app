// force rebuild: clean-setup
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [language, setLanguage] = useState('');

  const handleStart = () => {
    if (!language) return alert('Please select a language');
    router.push(`/chat?language=${language}`);
  };

  const languages = [
    { code: 'ar', label: 'العربية (Arabic)' },
    { code: 'zh', label: '中文 (Chinese)' },
    { code: 'en', label: 'English' },
    { code: 'tl', label: 'Filipino (Tagalog)' },
    { code: 'fr', label: 'Français (French)' },
    { code: 'de', label: 'Deutsch (German)' },
    { code: 'hi', label: 'हिंदी (Hindi)' },
    { code: 'id', label: 'Bahasa Indonesia' },
    { code: 'it', label: 'Italiano (Italian)' },
    { code: 'ja', label: '日本語 (Japanese)' },
    { code: 'ko', label: '한국어 (Korean)' },
    { code: 'ms', label: 'Bahasa Melayu' },
    { code: 'pt', label: 'Português (Portuguese)' },
    { code: 'ru', label: 'Русский (Russian)' },
    { code: 'th', label: 'ไทย (Thai)' },
    { code: 'vi', label: 'Tiếng Việt (Vietnamese)' },
    { code: 'es', label: 'Español (Spanish)' }
  ];

  return (
    <div style={{ padding: 30 }}>
      <h2>Hello, welcome to Infinity AI</h2>
      <h4>Please select your LANGUAGE:</h4>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="">-- Select Language --</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>{lang.label}</option>
        ))}
      </select>
      <br /><br />
      <button onClick={handleStart}>Start</button>
    </div>
  );
}