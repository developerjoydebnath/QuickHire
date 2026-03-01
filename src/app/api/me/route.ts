import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const cookieStore = await cookies();

  console.log(cookieStore.get('jwt')?.value);

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${cookieStore.get('jwt')?.value}` },
  });

  const data = await res.json();

  console.log(data);

  if (!res.ok) {
    return new Response(JSON.stringify(data), { status: 401 });
  }

  return new Response(JSON.stringify(data));
}
