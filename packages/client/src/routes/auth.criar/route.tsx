import { Form, redirect } from "@remix-run/react";
import { Content } from "./_compose";
import { CreateAccountProvider } from "./context";
import { ActionFunctionArgs } from "@remix-run/node";
import { createAccountAction, loginAction } from "@actions/auth.server";
import { isErrorResponseData } from "@utils/is-error-response";
import { createSessionCookie } from "@cookie.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const createAccountResponse = await createAccountAction(formData);
  if (isErrorResponseData(createAccountResponse.data)) 
    return createAccountResponse.data;

  const loginResponse = await loginAction(formData);
  if (isErrorResponseData(loginResponse.data)) 
    return loginResponse.data;

  return redirect("/inicio", {
    headers: {
      "Set-Cookie": await createSessionCookie(loginResponse.data.token),
    },
  });
};

const Create = () => {
  return (
    <Form method="POST" className="grid gap-12 min-w-full">
      <CreateAccountProvider>
        <Content />
      </CreateAccountProvider>
    </Form>
  );
};

export default Create;
