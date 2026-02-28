'use client';

import DataTable, { Column } from '@/components/dashboard/DataTable';
import FormDialog from '@/components/dashboard/FormDialog';
import InputField from '@/components/form/InputField';
import MultiSelect from '@/components/form/MultiSelect';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import { generateQueryString } from '@/lib/queryString';
import { Company, Job, JobCategory, JobType, LocationModel } from '@/models';
import { JobDto, jobSchema } from '@/schema/admin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

const columns: Column<Job>[] = [
  { key: 'title', label: 'Title' },
  { key: 'company', label: 'Company', render: (item) => item.company?.name || '—' },
  {
    key: 'location',
    label: 'Location',
    render: (item) => (item.location ? `${item.location.state}, ${item.location.country}` : '—'),
  },
  { key: 'job_type', label: 'Type', render: (item) => item.job_type?.name || '—' },
  { key: 'salary_range', label: 'Salary' },
  {
    key: 'deadline',
    label: 'Deadline',
    render: (item) => (item.deadline ? new Date(item.deadline).toLocaleDateString() : '—'),
  },
];

export default function JobsPage() {
  const [filters, setFilters] = useState({ search: '', page: '1', limit: '10' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Job | null>(null);

  const swrOptions = { revalidateOnFocus: false, revalidateOnReconnect: false };
  const queryString = generateQueryString(filters);
  const { data, isLoading, mutate } = useSWR(`/jobs?${queryString}`, fetcher, swrOptions);
  const { data: catData } = useSWR('/job-categories?limit=100', fetcher, swrOptions);
  const { data: locData } = useSWR('/locations?limit=100', fetcher, swrOptions);
  const { data: compData } = useSWR('/companies?limit=100', fetcher, swrOptions);
  const { data: jtData } = useSWR('/job-types?limit=100', fetcher, swrOptions);

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<JobDto>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: '',
      description: '',
      categories: [],
      location: '',
      company: '',
      salary_range: '',
      job_type: '',
      deadline: '',
      isFeatured: false,
    },
  });

  const categories: JobCategory[] = catData?.data?.map((d: any) => new JobCategory(d)) || [];
  const locations: LocationModel[] = locData?.data?.map((d: any) => new LocationModel(d)) || [];
  const companies: Company[] = compData?.data?.map((d: any) => new Company(d)) || [];
  const jobTypes: JobType[] = jtData?.data?.map((d: any) => new JobType(d)) || [];

  const items = data?.data ? data.data.map((d: any) => new Job(d)) : [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const categoryOptions = useMemo(() => categories.map((c) => ({ value: c.id!, label: c.name })), [categories]);

  // Build form fields dynamically with options
  const formFields = useMemo(
    () => [
      { name: 'title', label: 'Title', type: 'text', placeholder: 'Job title', required: true },
      {
        name: 'description',
        label: 'Description',
        type: 'richtext',
        placeholder: 'Job description...',
        required: true,
      },
      {
        name: 'location',
        label: 'Location',
        type: 'select',
        placeholder: 'Select location',
        required: true,
        options: locations.map((l) => ({ value: l.id!, label: `${l.state}, ${l.country}` })),
      },
      {
        name: 'company',
        label: 'Company',
        type: 'select',
        placeholder: 'Select company',
        required: true,
        options: companies.map((c) => ({ value: c.id!, label: c.name })),
      },
      {
        name: 'job_type',
        label: 'Job Type',
        type: 'select',
        placeholder: 'Select job type',
        required: true,
        options: jobTypes.map((jt) => ({ value: jt.id!, label: jt.name })),
      },
      { name: 'salary_range', label: 'Salary Range', type: 'text', placeholder: 'e.g. $50k - $80k' },
      { name: 'deadline', label: 'Deadline', type: 'date', placeholder: '', required: true },
      { name: 'isFeatured', label: 'Featured', type: 'checkbox', placeholder: 'Mark this job as featured' },
    ],
    [locations, companies, jobTypes]
  );

  const openCreate = () => {
    setEditing(null);
    reset({
      title: '',
      description: '',
      categories: [],
      location: '',
      company: '',
      salary_range: '',
      job_type: '',
      deadline: '',
      isFeatured: false,
    });
    setDialogOpen(true);
  };

  const openEdit = (item: Job) => {
    setEditing(item);
    reset({
      title: item.title,
      description: item.description,
      categories: item.categories.map((c) => c.id!),
      location: item.location?.id || '',
      company: item.company?.id || '',
      salary_range: item.salary_range,
      job_type: item.job_type?.id || '',
      deadline: item.deadline ? item.deadline.substring(0, 10) : '',
      isFeatured: item.isFeatured,
    });
    setDialogOpen(true);
  };

  const onSubmit = async (data: JobDto) => {
    try {
      if (editing?.id) {
        await axiosInstance.put(`/jobs/${editing.id}`, data);
        toast.success('Job updated');
      } else {
        await axiosInstance.post('/jobs', data);
        toast.success('Job created');
      }
      setDialogOpen(false);
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (item: Job) => {
    try {
      await axiosInstance.delete(`/jobs/${item.id}`);
      toast.success('Job deleted');
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleSearch = useCallback((value: string) => {
    setFilters((prev) => ({ ...prev, search: value, page: '1' }));
  }, []);

  return (
    <>
      <DataTable
        title="Jobs"
        columns={columns}
        data={items}
        isLoading={isLoading}
        pagination={pagination}
        search={filters.search}
        onSearchChange={handleSearch}
        onPageChange={(p) => setFilters((prev) => ({ ...prev, page: String(p) }))}
        onEdit={openEdit}
        onDelete={handleDelete}
        onCreate={openCreate}
        getId={(item) => item.id!}
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={editing ? 'Edit Job' : 'New Job'}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields.map((field) => (
          <InputField key={field.name} {...field} control={control} />
        ))}
        <MultiSelect
          name="categories"
          control={control}
          label="Categories"
          options={categoryOptions}
          placeholder="Select categories"
        />
      </FormDialog>
    </>
  );
}
