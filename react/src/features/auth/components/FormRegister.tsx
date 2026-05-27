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
import { Link } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import {
  registerZodSchema,
  type registerZodType,
} from "../schema/register_zod";
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
import { useRegister } from "../hooks/useRegister";
import { toast } from "sonner";

export default function FormRegister() {
  // *** -------------------------------------
  // *** Validation du formulaire
  // *** -------------------------------------
  const { register, isPending } = useRegister();
  const form = useForm<registerZodType>({
    resolver: zodResolver(registerZodSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      username: "",
    },
  });
  const onSubmit = async (data: registerZodType) => {
    console.log(data);
    const res = await register(data);
    if (res.isSuccess) {
      toast.success(res.message);
    } else {
      toast.error(res.message);
    }
  };
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Créer votre compte</CardTitle>
        <CardDescription className="text-xs sm:text-sm">
          Entrer dans le formulaire tes informations pour créer ton compte
        </CardDescription>
        <CardAction>
          <Link to="/login">
            <Button variant={"link"} className="cursor-pointer">
              Se connecter
            </Button>
          </Link>
        </CardAction>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={form.handleSubmit(onSubmit, (errors) =>
            console.log("Erreurs Zod:", errors),
          )}
        >
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="username">Pseudo</FieldLabel>
                  <Input
                    {...field}
                    id="username"
                    aria-invalid={fieldState.invalid}
                    placeholder="ex. RAKOTO"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

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

            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="confirmPassword">
                    Confirmer votre mot de passe
                  </FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id="confirmPassword"
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
          form="register-form"
          disabled={isPending}
        >
          {isPending ? "..." : "Inscription"}
        </Button>
      </CardFooter>
    </Card>
  );
}
