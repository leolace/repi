import { PropsWithChildren, useEffect } from "react";
import { Button } from "@components";
import { useCreateAccount } from "../../criar.context";
import { CreateAccountSteps } from "../../criar.types";

interface Props {
  isValidStep?: boolean;
  onSubmit?: () => void;
}

export function StepWrapper({
  children,
  isValidStep = false,
  onSubmit,
}: PropsWithChildren<Props>) {
  const { nextStep, previousStep, step } = useCreateAccount();

  useEffect(() => {
    function handleKeyPress(event: KeyboardEvent) {
      if (event.key === "Enter" && isValidStep) nextStep();
    }

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [isValidStep]);

  return (
    <div className="grid gap-12">
      {children}

      <div className="flex justify-between">
        <Button
          style="tertiary"
          onClick={previousStep}
          disabled={step === CreateAccountSteps.CLASS}
        >
          Voltar
        </Button>
        {step === CreateAccountSteps.CONFIRM ? (
          <Button onClick={onSubmit}>Criar conta</Button>
        ) : (
          <Button onClick={nextStep} disabled={!isValidStep}>
            Continuar
          </Button>
        )}
      </div>
    </div>
  );
}
