'use client';

import DataTable, { Column } from '@/components/dashboard/DataTable';
import FormDialog from '@/components/dashboard/FormDialog';
import InputField from '@/components/form/InputField';
import { jobCategoryFormFields } from '@/constants/adminFormFields';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import { generateQueryString } from '@/lib/queryString';
import { JobCategory } from '@/models';
import { JobCategoryDto, jobCategorySchema } from '@/schema/admin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

const columns: Column<JobCategory>[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
  { key: 'icon_name', label: 'Icon Name' },
];

export default function JobCategoriesPage() {
  const [filters, setFilters] = useState({ search: '', page: '1', limit: '10' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<JobCategory | null>(null);

  const queryString = generateQueryString(filters);
  const { data, isLoading, mutate } = useSWR(`/job-categories?${queryString}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<JobCategoryDto>({
    resolver: zodResolver(jobCategorySchema),
    defaultValues: { name: '', slug: '', icon_name: '' },
  });

  const items = data?.data ? data.data.map((d: any) => new JobCategory(d)) : [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const openCreate = () => {
    setEditing(null);
    reset({ name: '', slug: '', icon_name: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: JobCategory) => {
    setEditing(item);
    reset({ name: item.name, slug: item.slug, icon_name: item.icon_name });
    setDialogOpen(true);
  };

  const onSubmit = async (data: JobCategoryDto) => {
    try {
      if (editing?.id) {
        await axiosInstance.put(`/job-categories/${editing.id}`, data);
        toast.success('Category updated');
      } else {
        await axiosInstance.post('/job-categories', data);
        toast.success('Category created');
      }
      setDialogOpen(false);
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (item: JobCategory) => {
    try {
      await axiosInstance.delete(`/job-categories/${item.id}`);
      toast.success('Category deleted');
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
        title="Job Categories"
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
        title={editing ? 'Edit Category' : 'New Category'}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        {jobCategoryFormFields.map((field) => (
          <InputField key={field.name} {...field} control={control} />
        ))}
      </FormDialog>
    </>
  );
}
