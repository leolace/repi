import React from "react";
import { PageTitle } from "@components";
import { mapCurrentStepData } from "../../utils";
import { NavButtons } from "../nav-buttons";
import { CreateAccountContext } from "../../context";

export const Content = () => {
  const { form } = React.useContext(CreateAccountContext);

  return (
    <div className={"gap-12 grid min-w-full w-full"}>
      <PageTitle
        title={mapCurrentStepData[form.currentStep].title}
        subtitle={mapCurrentStepData[form.currentStep].subtitle}
        titleSize="2xl"
      />
      {mapCurrentStepData[form.currentStep].component}
      <NavButtons />
    </div>
  );
};
