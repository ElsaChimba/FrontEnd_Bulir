export async function login(email: string, password: string) {
  const res = await fetch('http://localhost:5000/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    throw new Error('Falha no login');
  }

  const data = await res.json(); 
  return data;
}
