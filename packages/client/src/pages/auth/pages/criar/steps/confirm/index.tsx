import { useCreateAccount } from "@pages/auth/pages/criar/criar.context";
import { CreateAccountSteps } from "@pages/auth/pages/criar/criar.types";
import { Text, Card } from "@components";
import React from "react";
import { TagEnum } from "common";
import { UseCreateAccountMutation } from "../../criar.mutation";
import { StepWrapper } from "../../_compose";

export function ConfirmStep() {
  const {
    form: { getValues },
    setStep,
  } = useCreateAccount();
  const { name, class: classValue, email, tags, password } = getValues();
  const { mutateAsync } = UseCreateAccountMutation();

  return (
    <StepWrapper
      onSubmit={async () =>
        await mutateAsync({ class: classValue, email, name, password, tags })
      }
    >
      <Card>
        <Text
          onClick={() => setStep(CreateAccountSteps.CLASS)}
          size="xl"
          className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
        >
          {classValue}
        </Text>
        <Text
          onClick={() => setStep(CreateAccountSteps.NAME)}
          size="xl"
          className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
        >
          {name}
        </Text>
        <Text
          onClick={() => setStep(CreateAccountSteps.EMAIL)}
          size="xl"
          className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
        >
          {email}
        </Text>
        {tags && (
          <Text
            onClick={() => setStep(CreateAccountSteps.TAG)}
            size="xl"
            className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
          >
            {tags
              .map((tag) => TagEnum[tag.toUpperCase() as keyof typeof TagEnum])
              .join(", ")}
          </Text>
        )}
      </Card>
    </StepWrapper>
  );
}
