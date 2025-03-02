import { useCreateAccount } from "@pages/auth/pages/criar/criar.context";
import { InvisibleInput } from "@components/invisible-input";
import { StepWrapper } from "../../_compose";

export function EmailStep() {
  const {
    form: { register, formState },
  } = useCreateAccount();

  return (
    <StepWrapper isValidStep={!formState.errors.email}>
      <InvisibleInput
        size="3xl"
        placeholder="Digite seu email aqui"
        type="email"
        className="flex-1"
        autoFocus
        {...register("email")}
      />
    </StepWrapper>
  );
}
