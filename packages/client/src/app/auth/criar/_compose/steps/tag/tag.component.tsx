import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Button } from "@components";
import { TagEnum } from "common";
import React from "react";

export const TagStep = () => {
  const { user, handleForm, enableNextStep } = React.use(CreateAccountContext);

  React.useEffect(() => enableNextStep(), []);
  return (
    <div className="flex flex-wrap gap-5">
      {Object.entries(TagEnum).map(([key, value]) => (
        <Button
          type="button"
          key={key}
          style={user.tags?.includes(key as TagEnum) ? "primary" : "tertiary"}
          onClick={async () => await handleForm(key)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};
