import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EcosystemApp } from "@/types/ecosystem";

interface EcosystemCardProps {
  app: EcosystemApp;
}

export const EcosystemCard = ({ app }: EcosystemCardProps) => {
  return (
    <Card className="p-6 neo-blur transition-all duration-300 hover:bg-white/5 hover:scale-[1.02] group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5 transition-transform duration-300 group-hover:scale-110">
            {app.icon}
          </div>
          <div>
            <h3 className="font-semibold text-white">{app.name}</h3>
            <Badge variant={app.status === 'live' ? 'default' : 'secondary'} className="mt-1">
              {app.status}
            </Badge>
          </div>
        </div>
      </div>
      <p className="text-white/70">{app.description}</p>
    </Card>
  );
};