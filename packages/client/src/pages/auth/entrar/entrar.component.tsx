import { Button, PageTitle, Input } from "@components";
import { PasswordInput } from "./_compose";
import React from "react";
import { Form } from "react-router";

const Entrar = () => {
  return (
    <form className="grid gap-12 min-w-full">
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
        {/* <div>
          {isErrorResponseData(data) && (
            <p className="text-red-500">{data.error}</p>
          )}
        </div> */}
        <Button type="submit">
          Fazer login
        </Button>
      </div>
    </form>
  );
};

export default Entrar;
