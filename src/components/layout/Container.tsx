import clsx from "clsx";
import type { ReactNode } from "react";

type ContainerVariant = "full" | "centered";

const CONTAINER_VARIANT_CLASS: Record<ContainerVariant, string> = {
  full: "w-full",
  centered: "mx-auto w-full max-w-content px-6",
};

interface ContainerProps {
  children: ReactNode;
  variant?: ContainerVariant;
  className?: string;
}

export function Container({
  children,
  variant = "full",
  className,
}: ContainerProps) {
  return (
    <div className={clsx(CONTAINER_VARIANT_CLASS[variant], className)}>
      {children}
    </div>
  );
}
