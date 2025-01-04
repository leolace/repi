import React, { MouseEvent } from "react";
import { CreateAccountSteps } from "../../types";
import { mapNextStep } from "../../utils";
import { Button } from "@components";
import { CreateAccountContext } from "../../context";
import { useFormStatus } from "react-dom";

export const SubmitButton = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);
  const { pending } = useFormStatus();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    formDispatch({
      type: "SET_CURRENT_STEP",
      value: mapNextStep(form.currentStep, form.user.class),
    });
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

  if (form.currentStep !== CreateAccountSteps.CONFIRM) {
    return (
      <Button
        onClick={handleClick}
        type="button"
        disabled={!!form.errors[form.currentStep] || form.loadings[form.currentStep]}
        ref={buttonRef}
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
