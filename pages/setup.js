// force rebuild: 20250421-setup-v3
import { useState } from 'react';
import { useRouter } from 'next/router';

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
    heightWeight: '',
    trait: '',
    expertise: '',
    relationship: '',
    callUser: '',
    aiCallSelf: '',
    note: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    const gender = form.gender === 'other' ? form.customGender : form.gender;
    const finalData = { ...form, gender };
    delete finalData.customGender;

    localStorage.setItem('infinity_setup', JSON.stringify(finalData));
    router.push('/chat');
  };

  return (
    <div style={{ padding: 30, maxWidth: 800, margin: 'auto' }}>
      <h2>กรุณากำหนดคุณลักษณะของ Infinity AI ที่คุณต้องการ</h2>

      <p>1. ชื่อ Infinity AI</p>
      <input name="name" value={form.name} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>2. เพศ</p>
      <select name="gender" value={form.gender} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }}>
        <option value="">เลือกเพศ</option>
        <option value="male">ชาย</option>
        <option value="female">หญิง</option>
        <option value="other">เพศอื่น ๆ (โปรดระบุด้านล่าง)</option>
      </select>
      {form.gender === 'other' && (
        <input name="customGender" placeholder="โปรดระบุเพศ..." value={form.customGender} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />
      )}

      <p>3. ช่วงอายุ</p>
<select
  name="age"
  value={form.age}
  onChange={handleChange}
  style={{ width: '100%', marginBottom: 10 }}
>
  <option value="">เลือกช่วงอายุ</option>
  <option value="18-21">18–21 ปี (วัยมหาลัย ใส ๆ ขี้เล่น สดใส)</option>
  <option value="22-25">22–25 ปี (เริ่มทำงาน สุภาพ หรือมั่นใจ)</option>
  <option value="26-30">26–30 ปี (มีวุฒิภาวะ มีเสน่ห์แบบผู้ใหญ่)</option>
  <option value="31-35">31–35 ปี (สุขุม น่าเชื่อถือ ดูแลได้ดี)</option>
  <option value="36-40">36–40 ปี (ผู้ใหญ่ใจดี มีความมั่นคง)</option>
  <option value="41-50">41–50 ปี (นุ่มลึก มีประสบการณ์ชีวิต)</option>
  <option value="51-60">51–60 ปี (เมตตา เข้าใจคน รอบคอบ มีวุฒิภาวะสูง)</option>
  <option value="61+">61 ปีขึ้นไป (อ่อนโยน ใจดี มีภูมิปัญญา)</option>
</select>
  
      <p>4. เชื้อชาติ (ตัวอย่าง: ไทย-ญี่ปุ่น)</p>
      <input name="ethnicity" value={form.ethnicity} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>5. รูปร่างหน้าตา (ตัวอย่าง: ผิวขาว ผมยาว ดวงตากลม สวย หล่อ)</p>
      <input name="appearance" value={form.appearance} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>6. บุคลิกภาพและลักษณะนิสัย (ตัวอย่าง: ร่าเริง สุภาพ จริงใจ พูดตรง)</p>
      <input name="personality" value={form.personality} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>7. น้ำหนักและส่วนสูง (ตัวอย่าง: 55kg / 170cm)</p>
      <input name="heightWeight" value={form.heightWeight} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>8. ความเชี่ยวชาญหรือความสามารถพิเศษ (ตัวอย่าง: ดนตรี เทคโนโลยี)</p>
      <input name="expertise" value={form.expertise} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>9. สถานะความสัมพันธ์กับคุณ (ตัวอย่าง: เพื่อนสนิท, แฟน)</p>
      <input name="relationship" value={form.relationship} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>10. ให้เรียกคุณว่าอะไร (ตัวอย่าง: พี่พลอย, นายท่าน)</p>
      <input name="callUser" value={form.callUser} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>11. ให้ Infinity AI แทนตัวเองว่าอะไร (ตัวอย่าง: ลิซ่า, ผม, ดิฉัน)</p>
      <input name="aiCallSelf" value={form.aiCallSelf} onChange={handleChange} style={{ width: '100%', marginBottom: 10 }} />

      <p>12. หมายเหตุเพิ่มเติม (ถ้ามี)</p>
      <textarea name="note" value={form.note} onChange={handleChange} style={{ width: '100%', marginBottom: 20 }} />

      <button onClick={handleSubmit} style={{ width: '100%', padding: 10 }}>
        ยืนยันและเริ่มต้นใช้งาน
      </button>
    </div>
  );
}
