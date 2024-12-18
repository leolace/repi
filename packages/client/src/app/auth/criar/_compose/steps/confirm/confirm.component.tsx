import { CreateAccountContext } from "@app/auth/criar/page.context";
import { CreateAccountSteps } from "../../../page.types";
import { Text, Card } from "@components";
import React from "react";
import { UserClassesEnum } from "common";

export const ConfirmStep = () => {
  const { user, setCurrentStep } = React.use(CreateAccountContext);

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
      <input type="hidden" value={user.password} name="password" />
      <input type="hidden" value={user.class} name="class" />
      {user.class === UserClassesEnum.BIXO && (
        <input type="hidden" value={user.tags || []} name="tags" />
      )}
    </Card>
  );
};
