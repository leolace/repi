import { CreateAccountContext } from "@app/auth/criar/page.context";
import { CreateAccountSteps } from "../../../page.types";
import { Text, Card } from "@components";
import React from "react";

export const ConfirmStep = () => {
  const { user, setCurrentStep } = React.useContext(CreateAccountContext);

  return (
    <Card>
      <Text onClick={() => setCurrentStep(CreateAccountSteps.NAME)} size="xl">
        {user.name}
      </Text>
      <Text onClick={() => setCurrentStep(CreateAccountSteps.EMAIL)} size="xl">
        {user.email}
      </Text>
      <Text onClick={() => setCurrentStep(CreateAccountSteps.CLASS)} size="xl">
        {user.class}
      </Text>
      <input type="hidden" value={user.name} name="name" />
      <input type="hidden" value={user.email} name="email" />
      <input type="hidden" value={user.class} name="class" />
    </Card>
  );
};
