import { useCreateAccount } from "@pages/auth/pages/criar/criar.context";
import { CreateAccountSteps } from "@pages/auth/pages/criar/criar.types";
import { Text, Card } from "@components";
import React from "react";
import { TagEnum } from "common";
import { useCreateAccountMutation } from "../../criar.mutations";
import { StepWrapper } from "../../_compose";
import { useLoginMutation } from "@pages/auth/pages/entrar/entrar.mutations";

export function ConfirmStep() {
  const {
    form: { getValues },
    setStep,
  } = useCreateAccount();
  const { name, class: classValue, email, tags, password } = getValues();
  const { mutateAsync: mutateCreateAccount } = useCreateAccountMutation();
  const { mutateAsync: mutateLogin } = useLoginMutation();

  async function handleSubmit() {
    const createAccountResponse = await mutateCreateAccount({
      class: classValue,
      email,
      name,
      password,
      tags,
    });

    if (!createAccountResponse.ok)
      throw new Error(await createAccountResponse.json());

    await mutateLogin({ email, password });
  }

  return (
    <StepWrapper onSubmit={handleSubmit}>
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
