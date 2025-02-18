import React from "react";
import { Button } from "@components";
import { mapPrevStep } from "../../criar.utils";
import { CreateAccountContext } from "../../criar.context";
import { SubmitButton } from "../submit-button";
import { CreateAccountSteps } from "../../criar.types";

export const NavButtons = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);

  return (
    <div className="flex justify-between">
      <Button
        style="tertiary"
        onClick={() =>
          formDispatch({
            type: "SET_CURRENT_STEP",
            value: mapPrevStep(form.currentStep, form.user.class),
          })
        }
        type="button"
        disabled={form.currentStep === CreateAccountSteps.CLASS}
      >
        Voltar
      </Button>
      <SubmitButton />
    </div>
  );
};
