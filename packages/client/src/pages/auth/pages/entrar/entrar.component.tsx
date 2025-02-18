import { Button, PageTitle, Input } from "@components";
import React from "react";
import { InputSecure } from "@components/forms/input-secure";
import { useLoginMutation } from "$auth/pages/entrar/entrar.mutations";
import { ILoginForm } from "$auth/pages/entrar/entrar.types";
import { useForm } from "react-hook-form";
import { useSession } from "@contexts/session.context";
import { useNavigate } from "react-router";

const Login = () => {
  const { setToken } = useSession();
  const { register, handleSubmit } = useForm<ILoginForm>();
  const navigate = useNavigate();
  const { mutateAsync } = useLoginMutation({
    onSuccess: ({ token }) => {
      setToken(token);
      navigate("/inicio");
    },
  });

  const onSubmit = async (data: ILoginForm) => {
    await mutateAsync(data);
  };

  return (
    <form className="grid gap-12 min-w-full" onSubmit={handleSubmit(onSubmit)}>
      <PageTitle
        title="Login"
        subtitle="Entre com seus dados"
        titleSize="2xl"
      />
      <div className="grid gap-6">
        <Input
          id="email"
          label="E-mail"
          placeholder="exemplo@email.com"
          type="email"
          required
          {...register("email")}
        />
        <InputSecure
          id="password"
          label="Senha"
          placeholder="*********"
          required
          {...register("password")}
        />
      </div>
      <div className="flex justify-between">
        <Button style="secondary">Criar conta</Button>
        <Button type="submit">Entrar</Button>
      </div>
    </form>
  );
};

export default Login;
