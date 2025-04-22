// force rebuild: 20250421-language-v2
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function LanguagePage() {
  const router = useRouter();
  const [language, setLanguage] = useState('');

  useEffect(() => {
    const setup = localStorage.getItem('infinity_setup');
    if (setup) {
      router.push('/chat');
    }
  }, []);

  const handleStart = () => {
    if (!language) {
      alert('Please select a language');
      return;
    }
    localStorage.setItem('infinity_language', language);
    router.push('/setup');
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
    <div style={{ padding: 30, maxWidth: 500, margin: 'auto' }}>
      <h2>Hello, welcome to Infinity AI</h2>
      <p>Please choose your language:</p>
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        style={{ width: '100%', padding: 10, marginTop: 10 }}
      >
        <option value="">-- Select Language --</option>
        {languages
          .sort((a, b) => a.label.localeCompare(b.label))
          .map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
      </select>
      <button
        onClick={handleStart}
        style={{ width: '100%', padding: 10, marginTop: 20 }}
      >
        Enter
      </button>
    </div>
  );
}
