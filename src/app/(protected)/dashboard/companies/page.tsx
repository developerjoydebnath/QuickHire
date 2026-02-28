'use client';

import DataTable, { Column } from '@/components/dashboard/DataTable';
import FormDialog from '@/components/dashboard/FormDialog';
import InputField from '@/components/form/InputField';
import { companyFormFields } from '@/constants/adminFormFields';
import { axiosInstance } from '@/lib/axios';
import { fetcher } from '@/lib/fetcher';
import { generateQueryString } from '@/lib/queryString';
import { Company, LocationModel } from '@/models';
import { CompanyDto, companySchema } from '@/schema/admin.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import useSWR from 'swr';

const columns: Column<Company>[] = [
  { key: 'name', label: 'Name' },
  { key: 'image_url', label: 'Image URL' },
  {
    key: 'location',
    label: 'Location',
    render: (item) => (item.location ? `${item.location.state}, ${item.location.country}` : '—'),
  },
];

export default function CompaniesPage() {
  const [filters, setFilters] = useState({ search: '', page: '1', limit: '10' });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Company | null>(null);

  const queryString = generateQueryString(filters);
  const { data, isLoading, mutate } = useSWR(`/companies?${queryString}`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  const { data: locData } = useSWR('/locations?limit=100', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CompanyDto>({
    resolver: zodResolver(companySchema),
    defaultValues: { name: '', image_url: '', location: '' },
  });

  const locations: LocationModel[] = locData?.data?.map((d: any) => new LocationModel(d)) || [];
  const items = data?.data ? data.data.map((d: any) => new Company(d)) : [];
  const pagination = data?.pagination || { page: 1, pages: 1, total: 0 };

  // Dynamically build form fields with location options
  const formFields = useMemo(() => {
    return companyFormFields.map((field) => {
      if (field.name === 'location') {
        return {
          ...field,
          options: locations.map((loc) => ({
            value: loc.id!,
            label: `${loc.state}, ${loc.country}`,
          })),
        };
      }
      return field;
    });
  }, [locations]);

  const openCreate = () => {
    setEditing(null);
    reset({ name: '', image_url: '', location: '' });
    setDialogOpen(true);
  };

  const openEdit = (item: Company) => {
    setEditing(item);
    reset({ name: item.name, image_url: item.image_url, location: item.location?.id || '' });
    setDialogOpen(true);
  };

  const onSubmit = async (data: CompanyDto) => {
    try {
      if (editing?.id) {
        await axiosInstance.put(`/companies/${editing.id}`, data);
        toast.success('Company updated');
      } else {
        await axiosInstance.post('/companies', data);
        toast.success('Company created');
      }
      setDialogOpen(false);
      mutate();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    }
  };

  const handleDelete = async (item: Company) => {
    try {
      await axiosInstance.delete(`/companies/${item.id}`);
      toast.success('Company deleted');
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
        title="Companies"
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
        title={editing ? 'Edit Company' : 'New Company'}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit(onSubmit)}
      >
        {formFields.map((field) => (
          <InputField key={field.name} {...field} control={control} />
        ))}
      </FormDialog>
    </>
  );
}
