# Fix API Auth Flow

The problem is that `app/api/login/route.ts` sets the `jwt` token as an `httpOnly: true` cookie on the Next.js domain. However, the frontend `axiosInstance` directly queries the external backend API (`NEXT_PUBLIC_API_URL=https://quick-hire-backend-taupe.vercel.app/api`). The browser does not send the Next.js `httpOnly` cookie to the external backend due to cross-origin limitations and domain mismatch, causing all protected requests (like `/auth/me`) to return 401 Unauthorized, sending the user into a redirect loop back to `/login`.

Furthermore, Next.js middleware is currently placed in `src/proxy.ts` instead of `src/middleware.ts`, meaning page-level route protection is not even running.

## Proposed Changes

### 1. `src/lib/axios.ts`

- Import `js-cookie`.
- Add a request interceptor to `axiosInstance` to read the `jwt` cookie and inject it into `config.headers.Authorization = `Bearer ${token}`. This ensures the backend receives the token.

### 2. `src/app/api/login/route.ts`

- Change the `jwt` cookie to `httpOnly: false` so that the frontend's `js-cookie` can read it for the Axios request interceptor.
- Return the full `data` (including the user object) from the backend so that `setUser(res.data)` in `login/page.tsx` correctly populates the user role, enabling role-based redirects.

### 3. `src/app/(auth)/login/page.tsx`

- Ensure that `res.data` is correctly passed to `setUser` and that the `redirectTo` logic gets `res.data.user.role` or `res.data.role` (depending on the backend payload structure).

### 4. `src/middleware.ts`

- Rename `src/proxy.ts` to `src/middleware.ts` and change the exported function name to `middleware`. Update the matchers to ensure it only applies to dashboard, profile, and auth routes.

## Verification Plan

### Manual Verification

1. I will use the browser tool to run `npm run dev`.
2. I will navigate to `/login` and attempt to log in.
3. Observe if the redirect to `/profile` happens successfully without a 401 redirect loop.
4. Verify that `/auth/me` and `/applications/my-applications` load successfully with the Bearer token attached.
