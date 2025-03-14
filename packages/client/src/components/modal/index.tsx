import { Card, CardSubtitle, CardTitle } from "@components/card";
import { Button } from "@components/forms/button";
import { createPortal } from "react-dom";
import { IModalProps } from "./types";

export function Modal({
  children,
  id,
  title,
  subtitle,
  loading,
  onClose,
  onConfirm,
}: IModalProps) {
  function handleOnClose() {
    if (onClose) onClose();
    closeModal(id);
  }

  async function handleOnConfirm() {
    if (onConfirm) await onConfirm();
    closeModal(id);
  }

  return createPortal(
    <div id={id} className="hidden">
      <div className="fixed left-0 top-0 bg-black/35 w-screen h-full grid" onClick={handleOnClose} />
      <Card className="fixed left-[50%] top-[50%] translate-[-50%] w-11/12 md:w-3/4 lg:w-1/2 grid gap-6 items-center">
        <div>
          <CardTitle size="2xl">{title}</CardTitle>
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </div>

        {children}

        <div className="flex justify-between items-end">
          <Button style="secondary" onClick={handleOnClose}>
            Cancelar
          </Button>
          <Button onClick={handleOnConfirm} loading={loading}>
            Confirmar
          </Button>
        </div>
      </Card>
    </div>,
    document.body,
  );
}

export function closeModal(id: string) {
  const modal = document.getElementById(id);
  modal?.style.setProperty("display", "none");
}

export function openModal(id: string) {
  const modal = document.getElementById(id);
  modal?.style.setProperty("display", "block");
}
