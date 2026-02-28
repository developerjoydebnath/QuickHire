'use client';

import DataTable, { Column } from '@/components/dashboard/DataTable';
import FormDialog from '@/components/dashboard/FormDialog';
import InputField from '@/components/form/InputField';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { applicationFormFields } from '@/constants/adminFormFields';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import { generateQueryString } from '@/lib/queryString';
import { Application } from '@/models';
import { ApplicationDto, applicationSchema } from '@/schema/admin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

const STATUS_OPTIONS = ['pending', 'reviewed', 'shortlisted', 'rejected'];

const columns: Column<Application>[] = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'job', label: 'Job', render: (item) => item.job?.title || '—' },
  {
    key: 'status',
    label: 'Status',
    render: (item) => (
      <span
        className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
          item.status === 'shortlisted'
            ? 'bg-green-50 text-green-700'
            : item.status === 'rejected'
              ? 'bg-red-50 text-red-700'
              : item.status === 'reviewed'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-yellow-50 text-yellow-700'
        }`}
      >
        {item.status}
      </span>
    ),
  },
  { key: 'expected_salary', label: 'Expected Salary' },
  { key: 'notice_period', label: 'Notice Period' },
];

export default function ApplicationsPage() {
  const [filters, setFilters] = useState({ search: '', page: '1', limit: '10', status: '' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Application | null>(null);

  const queryString = generateQueryString(filters);
  const { data, isLoading, mutate } = useSWR(`/applications?${queryString}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<ApplicationDto>({
    resolver: zodResolver(applicationSchema),
    defaultValues: { status: 'pending' },
  });

  const items = data?.data ? data.data.map((d: any) => new Application(d)) : [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const openCreate = () => {
    toast.error('Applications are created by users, not admins');
  };

  const openEdit = (item: Application) => {
    setEditing(item);
    reset({ status: item.status });
    setDialogOpen(true);
  };

  const onSubmit = async (data: ApplicationDto) => {
    try {
      if (editing?.id) {
        await axiosInstance.put(`/applications/${editing.id}`, data);
        toast.success('Application updated');
      }
      setDialogOpen(false);
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (item: Application) => {
    try {
      await axiosInstance.delete(`/applications/${item.id}`);
      toast.success('Application deleted');
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
      {/* Status filter */}
      <div className="mb-4 flex items-center gap-3">
        <Label>Filter by status:</Label>
        <Select
          value={filters.status}
          onValueChange={(v) => setFilters((prev) => ({ ...prev, status: v === 'all' ? '' : v, page: '1' }))}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {STATUS_OPTIONS.map((s) => (
              <SelectItem key={s} value={s} className="capitalize">
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DataTable
        title="Applications"
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
        title="Update Application Status"
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        {editing && (
          <div className="text-muted-foreground mb-2 space-y-1 text-sm">
            <p>
              <strong>Applicant:</strong> {editing.name} ({editing.email})
            </p>
            <p>
              <strong>Job:</strong> {editing.job?.title || '—'}
            </p>
          </div>
        )}
        {applicationFormFields.map((field) => (
          <InputField key={field.name} {...field} control={control} />
        ))}
      </FormDialog>
    </>
  );
}
