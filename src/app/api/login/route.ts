import { cookies } from 'next/headers';

export async function POST(req: Request) {
  const body = await req.json();
  const cookieStore = await cookies();

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  if (!res.ok) {
    return new Response(JSON.stringify(data), { status: 401 });
  }

  cookieStore.set('jwt', data.token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
  });

  return new Response(JSON.stringify({ success: true }));
}
