import { Form, redirect } from "react-router";
import { FormContent } from "./_compose";
import { CreateAccountProvider } from "./criar.context";
import { ActionFunctionArgs } from "react-router";
import { createAccountAction, loginAction } from "@actions/auth.server";
import { isErrorResponseData } from "@utils/is-error-response";
import { createSessionCookie } from "@cookie.server";

// export const action = async ({ request }: ActionFunctionArgs) => {
//   const formData = await request.formData();

//   const createAccountResponse = await createAccountAction(formData);
//   if (isErrorResponseData(createAccountResponse.data))
//     return createAccountResponse.data;

//   const loginResponse = await loginAction(formData);
//   if (isErrorResponseData(loginResponse.data))
//     return loginResponse.data;

//   return redirect(`/republica/${createAccountResponse.data.id}`, {
//     headers: {
//       "Set-Cookie": await createSessionCookie(loginResponse.data.token),
//     },
//   });
// };

export function CreateAccount() {
  return (
    <form method="POST" className="grid gap-12 min-w-full">
      <CreateAccountProvider>
        <FormContent />
      </CreateAccountProvider>
    </form>
  );
}
