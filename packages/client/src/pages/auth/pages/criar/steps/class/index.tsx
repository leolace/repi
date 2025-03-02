import { Card, CardSubtitle, CardTitle } from "@components";
import { CARD_CLASSES } from "./utils";
import { twMerge } from "tailwind-merge";
import { StepWrapper } from "../../_compose";
import { useCreateAccount } from "../../criar.context";

export function ClassStep() {
  const {
    form: { formState, register, watch },
  } = useCreateAccount();

  return (
    <StepWrapper isValidStep={!formState.errors.class}>
      <div className="flex gap-2 flex-col sm:flex-row">
        {CARD_CLASSES.map(({ type, title, subtitle }) => (
          <div className="flex-1 w-full grid" key={type}>
            <input
              type="radio"
              value={type}
              className="opacity-0 col-[1] row-[1] cursor-pointer"
              {...register("class", {
                required: "Escolha uma opção",
              })}
            />
            <Card
              className={twMerge(
                "grid col-[1] row-[1]",
                watch("class") === type
                  ? "bg-primary hover:bg-primary text-white"
                  : "hover:bg-gray-100",
              )}
            >
              <CardTitle tag="h2">{title}</CardTitle>
              <CardSubtitle>{subtitle}</CardSubtitle>
            </Card>
          </div>
        ))}
      </div>
    </StepWrapper>
  );
}
