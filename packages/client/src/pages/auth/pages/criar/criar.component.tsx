import { FormContent } from "./_compose";
import { CreateAccountProvider } from "./criar.context";

export function CreateAccount() {
  return (
    <div className="grid gap-12 min-w-full">
      <CreateAccountProvider>
        <FormContent />
      </CreateAccountProvider>
    </div>
  );
}
