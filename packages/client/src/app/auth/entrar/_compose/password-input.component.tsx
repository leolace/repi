"use client";

import { Input, ShowOrHidePassword } from "@components";
import React from "react";

export const PasswordInput = () => {
  const [show, setShow] = React.useState(false);

  return (
    <div className="grid grid-cols-2">
      <Input
        id="password"
        name="password"
        label="Senha"
        placeholder="*********"
        type={show ? "text" : "password"}
        className="flex-1 w-full col-[1/-1] row-[1]"
        required
      />
      <ShowOrHidePassword show={show} setShow={setShow} className="row-[1] col-[2] self-end justify-self-end"/>
    </div>
  );
};
