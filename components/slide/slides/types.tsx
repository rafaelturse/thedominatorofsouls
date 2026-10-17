import type { ReactNode } from "react";

export type SlideItem = {
  key: string;
  href?: string;
  cta: string;
  disabled?: boolean;
  content: ReactNode;
};