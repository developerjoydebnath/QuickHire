'use client';

import DataTable, { Column } from '@/components/dashboard/DataTable';
import FormDialog from '@/components/dashboard/FormDialog';
import InputField from '@/components/form/InputField';
import { jobTypeFormFields } from '@/constants/adminFormFields';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import { generateQueryString } from '@/lib/queryString';
import { JobType } from '@/models';
import { JobTypeDto, jobTypeSchema } from '@/schema/admin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

const columns: Column<JobType>[] = [
  { key: 'name', label: 'Name' },
  { key: 'slug', label: 'Slug' },
];

export default function JobTypesPage() {
  const [filters, setFilters] = useState({ search: '', page: '1', limit: '10' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<JobType | null>(null);

  const queryString = generateQueryString(filters);
  const { data, isLoading, mutate } = useSWR(`/job-types?${queryString}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<JobTypeDto>({
    resolver: zodResolver(jobTypeSchema),
    defaultValues: { name: '', slug: '' },
  });

  const items = data?.data ? data.data.map((d: any) => new JobType(d)) : [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const openCreate = () => {
    setEditing(null);
    reset({ name: '', slug: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: JobType) => {
    setEditing(item);
    reset({ name: item.name, slug: item.slug });
    setDialogOpen(true);
  };

  const onSubmit = async (data: JobTypeDto) => {
    try {
      if (editing?.id) {
        await axiosInstance.put(`/job-types/${editing.id}`, data);
        toast.success('Job type updated');
      } else {
        await axiosInstance.post('/job-types', data);
        toast.success('Job type created');
      }
      setDialogOpen(false);
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (item: JobType) => {
    try {
      await axiosInstance.delete(`/job-types/${item.id}`);
      toast.success('Job type deleted');
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
        title="Job Types"
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
        title={editing ? 'Edit Job Type' : 'New Job Type'}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        {jobTypeFormFields.map((field) => (
          <InputField key={field.name} {...field} control={control} />
        ))}
      </FormDialog>
    </>
  );
}
