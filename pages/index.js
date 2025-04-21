// force rebuild: 20250421-index-redirect
import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/language');
  }, []);

  return null;
}
