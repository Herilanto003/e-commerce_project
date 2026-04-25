"use client";

import React from "react";
import ContainerAuth from "./ContainerAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  UserRegisterZodSchema,
  type UserRegisterZodType,
} from "../zod_schema/register_schema";
import { useRegister } from "../hooks/useRegister";
import InputLabelReactHookForm from "@/components/InputLabelReactHookForm";
import { RippleButton } from "@/components/ui/ripple-button";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function FormRegister() {
  const router = useRouter();
  const { register } = useRegister();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm<UserRegisterZodType>({
    resolver: zodResolver(UserRegisterZodSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });

  const onSubmit = async (data: UserRegisterZodType) => {
    console.log(data);
    const res = await register({
      email: data.email,
      password: data.password,
      username: data.username,
    });

    if (res.isSuccess) {
      // console.log(res.message);
      toast.success(res.message);
      router.push("/login");
    } else {
      // console.log(res.message);
      toast.error(res.message);
    }
  };

  return (
    <ContainerAuth>
      <div className="mx-auto relative w-15 h-15">
        <Image
          src={"/images/icon.png"}
          alt="Icon"
          fill
          className="object-cover"
        />
      </div>

      <h1 className="my-4 text-2xl text-center text-slate-800 font-bold">
        Sign Up
      </h1>

      <form
        className="w-full h-full flex flex-col items-start gap-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputLabelReactHookForm
              field={field}
              fieldState={fieldState}
              label="Email Adress"
              placeholder="rakoto@mail.com"
              name="email"
            />
          )}
        />

        <Controller
          name="username"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputLabelReactHookForm
              field={field}
              fieldState={fieldState}
              label="Pseudo"
              placeholder="rakoto"
              name="username"
            />
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputLabelReactHookForm
              field={field}
              fieldState={fieldState}
              label="Your password"
              placeholder="*********"
              name="password"
              type={`${showPassword ? "text" : "password"}`}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputLabelReactHookForm
              field={field}
              fieldState={fieldState}
              label="Confirm Your password"
              placeholder="*********"
              name="confirmPassword"
              type={`${showPassword ? "text" : "password"}`}
            />
          )}
        />

        <FieldGroup>
          <Field orientation={"horizontal"}>
            <Checkbox
              checked={showPassword}
              onCheckedChange={(value) => setShowPassword(value == true)}
              name="show_password"
              id="show_password"
            />
            <Label htmlFor="show_password">Show password</Label>
          </Field>
        </FieldGroup>

        <div className="w-full">
          <RippleButton
            type="submit"
            className="h-11 px-5 font-semibold text-sm border-none bg-sky-400 text-white rounded-lg w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "..." : "Sign Up"}
          </RippleButton>
        </div>
      </form>

      <div className="mt-4 text-sm flex justify-start items-center gap-2">
        <p className="text-gray-700">Already have an account ?</p>
        <Link className="font-semibold text-sky-500 underline" href={"/login"}>
          Sign In
        </Link>
      </div>
    </ContainerAuth>
  );
}
