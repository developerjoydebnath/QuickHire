import { axiosInstance } from '@/lib/axios';

export const fetcher = (url: string) => axiosInstance.get(url).then((res) => res.data);

export const postData = async (url: string, data: any) => {
  const response = await axiosInstance.post(url, data);
  return response.data;
};
