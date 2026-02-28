// Job Category Form Fields
export const jobCategoryFormFields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Category name', required: true },
  { name: 'slug', label: 'Slug', type: 'text', placeholder: 'category-slug', required: true },
  { name: 'icon_name', label: 'Icon Name (Lucide)', type: 'text', placeholder: 'e.g. Code, Briefcase' },
];

// Location Form Fields
export const locationFormFields = [
  { name: 'state', label: 'State', type: 'text', placeholder: 'State name', required: true },
  { name: 'country', label: 'Country', type: 'text', placeholder: 'Country name', required: true },
];

// Company Form Fields (location is a select, options populated dynamically)
export const companyFormFields = [
  { name: 'name', label: 'Company Name', type: 'text', placeholder: 'Company name', required: true },
  { name: 'image_url', label: 'Image URL', type: 'url', placeholder: 'https://...' },
  {
    name: 'location',
    label: 'Location',
    type: 'select',
    placeholder: 'Select location',
    required: true,
    options: [] as { value: string; label: string }[],
  },
];

// Job Type Form Fields
export const jobTypeFormFields = [
  { name: 'name', label: 'Name', type: 'text', placeholder: 'Job type name', required: true },
  { name: 'slug', label: 'Slug', type: 'text', placeholder: 'job-type-slug', required: true },
];

// Application Status Form Fields
export const applicationFormFields = [
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    placeholder: 'Select status',
    required: true,
    options: [
      { value: 'pending', label: 'Pending' },
      { value: 'reviewed', label: 'Reviewed' },
      { value: 'shortlisted', label: 'Shortlisted' },
      { value: 'rejected', label: 'Rejected' },
    ],
  },
];
