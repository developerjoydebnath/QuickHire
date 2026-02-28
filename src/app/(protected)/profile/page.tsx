'use client';

import { useAuthStore } from '@/store/authStore';

export default function ProfilePage() {
  const { user } = useAuthStore();

  return (
    <div className="flex min-h-dvh items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-950">
      <div className="w-full max-w-lg space-y-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
          Welcome{user ? `, ${user.name}` : ''}! 👋
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          This is your profile page. We&apos;ll update this later with more features.
        </p>
        {user && (
          <div className="rounded-lg border border-gray-200 bg-white p-6 text-left shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">Your Info</h2>
            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-medium text-gray-900 dark:text-gray-200">Role:</span> {user.role}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
