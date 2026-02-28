'use client';

import DataTable, { Column } from '@/components/dashboard/DataTable';
import FormDialog from '@/components/dashboard/FormDialog';
import InputField from '@/components/form/InputField';
import { locationFormFields } from '@/constants/adminFormFields';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import { generateQueryString } from '@/lib/queryString';
import { LocationModel } from '@/models';
import { LocationDto, locationSchema } from '@/schema/admin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

const columns: Column<LocationModel>[] = [
  { key: 'state', label: 'State' },
  { key: 'country', label: 'Country' },
];

export default function LocationsPage() {
  const [filters, setFilters] = useState({ search: '', page: '1', limit: '10' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<LocationModel | null>(null);

  const queryString = generateQueryString(filters);
  const { data, isLoading, mutate } = useSWR(`/locations?${queryString}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<LocationDto>({
    resolver: zodResolver(locationSchema),
    defaultValues: { state: '', country: '' },
  });

  const items = data?.data ? data.data.map((d: any) => new LocationModel(d)) : [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  const openCreate = () => {
    setEditing(null);
    reset({ state: '', country: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: LocationModel) => {
    setEditing(item);
    reset({ state: item.state, country: item.country });
    setDialogOpen(true);
  };

  const onSubmit = async (data: LocationDto) => {
    try {
      if (editing?.id) {
        await axiosInstance.put(`/locations/${editing.id}`, data);
        toast.success('Location updated');
      } else {
        await axiosInstance.post('/locations', data);
        toast.success('Location created');
      }
      setDialogOpen(false);
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (item: LocationModel) => {
    try {
      await axiosInstance.delete(`/locations/${item.id}`);
      toast.success('Location deleted');
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
        title="Locations"
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
        title={editing ? 'Edit Location' : 'New Location'}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        {locationFormFields.map((field) => (
          <InputField key={field.name} {...field} control={control} />
        ))}
      </FormDialog>
    </>
  );
}
