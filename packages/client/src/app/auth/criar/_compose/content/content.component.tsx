"use client";

import React from "react";
import { CreateAccountContext } from "../../page.context";
import { mapCurrentStepData } from "../../page.utils";

export const Content = () => {
  const { currentStep } = React.useContext(CreateAccountContext);

  return mapCurrentStepData[currentStep].component;
};
