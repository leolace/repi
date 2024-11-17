import React from "react";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Card, CardSubtitle, CardTitle } from "@components";
import { CARD_CLASSES } from "./class.utils";

export const ClassStep = () => {
  const { user, handleForm } = React.use(CreateAccountContext);

  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      {CARD_CLASSES.map(({ type, title, subtitle }) => (
        <Card
          className={`cursor-pointer flex-1 w-full ${user.class === type ? "bg-primary hover:bg-primary text-white" : "hover:bg-gray-100"}`}
          key={type}
          onClick={async () => await handleForm(type)}
        >
          <CardTitle tag="h2">{title}</CardTitle>
          <CardSubtitle>{subtitle}</CardSubtitle>
        </Card>
      ))}
    </div>
  );
};
