import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Control, useController, UseControllerProps } from 'react-hook-form';
import { match } from 'ts-pattern';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import PasswordInput from './PasswordInput';
import RichTextEditor from './RichTextEditor';

export interface InputFieldProps extends UseControllerProps {
  label?: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  options?: { value: string; label: string }[];
  defaultPreview?: string;
  defaultPreviews?: string[];
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  min?: number;
  max?: number;
  readOnly?: boolean;
  helperText?: string;
  control?: Control<any>;
  futureDaysDisabled?: boolean;
}

export default function InputField({ ...props }: InputFieldProps) {
  const { field, fieldState } = useController(props);
  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <Label
          htmlFor={field.name}
          className={cn(
            'text-sm font-medium text-zinc-700',
            fieldState.error && 'text-destructive',
            props.labelClassName
          )}
        >
          {props.label} {props.required && <span className="text-red-500">*</span>}
        </Label>
      )}

      {match(props.type)
        // password
        .with('password', () => (
          <PasswordInput
            id={field.name}
            {...field}
            className={cn('', props.inputClassName)}
            placeholder={props.placeholder}
            hasError={!!fieldState.error}
          />
        ))

        // select box
        .with('select', () => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id={field.name} className={cn('w-full', props.inputClassName)}>
              <SelectValue placeholder={props.placeholder} />
            </SelectTrigger>
            <SelectContent position="popper">
              {props.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))

        // checkbox
        .with('checkbox', () => (
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              id={field.name}
              checked={!!field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              className="accent-primary size-4 rounded border-gray-300"
            />
            <span className="text-sm text-zinc-600">{props.placeholder}</span>
          </label>
        ))

        // rich text editor
        .with('richtext', () => (
          <RichTextEditor
            name={props.name}
            control={props.control}
            placeholder={props.placeholder}
            className={props.inputClassName}
          />
        ))

        // input field
        .with('text', 'email', 'tel', 'url', 'search', 'color', 'time', 'date', 'number', () => (
          <Input
            id={field.name}
            {...field}
            type={props.type}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            min={props.min}
            max={props.max}
            className={cn(
              '',
              fieldState.error &&
                'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
              props.inputClassName
            )}
          />
        ))

        // textarea
        .with('textarea', () => (
          <textarea
            id={field.name}
            {...field}
            rows={4}
            placeholder={props.placeholder}
            readOnly={props.readOnly}
            className={cn(
              'border-input bg-background placeholder:text-muted-foreground w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:outline-none',
              fieldState.error &&
                'border-destructive focus-visible:ring-destructive/20 focus-visible:border-destructive',
              props.inputClassName
            )}
          />
        ))

        // other
        .otherwise(() => null)}

      {fieldState.error && <p className="text-sm text-red-400">{fieldState.error.message}</p>}
    </div>
  );
}
