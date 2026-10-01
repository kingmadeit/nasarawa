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
  const classes = [CONTAINER_VARIANT_CLASS[variant], className]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
