'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export const logout = async () => {
  try {
    const cs = await cookies();
    const jwt = cs.get('jwt')?.value;
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const res = await axios.post(`${apiUrl}/auth/logout`, {}, { headers: { Authorization: `Bearer ${jwt}` } });
    cs.set('jwt', '', {
      httpOnly: false,
      secure: true,
      sameSite: 'lax',
      path: '/',
      expires: new Date(0),
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
