import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SetupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    gender: '',
    customGender: '',
    age: '',
    personality: '',
    ethnicity: '',
    appearance: '',
    traits: '',
    skills: '',
    relationship: '',
    callUser: '',
    aiCallSelf: '',
    note: '',
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = () => {
    const finalData = { ...form };
    if (form.gender === 'custom') {
      finalData.gender = form.customGender;
    }
    localStorage.setItem('infinity_setup', JSON.stringify(finalData));
    router.push('/chat');
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: 'auto' }}>
      <h2>กรุณากำหนดคุณลักษณะของ Infinity AI ที่คุณต้องการ</h2>

      <label>1. ชื่อของ Infinity AI</label>
      <input type="text" value={form.name} onChange={(e) => handleChange('name', e.target.value)} placeholder="เช่น ลิซ่า, ซายะ, เรน" style={{ width: '100%', marginBottom: 10 }} />

      <label>2. เพศ</label><br />
      <label><input type="radio" name="gender" value="ชาย" onChange={(e) => handleChange('gender', e.target.value)} /> ชาย</label><br />
      <label><input type="radio" name="gender" value="หญิง" onChange={(e) => handleChange('gender', e.target.value)} /> หญิง</label><br />
      <label><input type="radio" name="gender" value="custom" onChange={(e) => handleChange('gender', 'custom')} /> เพศอื่นๆ โปรดระบุ</label><br />
      {form.gender === 'custom' && (
        <input type="text" value={form.customGender} onChange={(e) => handleChange('customGender', e.target.value)} placeholder="เช่น วิญญาณ, สิ่งไม่มีเพศ" style={{ width: '100%', marginBottom: 10 }} />
      )}

      <label>3. ช่วงอายุ</label>
      <select value={form.age} onChange={(e) => handleChange('age', e.target.value)} style={{ width: '100%', marginBottom: 10 }}>
        <option value="">-- เลือกช่วงอายุ --</option>
        <option value="18-23">18–23</option>
        <option value="24-27">24–27</option>
        <option value="28-34">28–34</option>
        <option value="35-40">35–40</option>
        <option value="41-50">41–50</option>
        <option value="51-60">51–60</option>
        <option value="61-70">61–70</option>
        <option value="71-80">71–80</option>
      </select>

      <label>4. บุคลิกภาพ (ตัวอย่าง: ร่าเริง ขี้เล่น สุขุม)</label>
      <input type="text" value={form.personality} onChange={(e) => handleChange('personality', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>5. เชื้อชาติ (ตัวอย่าง: ไทย ญี่ปุ่น ยุโรป)</label>
      <input type="text" value={form.ethnicity} onChange={(e) => handleChange('ethnicity', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>6. ลักษณะรูปร่างหน้าตา (ตัวอย่าง: ผิวขาว ตาสีเทา ผมยาว หุ่นเพรียว)</label>
      <input type="text" value={form.appearance} onChange={(e) => handleChange('appearance', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>7. ลักษณะนิสัย (ตัวอย่าง: ซื่อสัตย์ นุ่มนวล ขี้เล่น)</label>
      <input type="text" value={form.traits} onChange={(e) => handleChange('traits', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>8. ความเชี่ยวชาญหรือความสามารถพิเศษ</label>
      <input type="text" value={form.skills} onChange={(e) => handleChange('skills', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>9. สถานะความสัมพันธ์ระหว่าง Infinity AI กับคุณ</label>
      <input type="text" value={form.relationship} onChange={(e) => handleChange('relationship', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>10. ชื่อที่คุณอยากให้ Infinity AI เรียกคุณ</label>
      <input type="text" value={form.callUser} onChange={(e) => handleChange('callUser', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>11. คำที่ Infinity AI ใช้แทนตัวเอง</label>
      <input type="text" value={form.aiCallSelf} onChange={(e) => handleChange('aiCallSelf', e.target.value)} style={{ width: '100%', marginBottom: 10 }} />

      <label>12. หมายเหตุเพิ่มเติม</label>
      <input type="text" value={form.note} onChange={(e) => handleChange('note', e.target.value)} style={{ width: '100%', marginBottom: 20 }} />

      <button onClick={handleSubmit} style={{ width: '100%', padding: 12 }}>เริ่มต้นใช้งาน Infinity AI</button>
    </div>
  );
}
