'use client';

import { postData } from '@/lib/fetcher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm as useRHForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import InputField from '@/components/form/InputField';
import { Button } from '@/components/ui/button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/store/authStore';

const applySchema = z.object({
  name: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  resume_link: z.string().url('Must be a valid URL'),
  cover_note: z.string().optional(),
  expected_salary: z.coerce.number().optional(),
  notice_period: z.coerce.number().optional(),
});

type ApplyFormValues = z.infer<typeof applySchema>;

interface JobApplyFormProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
  isLoading?: boolean;
}

export function JobApplyFormSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-12 w-32 rounded-md" />
    </div>
  );
}

const applyFormFields = [
  {
    name: 'name',
    label: 'Full Name *',
    placeholder: 'E.g. Maria Kelly',
    type: 'text',
  },
  {
    name: 'email',
    label: 'Email Address *',
    placeholder: 'maria@example.com',
    type: 'email',
  },
  {
    name: 'resume_link',
    label: 'Resume URL *',
    placeholder: 'https://linkedin.com/in/... or Google Drive link',
    type: 'url',
  },
  {
    name: 'cover_note',
    label: 'Cover Note',
    placeholder: 'Why are you a good fit for this position?',
    type: 'textarea',
  },
  {
    name: 'expected_salary',
    label: 'Expected Salary *',
    placeholder: 'E.g. 50000',
    type: 'number',
  },
  {
    name: 'notice_period',
    label: 'Notice Period (in days) *',
    placeholder: 'E.g. 30',
    type: 'number',
  },
];

export function JobApplyForm({ jobId, jobTitle, companyName, isLoading }: JobApplyFormProps) {
  const { user } = useAuthStore();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useRHForm<ApplyFormValues>({
    resolver: zodResolver(applySchema) as any,
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      resume_link: '',
      cover_note: '',
      expected_salary: 0,
      notice_period: 0,
    },
  });

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('email', user.email);
    }
  }, [user, setValue]);

  const onSubmit = async (data: ApplyFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await postData('/applications/apply', {
        ...data,
        job: jobId,
      });

      setOpen(false);
      reset();

      if (response.isNewUser && response.password) {
        toast.success(
          <div className="flex flex-col gap-1">
            <p className="font-bold">Application Submitted!</p>
            <p>We created an account for you so you can track your status.</p>
            <p className="rounded bg-slate-100 p-2 font-mono text-sm text-slate-800">Password: {response.password}</p>
            <p className="text-xs text-slate-500">Please save this password and login to view your profile.</p>
          </div>,
          { duration: 15000 } // keep it open longer since it has a password
        );
      } else {
        toast.success('Your application was submitted successfully!');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error?.message || 'Failed to submit application');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <JobApplyFormSkeleton />;
  }

  return (
    <div className="flex gap-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="lg" className="px-8 font-semibold">
            Apply Now
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-slate-900">Submit Application</DialogTitle>
            <DialogDescription className="text-slate-500">
              Apply for the <span className="font-semibold text-slate-800">{jobTitle}</span> role at {companyName}.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 py-4">
            {applyFormFields.map((field) => (
              <InputField key={field.name} {...field} control={control} />
            ))}

            <Button className="w-full" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
