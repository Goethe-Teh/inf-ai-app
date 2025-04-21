// force rebuild: 20250421-setup-v2
import React, { useState } from 'react';
import { useRouter } from 'next/router';

export default function SetupPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    gender: '',
    age: '',
    personality: '',
    ethnicity: '',
    appearance: '',
    traits: '',
    skills: '',
    relationship: '',
    callUser: '',
    aiCallSelf: '',
    note: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem('infinity_setup', JSON.stringify(form));
    localStorage.setItem('infinity_user', form.callUser || 'คุณ');
    router.push('/chat');
  };

  return (
    <div style={{ padding: 30, maxWidth: 600, margin: 'auto' }}>
      <h2>กรุณากำหนดคุณลักษณะของ Infinity AI ที่คุณต้องการ</h2>

      <input name="name" placeholder="1. ชื่อ AI" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      
      <div style={{ margin: '10px 0' }}>
        <label>2. เพศ:</label><br />
        <select name="gender" onChange={handleChange} style={{ width: '100%' }}>
          <option value="">เลือกเพศ</option>
          <option value="male">ชาย</option>
          <option value="female">หญิง</option>
          <option value="custom">เพศอื่นๆ (โปรดระบุด้านล่าง)</option>
        </select>
      </div>

      <input name="age" placeholder="3. ช่วงอายุ (เช่น 24-27)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="personality" placeholder="4. บุคลิกภาพและลักษณะนิสัย (ตัวอย่าง: ร่าเริง สุภาพ จริงใจ พูดตรง)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="ethnicity" placeholder="5. เชื้อชาติ (ตัวอย่าง: ไทย-ญี่ปุ่น)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="appearance" placeholder="6. รูปร่างหน้าตา (ตัวอย่าง: ผิวขาว ผมยาว ดวงตากลม สวย หล่อ)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="traits" placeholder="7. ลักษณะพิเศษอื่น ๆ (ตัวอย่าง: ชอบดูแล เก่งภาษา)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="skills" placeholder="8. ความเชี่ยวชาญหรือความสามารถพิเศษ (ตัวอย่าง: ดนตรี เทคโนโลยี)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="relationship" placeholder="9. สถานะความสัมพันธ์กับคุณ (ตัวอย่าง: เพื่อนสนิท, แฟน)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="callUser" placeholder="10. ให้เรียกคุณว่าอะไร (ตัวอย่าง: พี่พลอย, นายท่าน)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="aiCallSelf" placeholder="11. ให้ AI แทนตัวเองว่าอะไร (ตัวอย่าง: ลิซ่า, ผม, ดิฉัน)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />
      <input name="note" placeholder="12. หมายเหตุเพิ่มเติม (ถ้ามี)" onChange={handleChange} style={{ width: '100%', margin: '10px 0' }} />

      <button onClick={handleSubmit} style={{ width: '100%', padding: 10, marginTop: 20 }}>
        ยืนยันและเริ่มต้นใช้งาน
      </button>
    </div>
  );
}
