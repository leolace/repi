import { CreateAccountContext } from "@app/auth/criar/page.context";
import { CreateAccountSteps } from "../../../page.types";
import { Text, Card } from "@components";
import React from "react";
import { TagEnum, UserClassesEnum } from "common";

export const ConfirmStep = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);

  return (
    <Card>
      <Text
        onClick={() =>
          formDispatch({
            type: "SET_CURRENT_STEP",
            value: CreateAccountSteps.NAME,
          })
        }
        size="xl"
        className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
      >
        {form.user.name}
      </Text>
      <Text
        onClick={() =>
          formDispatch({
            type: "SET_CURRENT_STEP",
            value: CreateAccountSteps.EMAIL,
          })
        }
        size="xl"
        className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
      >
        {form.user.email}
      </Text>
      <Text
        onClick={() =>
          formDispatch({
            type: "SET_CURRENT_STEP",
            value: CreateAccountSteps.CLASS,
          })
        }
        size="xl"
        className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
      >
        {form.user.class}
      </Text>
      {form.user.tags && (
        <Text
          onClick={() =>
            formDispatch({
              type: "SET_CURRENT_STEP",
              value: CreateAccountSteps.TAG,
            })
          }
          size="xl"
          className="cursor-pointer px-2 hover:bg-gray-light w-max rounded"
        >
          {form.user.tags.map((tag) => TagEnum[tag.toUpperCase() as keyof typeof TagEnum]).join(", ")}
        </Text>
      )}
      <input type="hidden" value={form.user.name} name="name" />
      <input type="hidden" value={form.user.email} name="email" />
      <input type="hidden" value={form.user.password} name="password" />
      <input type="hidden" value={form.user.class} name="class" />
      {form.user.class === UserClassesEnum.BIXO && (
        <input type="hidden" value={form.user.tags || []} name="tags" />
      )}
    </Card>
  );
};
