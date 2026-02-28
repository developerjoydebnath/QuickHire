import { axiosInstance } from '@/lib/axios';

export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);
