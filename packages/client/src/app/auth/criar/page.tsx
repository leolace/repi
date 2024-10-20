import { Content } from "./_compose";
import { CreateAccountProvider } from "./page.context";
import { createAccountAction } from "@actions";

const Create = () => {
  return (
    <form className="grid gap-12 min-w-full" action={createAccountAction}>
			<CreateAccountProvider>
				<Content />
			</CreateAccountProvider>
    </form>
  );
};

export default Create;
