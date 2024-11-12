import React from "react";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Card, CardSubtitle, CardTitle } from "@components";
import { CARD_CLASSES } from "./class.utils";
import { Class } from "@types";

export const ClassStep = () => {
  const { setUser, user, clearUser } = React.use(CreateAccountContext);

  const handleClick = (type: Class) => {
    if (type !== user.class) {
			clearUser();
      setUser((prev) => ({
        ...prev,
        class: type,
      }));
    }
  };

  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      {CARD_CLASSES.map(({ type, title, subtitle }) => (
        <Card
          className={`cursor-pointer flex-1 w-full ${user.class === type ? "bg-primary hover:bg-primary text-white" : "hover:bg-gray-100"}`}
          key={type}
          onClick={() => handleClick(type)}
        >
          <CardTitle tag="h2">{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </Card>
      ))}
    </div>
  );
};
