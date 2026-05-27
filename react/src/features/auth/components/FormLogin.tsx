import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { loginZodSchema, type loginZodType } from "../schema/login_zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FaRegEyeSlash, FaRegEye } from "react-icons/fa";
import React from "react";
import { useLogin } from "../hooks/useLogin";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";

export default function FormLogin() {
  const navigate = useNavigate();
  const auth = useAuth();

  // *** -------------------------------------
  // *** Validation du formulaire
  // *** -------------------------------------
  const { login, isPending } = useLogin();
  const form = useForm<loginZodType>({
    resolver: zodResolver(loginZodSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: loginZodType) => {
    console.log(data);
    const res = await login(data);
    if (res.isSuccess) {
      toast.success(res.message);
      auth.setUser(res.data);
      navigate({ to: "/" });
    } else {
      toast.error(res.message);
    }
  };
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Connecter avec votre compte</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Entrer dans le formulaire votre compte pour se connecter
        </CardDescription>
        <CardAction>
          <Link to="/register">
            <Button variant={"link"} className="cursor-pointer">
              S'inscrire
            </Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="email"
                    aria-invalid={fieldState.invalid}
                    placeholder="ex. rakoto@mail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="password">Mot de passe</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="*********"
                      type={`${showPassword ? "text" : "password"}`}
                    />
                    <InputGroupAddon align={"inline-end"}>
                      <InputGroupButton
                        variant={"ghost"}
                        onClick={() => setShowPassword(!showPassword)}
                        className="cursor-pointer"
                      >
                        {showPassword ? (
                          <FaRegEye className="size-5" />
                        ) : (
                          <FaRegEyeSlash className="size-5" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          className="w-full cursor-pointer"
          form="login-form"
          disabled={isPending}
        >
          {isPending ? "..." : "Connexion"}
        </Button>
      </CardFooter>
    </Card>
  );
}
