"use client";

import { Button, PageTitle } from "@components";
import { Input } from "@components";
import { PasswordInput } from "./_compose";
import { loginFormData } from "@actions";
import React from "react";
import { isErrorResponse } from "@utils/is-error-response";

const Entrar = () => {
  const [state, formAction, isPending] = React.useActionState(loginFormData, null);

  return (
    <form className="grid gap-12 min-w-full" action={formAction}>
      <PageTitle
        title="Login"
        subtitle="Entre com seus dados"
        titleSize="2xl"
      />
      <div className="grid gap-6">
        <Input
          id="email"
          name="email"
          label="E-mail"
          placeholder="exemplo@email.com"
          type="email"
          required
        />
        <PasswordInput />
      </div>
      <div className="flex justify-between items-center">
        <div>
          {isErrorResponse(state?.errors) && (
            <p className="text-red-500">{state.errors.error}</p>
          )}
        </div>
        <Button type="submit" loading={isPending}>
          Fazer login
        </Button>
      </div>
    </form>
  );
};

export default Entrar;
