import React from "react";
import { Button } from "@components";
import { mapPrevStep } from "../../page.utils";
import { CreateAccountContext } from "../../context";
import { SubmitButton } from "../submit-button";
import { CreateAccountSteps } from "../../page.types";

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
