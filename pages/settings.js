import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SettingsPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [setupData, setSetupData] = useState({});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('infinity_user') || '');
    setSetupData(JSON.parse(localStorage.getItem('infinity_setup')) || {});
    setPasscode(localStorage.getItem('infinity_passcode') || '');
  }, []);

  const handleSaveAccount = () => {
    const storedPass = localStorage.getItem('infinity_pass');
    if (oldPassword !== storedPass) {
      setError('รหัสผ่านเดิมไม่ถูกต้อง');
      return;
    }
    if (newUsername) localStorage.setItem('infinity_user', newUsername);
    if (newPassword) localStorage.setItem('infinity_pass', newPassword);
    setSuccess('บันทึกข้อมูลสำเร็จ');
    setError('');
  };

  const handleSavePasscode = () => {
    if (passcode.length < 4 || passcode.length > 6) {
      setError('รหัสต้องมีความยาว 4 ถึง 6 ตัว');
      return;
    }
    localStorage.setItem('infinity_passcode', passcode);
    setSuccess('ตั้งรหัสผ่านเข้าห้องแชทเรียบร้อย');
    setError('');
  };

  const handleBack = () => {
    router.push('/chat');
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: 'auto' }}>
      <h2>ตั้งค่า Infinity AI</h2>

      <h4>เปลี่ยนชื่อผู้ใช้ / รหัสผ่าน</h4>
      <input placeholder="ชื่อผู้ใช้ใหม่" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <input type="password" placeholder="รหัสผ่านเดิม" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <input type="password" placeholder="รหัสผ่านใหม่" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <button onClick={handleSaveAccount} style={{ width: '100%', padding: 10, marginBottom: 20 }}>บันทึกการเปลี่ยนแปลง</button>

      <h4>ตั้งรหัสผ่านก่อนเข้าห้องแชท (4-6 ตัว)</h4>
      <input placeholder="ใส่รหัสผ่าน (เช่น 1234)" value={passcode} onChange={(e) => setPasscode(e.target.value)} style={{ width: '100%', marginBottom: 10 }} />
      <button onClick={handleSavePasscode} style={{ width: '100%', padding: 10, marginBottom: 20 }}>ตั้งรหัสผ่าน</button>

      <h4>แก้ไขข้อมูล AI ที่คุณตั้งไว้</h4>
      <pre style={{ background: '#f5f5f5', padding: 10 }}>
        {JSON.stringify(setupData, null, 2)}
      </pre>

      <button onClick={handleBack} style={{ width: '100%', padding: 10, backgroundColor: '#eee' }}>กลับสู่ห้อง Infinity Chat</button>

      {error && <p style={{ color: 'red', marginTop: 10 }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: 10 }}>{success}</p>}
    </div>
  );
}
