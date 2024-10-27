import React, { MouseEvent } from "react";
import { CreateAccountSteps } from "@app/auth/criar/page.types";
import { mapNextStep } from "@app/auth/criar/page.utils";
import { Button } from "@components";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { useFormStatus } from "react-dom";
import { isValidEmail } from "@utils/regex";
import { client } from "@services/client";
import { IUser } from "common";

export const SubmitButton = () => {
  const { currentStep, setCurrentStep, user, setError, error } =
    React.useContext(CreateAccountContext);
  const { pending } = useFormStatus();
  const buttonRef = React.useRef<HTMLButtonElement>(null);
	const [isLoadingEmailVerify, setIsLoadingEmailVerify] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    const getError = () => {
      setError(null);
      switch (currentStep) {
        case CreateAccountSteps.CLASS:
          if (!user.class) setError("Escolha uma classe para continuar");
          break;
        case CreateAccountSteps.NAME:
          if (!user.name.trim()) setError("Digite seu nome para continuar");
          break;
        case CreateAccountSteps.EMAIL:
          if (!user.email.trim()) return;
          if (!isValidEmail(user.email)) return setError("E-mail inválido");
					setIsLoadingEmailVerify(true);
          timer = setTimeout(async () => {
            const data = await client
              .get<IUser[]>(`users?email=${user.email}`)
              .then((res) => res.data);
            if (data?.length) setError("Email já existe");
						setIsLoadingEmailVerify(false);
          }, 1000);
          break;
        default:
          break;
      }
    };

    getError();

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [currentStep, user]);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentStep((prev) => mapNextStep[prev]);
    setError(null);
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
        disabled={Boolean(error)}
        ref={buttonRef}
        loading={isLoadingEmailVerify}
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
