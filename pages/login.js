import { useState } from 'react';
import { useRouter } from 'next/router';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!username || !password) {
      setError('กรุณากรอกชื่อผู้ใช้และรหัสผ่าน');
      return;
    }

    const storedUser = localStorage.getItem('infinity_user');
    const storedPass = localStorage.getItem('infinity_pass');

    if (storedUser && storedPass) {
      if (username === storedUser && password === storedPass) {
        router.push('/language');
      } else {
        setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      }
    } else {
      // สมัครใหม่
      localStorage.setItem('infinity_user', username);
      localStorage.setItem('infinity_pass', password);
      router.push('/language');
    }
  };

  return (
    <div style={{ padding: 30, maxWidth: 400, margin: 'auto' }}>
      <h2>เข้าสู่ระบบ Infinity AI</h2>
      <input
        type="text"
        placeholder="ชื่อผู้ใช้"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <input
        type="password"
        placeholder="รหัสผ่าน"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: '100%', padding: 10, marginBottom: 10 }}
      />
      <button onClick={handleLogin} style={{ width: '100%', padding: 10 }}>
        เข้าสู่ระบบ / สมัครใหม่
      </button>
      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
    </div>
  );
}
