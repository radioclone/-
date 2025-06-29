import { ReactNode } from "react";

export type AppStatus = "live" | "coming_soon" | "in_development";

export interface EcosystemApp {
  name: string;
  description: string;
  icon: ReactNode;
  status: AppStatus;
}