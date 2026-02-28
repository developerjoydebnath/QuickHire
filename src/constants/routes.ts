export const ROUTES = {
  HOME: '/',
  FIND_JOB: '/jobs',
  BROWSE_COMPANIES: '#companies',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
  JOB_DETAILS: (id: string | number | null | undefined) => `/jobs/${id}`,
};
