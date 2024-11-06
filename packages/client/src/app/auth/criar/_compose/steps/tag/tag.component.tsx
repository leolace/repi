import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Button } from "@components";
import { TagEnum } from "common";
import React from "react";

export const TagStep = () => {
  const { user, setUser } = React.use(CreateAccountContext);

  const handleClick = (value: TagEnum) => {
    const userTags: TagEnum[] = user.tags?.includes(value)
      ? user.tags.filter((tag) => tag !== value)
      : (user.tags?.concat(value) || [value]);
    setUser((prev) => ({ ...prev, tags: userTags }));
  };

  return (
    <div className="flex flex-wrap gap-5">
      {Object.entries(TagEnum).map(([key, value]) => (
        <Button
          type="button"
          key={key}
          style={user.tags?.includes(key as TagEnum) ? "primary" : "tertiary"}
          onClick={() => handleClick(key as TagEnum)}
        >
          {value}
        </Button>
      ))}
    </div>
  );
};
