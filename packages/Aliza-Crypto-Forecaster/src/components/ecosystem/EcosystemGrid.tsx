import { EcosystemCard } from "./EcosystemCard";
import { EcosystemApp } from "@/types/ecosystem";

interface EcosystemGridProps {
  apps: EcosystemApp[];
}

export const EcosystemGrid = ({ apps }: EcosystemGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {apps.map((app) => (
        <EcosystemCard key={app.name} app={app} />
      ))}
    </div>
  );
};