'use client';

import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { useState } from 'react';
import { Control, useController, UseControllerProps } from 'react-hook-form';

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectProps extends UseControllerProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: MultiSelectOption[];
  className?: string;
  control?: Control<any>;
}

export default function MultiSelect({ label, placeholder, required, options, className, ...props }: MultiSelectProps) {
  const { field, fieldState } = useController(props);
  const [open, setOpen] = useState(false);

  const selected: string[] = field.value || [];

  const handleSelect = (value: string) => {
    const updated = selected.includes(value) ? selected.filter((v) => v !== value) : [...selected, value];
    field.onChange(updated);
  };

  const handleRemove = (value: string) => {
    field.onChange(selected.filter((v) => v !== value));
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label className={cn('text-sm font-medium text-zinc-700', fieldState.error && 'text-destructive')}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            role="combobox"
            aria-expanded={open}
            className={cn(
              'border-input flex min-h-10 w-full items-center justify-between rounded-md border bg-transparent px-3 py-2 text-sm',
              fieldState.error &&
                'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive'
            )}
          >
            <span className="text-muted-foreground truncate">
              {selected.length > 0 ? `${selected.length} selected` : placeholder || 'Select items...'}
            </span>
            <ChevronsUpDown className="ml-2 size-4 shrink-0 opacity-50" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem key={option.value} value={option.label} onSelect={() => handleSelect(option.value)}>
                    <Check
                      className={cn('mr-2 size-4', selected.includes(option.value) ? 'opacity-100' : 'opacity-0')}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {/* Selected badges */}
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((val) => {
            const option = options.find((o) => o.value === val);
            return (
              <Badge key={val} variant="secondary" className="gap-1 pr-1">
                {option?.label || val}
                <button type="button" onClick={() => handleRemove(val)} className="hover:bg-muted rounded-full p-0.5">
                  <X size={12} />
                </button>
              </Badge>
            );
          })}
        </div>
      )}

      {fieldState.error && <p className="text-sm text-red-400">{fieldState.error.message}</p>}
    </div>
  );
}
