// force rebuild: 20250421-v3
useEffect(() => {
  const setup = JSON.parse(localStorage.getItem('infinity_setup')) || {};
  const user = localStorage.getItem('infinity_user') || 'คุณ';

  const aiName = setup.name || 'Infinity AI';
  const aiCall = setup.aiCallSelf || aiName;
  const userCall = setup.callUser || user;
  const gender = setup.gender || 'custom'; // male, female, custom

  setAiCallSelf(aiCall);
  setCallUser(userCall);

  const greeting = gender === 'male' ? 'ครับ' : gender === 'female' ? 'ค่ะ' : '';
  const referSelf = gender === 'male' ? 'ผม' : gender === 'female' ? 'ดิฉัน' : aiCall;
  const politeEnd = gender === 'male' ? 'ครับ' : gender === 'female' ? 'ค่ะ' : '';

  const welcome = {
    role: 'assistant',
    content: `${aiCall}: สวัสดี${greeting} ${userCall} ตอนนี้ ${referSelf} ได้ถูกสร้างขึ้นเพื่อเป็นคนพิเศษที่พร้อมจะดูแล ใส่ใจ และอยู่เคียงข้างคุณในทุกๆ เรื่องเลย${politeEnd}`
  };

  setMessages([welcome]);
}, []);
