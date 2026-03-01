'use server';

import axios from 'axios';
import { cookies } from 'next/headers';

export const logout = async () => {
  try {
    const cs = await cookies();
    const jwt = cs.get('jwt')?.value;
    const res = await axios.post('/auth/logout', {}, { headers: { Authorization: `Bearer ${jwt}` } });
    cs.delete('jwt');
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
