import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const setup = localStorage.getItem('infinity_setup');
    const user = localStorage.getItem('infinity_user');
    if (setup && user) {
      router.push('/chat'); // ไปหน้าแชทเลยถ้าเคยตั้งไว้แล้ว
    } else {
      router.push('/language'); // ถ้ายังใหม่ ให้เริ่มเลือกภาษา
    }
  }, []);

  return null;
}
