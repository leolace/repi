"use client";

import React from "react";
import { PageTitle } from "@components";
import { mapCurrentStepData } from "../../page.utils";
import { CreateAccountSteps } from "../../page.types";
import { NavButtons } from "..";
import { CreateAccountContext } from "../../page.context";

export const Content = () => {
  const { currentStep } = React.useContext(CreateAccountContext);

  return Object.values(CreateAccountSteps).map((step) => (
    <div
      className={`${currentStep === step ? "block" : "hidden"} gap-12 grid min-w-full w-full`}
			key={step}
    >
      <PageTitle
        title={mapCurrentStepData[step].title}
        subtitle={mapCurrentStepData[step].subtitle}
        titleSize="2xl"
      />
      {mapCurrentStepData[step].component}
      <NavButtons />
    </div>
  ));
};
