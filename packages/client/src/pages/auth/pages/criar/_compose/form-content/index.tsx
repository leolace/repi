import React from "react";
import { PageTitle } from "@components";
import { mapCurrentStepData } from "../../criar.utils";
import { useCreateAccount } from "../../criar.context";

export const FormContent = () => {
  const { step } = useCreateAccount();

  const { component, subtitle, title } = mapCurrentStepData[step];

  return (
    <div className={"gap-12 grid min-w-full w-full"}>
      <PageTitle title={title} subtitle={subtitle} titleSize="2xl" />
      {component}
    </div>
  );
};
