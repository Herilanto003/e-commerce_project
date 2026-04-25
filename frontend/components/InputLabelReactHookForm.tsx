import { Field, FieldLabel, FieldError } from "./ui/field";
import { Input } from "./ui/input";
import type { UserRegisterZodType } from "@/features/auth/zod_schema/register_schema";
import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export default function InputLabelReactHookForm({
  field,
  fieldState,
  label,
  placeholder,
  name,
  type,
}: {
  field: ControllerRenderProps<any>;
  fieldState: ControllerFieldState;
  label: string;
  placeholder: string;
  name: string;
  type?: string;
}) {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor={field.name} className="text-slate-800">
        {label}
      </FieldLabel>
      <Input
        {...field}
        id={field.name}
        type={type ? type : "text"}
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        className="text-sm"
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
}
