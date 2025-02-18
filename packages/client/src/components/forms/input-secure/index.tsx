import { useState } from "react";
import { ShowOrHidePassword } from "./show-or-hide-password";
import { Input } from "../input";
import { InputSecureProps } from "./types";

export function InputSecure({ ...props }: InputSecureProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="grid grid-cols-2">
      <Input
        type={show ? "text" : "password"}
        className="flex-1 w-full col-[1/-1] row-[1]"
        {...props}
      />
      <ShowOrHidePassword
        show={show}
        setShow={setShow}
        className="row-[1] col-[2] self-end justify-self-end"
      />
    </div>
  );
}
