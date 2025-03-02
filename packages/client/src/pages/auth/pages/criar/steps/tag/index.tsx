import { useCreateAccount } from "@pages/auth/pages/criar/criar.context";
import { Button } from "@components";
import { TagEnum } from "common";
import React from "react";
import { StepWrapper } from "../../_compose";

export function TagStep() {
  const {
    form: { watch, getValues, setValue, formState },
  } = useCreateAccount();

  function handleClick(tag: TagEnum) {
    const tags = getValues("tags") || [];
    if (tags.includes(tag)) {
      tags.splice(tags.indexOf(tag), 1);
    } else tags.push(tag);

    setValue("tags", tags);
  }

  return (
    <StepWrapper isValidStep={!formState.errors.tags}>
      <div className="flex flex-wrap gap-5">
        {Object.entries(TagEnum).map(([key, value]) => (
          <Button
            type="button"
            key={key}
            style={
              watch("tags")?.includes(key as TagEnum) ? "primary" : "tertiary"
            }
            onClick={() => handleClick(key as TagEnum)}
          >
            {value}
          </Button>
        ))}
      </div>
    </StepWrapper>
  );
}
