"use client";

import React from "react";
import ContainerAuth from "./ContainerAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  UserLoginZodSchema,
  type UserLoginZodType,
} from "../zod_schema/login_schema";
import { useLogin } from "../hooks/useLogin";
import InputLabelReactHookForm from "@/components/InputLabelReactHookForm";
import { RippleButton } from "@/components/ui/ripple-button";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Field, FieldGroup } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FormLogin() {
  const router = useRouter();
  const { login } = useLogin();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const form = useForm<UserLoginZodType>({
    resolver: zodResolver(UserLoginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: UserLoginZodType) => {
    console.log(data);
    const res = await login({
      email: data.email,
      password: data.password,
    });

    if (res.isSuccess) {
      // console.log(res.message);
      toast.success(res.message);
      router.push("/");
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
        Sign In
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
            {form.formState.isSubmitting ? "..." : "Sign In"}
          </RippleButton>
        </div>
      </form>

      <div className="mt-4 text-sm flex justify-start items-center gap-2">
        <p className="text-gray-700">Don't have an account ?</p>
        <Link
          className="font-semibold text-sky-500 underline"
          href={"/register"}
        >
          Sign Up
        </Link>
      </div>
    </ContainerAuth>
  );
}
