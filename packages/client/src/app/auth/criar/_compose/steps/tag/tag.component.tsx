import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Button } from "@components";
import { TagEnum } from "common";
import React from "react";

const TagStep = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);

  const handleClick = (key: TagEnum) => {
    const value: TagEnum[] = form.user.tags?.includes(key)
      ? form.user.tags.filter((tag) => tag !== key)
      : form.user.tags?.concat(key) || [key];

    formDispatch({
      type: "SET_USER_FIELD",
      key: "tags",
      value,
    });
  };

  return (
    <div className="flex flex-wrap gap-5">
      {Object.entries(TagEnum).map(([key, value]) => (
        <Button
          type="button"
          key={key}
          style={
            form.user.tags?.includes(key as TagEnum) ? "primary" : "tertiary"
          }
          onClick={() => handleClick(key as TagEnum)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};

export default TagStep;
