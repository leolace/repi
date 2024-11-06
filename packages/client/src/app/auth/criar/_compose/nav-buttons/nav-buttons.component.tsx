"use client";

import React from "react";
import { Button } from "@components";
import { mapPrevStep } from "../../page.utils";
import { CreateAccountContext } from "../../page.context";
import { SubmitButton } from "../submit-button";
import { CreateAccountSteps } from "../../page.types";

export const NavButtons = () => {
  const { setCurrentStep, currentStep, user } = React.use(CreateAccountContext);
	
  return (
    <div className="flex justify-between">
      <Button
        style="tertiary"
        onClick={() => setCurrentStep(mapPrevStep(currentStep, user.class))}
        type="button"
				disabled={currentStep === CreateAccountSteps.CLASS}
      >
        Voltar
      </Button>
			<SubmitButton />
    </div>
  );
};
