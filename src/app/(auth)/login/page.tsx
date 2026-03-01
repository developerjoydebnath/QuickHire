'use client';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';
import { loginFormFields } from '@/constants/authFormFIelds';
import { ROUTES } from '@/constants/routes';
import { LoginDto, loginSchema } from '@/schema/auth.schema';
import { useAuthStore } from '@/store/authStore';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<LoginDto>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginDto) => {
    try {
      const res = await axios.post('/api/login', data);

      if (res.status === 200) {
        setUser(res.data);
        toast.success('Logged in successfully');
        const redirectTo = res.data.role === 'admin' ? '/dashboard' : '/profile';
        router.push(redirectTo);
      } else {
        toast.error(res.data.message || 'Something went wrong');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center">
          <Link prefetch={false} href={ROUTES.HOME} className="flex items-center gap-2">
            <Image
              src="/images/Logo.png"
              alt="QuickHire"
              width={200}
              height={100}
              className="h-9 w-[152px] min-w-[152px]"
            />
            <h3 className="sr-only text-xl font-bold">QuichHire</h3>
          </Link>
        </div>
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              href="/signup"
              className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-500 dark:hover:text-emerald-400"
            >
              create a new account
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {loginFormFields.map((field) => (
            <InputField key={field.name} {...field} control={control} />
          ))}

          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Sign in'}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="mt-4 w-full"
            onClick={() => {
              setValue('email', 'admin@example.com');
              setValue('password', 'password');
            }}
          >
            Auto-fill Admin Credentials
          </Button>
        </form>
      </div>
    </div>
  );
}
