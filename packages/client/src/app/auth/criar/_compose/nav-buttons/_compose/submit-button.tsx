import React, { MouseEvent } from "react";
import { CreateAccountSteps } from "@app/auth/criar/page.types";
import { mapNextStep } from "@app/auth/criar/page.utils";
import { Button } from "@components";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { useFormStatus } from "react-dom";
import { isValidEmail } from "@utils/regex";

export const SubmitButton = () => {
  const { currentStep, setCurrentStep, user, setError, error } =
    React.useContext(CreateAccountContext);
  const { pending } = useFormStatus();
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const formError = React.useMemo<string | false>(() => {
    switch (currentStep) {
      case CreateAccountSteps.CLASS:
        if (!user.class) return "Escolha uma classe para continuar";
        else false;
        break;
      case CreateAccountSteps.NAME:
        if (!user.name.trim()) return "Digite seu nome para continuar";
        else false;
        break;
      case CreateAccountSteps.EMAIL:
        if (!user.name.trim()) return "Digite seu e-mail para continuar";
        if (!isValidEmail(user.email)) return "E-mail inválido";
        else false;
        break;
      default:
        return false;
    }

    return false;
  }, [currentStep, user]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (formError) {
      setError(formError);
      return;
    }
    setCurrentStep((prev) => mapNextStep[prev]);
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
        disabled={Boolean(formError)}
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
