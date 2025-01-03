import { Button, PageTitle } from "@components";
import { Input } from "@components";
import { PasswordInput } from "./_compose";
import React from "react";
import { isErrorResponseData } from "@utils/is-error-response";
import { Form, redirect, useActionData, useNavigation } from "@remix-run/react";
import { ActionFunctionArgs } from "@remix-run/node";
import { loginAction } from "@actions/auth.server";
import { createSessionCookie } from "@cookie.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const loginResponse = await loginAction(formData);

  if (isErrorResponseData(loginResponse.data)) return loginResponse.data;

  return redirect("/inicio", {
    headers: {
      "Set-Cookie": await createSessionCookie(loginResponse.data.token),
    },
  });
};

const Entrar = () => {
  const data = useActionData<typeof action>();
  const navigation = useNavigation();

  return (
    <Form className="grid gap-12 min-w-full" method="POST">
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
          {isErrorResponseData(data) && (
            <p className="text-red-500">{data.error}</p>
          )}
        </div>
        <Button type="submit" loading={navigation.state === "submitting"}>
          Fazer login
        </Button>
      </div>
    </Form>
  );
};

export default Entrar;
