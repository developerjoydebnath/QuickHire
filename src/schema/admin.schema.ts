import z from 'zod';

// Job Category
export const jobCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  icon_name: z.string().optional(),
});
export type JobCategoryDto = z.infer<typeof jobCategorySchema>;

// Location
export const locationSchema = z.object({
  state: z.string().min(1, 'State is required'),
  country: z.string().min(1, 'Country is required'),
});
export type LocationDto = z.infer<typeof locationSchema>;

// Company
export const companySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  image_url: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
});
export type CompanyDto = z.infer<typeof companySchema>;

// Job Type
export const jobTypeSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
});
export type JobTypeDto = z.infer<typeof jobTypeSchema>;

// Job
export const jobSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  location: z.string().min(1, 'Location is required'),
  company: z.string().min(1, 'Company is required'),
  salary_range: z.string().optional(),
  job_type: z.string().min(1, 'Job type is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  isFeatured: z.boolean().optional(),
});
export type JobDto = z.infer<typeof jobSchema>;

// Application (admin edit - only status)
export const applicationSchema = z.object({
  status: z.string().min(1, 'Status is required'),
});
export type ApplicationDto = z.infer<typeof applicationSchema>;
