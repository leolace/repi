import React from "react";
import { CreateAccountContext } from "@app/auth/criar/page.context";
import { Card, CardSubtitle, CardTitle } from "@components";
import { CARD_CLASSES } from "./class.utils";
import { UserClassesEnum } from "common";

const ClassStep = () => {
  const { form, formDispatch } = React.use(CreateAccountContext);

  React.useLayoutEffect(() => {
    if (form.user.class === UserClassesEnum.NAO_DEFINIDA)
      formDispatch({ type: "SET_ERROR", key: "CLASS", value: true });
  }, []);

  const handleClick = (type: UserClassesEnum) => {
    formDispatch({ type: "SET_USER_FIELD", key: "class", value: type });
  };

  return (
    <div className="flex gap-2 flex-col sm:flex-row">
      {CARD_CLASSES.map(({ type, title, subtitle }) => (
        <Card
          className={`cursor-pointer flex-1 w-full ${form.user.class === type ? "bg-primary hover:bg-primary text-white" : "hover:bg-gray-100"}`}
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

export default ClassStep;
