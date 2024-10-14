import React from "react";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Card, CardSubtitle, CardTitle } from "@components";
import { CARD_CLASSES } from "./class.utils";

export const ClassStep = () => {
  const { setUser, user } = React.useContext(CreateAccountContext);

  return (
    <div className="flex gap-6">
      {CARD_CLASSES.map(({ type, title, subtitle }) => (
        <Card
          className={`cursor-pointer flex-1 min-w-[25rem] ${user.class === type ? "bg-primary hover:bg-primary text-white" : "hover:bg-gray-100"}`}
          key={type}
          onClick={() =>
            setUser((prev) => ({
              ...prev,
              class: type,
            }))
          }
        >
          <CardTitle tag="h2">{title}</CardTitle>
          <CardSubtitle className="text-nowrap">{subtitle}</CardSubtitle>
        </Card>
      ))}
    </div>
  );
};
