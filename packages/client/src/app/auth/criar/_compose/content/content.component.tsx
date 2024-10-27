"use client"

import React from "react";
import { PageTitle } from "@components";
import { mapCurrentStepData } from "../../page.utils";
import { NavButtons } from "..";
import { CreateAccountContext } from "../../page.context";

export const Content = () => {
  const { currentStep } = React.use(CreateAccountContext);

  return (
    <div className={"gap-12 grid min-w-full w-full"}>
      <PageTitle
        title={mapCurrentStepData[currentStep].title}
        subtitle={mapCurrentStepData[currentStep].subtitle}
        titleSize="2xl"
      />
      {mapCurrentStepData[currentStep].component}
      <NavButtons />
    </div>
  );
};
