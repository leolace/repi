import React, { MouseEvent } from "react";
import { CreateAccountSteps } from "@app/auth/criar/page.types";
import { mapNextStep } from "@app/auth/criar/page.utils";
import { Button } from "@components";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const {
    currentStep,
    setCurrentStep,
    setError,
    error,
    isLoadingEmailVerify,
    user,
  } = React.use(CreateAccountContext);
  const { pending } = useFormStatus();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentStep(mapNextStep(currentStep, user.class));
  };

  React.useEffect(() => {
    const handleEvent = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        buttonRef.current?.click();
      }
    };

    document.addEventListener("keypress", handleEvent);
    return () => {
      document.removeEventListener("keypress", handleEvent);
    };
  }, []);

  if (currentStep !== CreateAccountSteps.CONFIRM) {
    return (
      <Button
        onClick={handleClick}
        type="button"
        disabled={error?.[currentStep] !== false}
        ref={buttonRef}
        loading={currentStep === CreateAccountSteps.EMAIL && isLoadingEmailVerify} // TODO: map form loadings
      >
        Avançar
      </Button>
    );
  }

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Carregando..." : "Finalizar"}
    </Button>
  );
};
