"use client";

import React from "react";
import { Button } from "@components";
import { mapPrevStep } from "../../page.utils";
import { CreateAccountContext } from "../../page.context";
import { SubmitButton } from "./_compose";
import { CreateAccountSteps } from "../../page.types";

export const NavButtons = () => {
  const { setCurrentStep, currentStep } = React.use(CreateAccountContext);
	
  return (
    <div className="flex justify-between">
      <Button
        style="tertiary"
        onClick={() => setCurrentStep((prev) => mapPrevStep[prev])}
        type="button"
				disabled={currentStep === CreateAccountSteps.CLASS}
      >
        Voltar
      </Button>
      <SubmitButton />
    </div>
  );
};
