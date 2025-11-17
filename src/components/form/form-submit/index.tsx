import { Button } from "../../../components/ui/button";
import React from "react";
import { useFormStatus } from "react-dom";

interface IFormSubmitProps {
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "outline"
    | "ghost"
    | "link"
}

const FormSubmit = ({
  children,
  disabled,
  className,
  variant = "default",
}: IFormSubmitProps) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      size={"sm"}
      variant={variant}
      disabled={disabled || pending}
      className={className}
    >
      {children}
    </Button>
  );
};

export default FormSubmit;
