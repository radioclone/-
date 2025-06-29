import { Bot, LineChart, Network, Search } from "lucide-react";
import { EcosystemApp } from "@/types/ecosystem";

export const ecosystemApps: EcosystemApp[] = [
  {
    name: "Market Analysis",
    description: "Real-time market analysis and price predictions powered by AI.",
    icon: <LineChart className="w-6 h-6 text-white" />,
    status: "live",
  },
  {
    name: "AI Trading Assistant",
    description: "Your personal AI trading assistant for smarter investment decisions.",
    icon: <Bot className="w-6 h-6 text-white" />,
    status: "coming_soon",
  },
  {
    name: "Mode Network Explorer",
    description: "Explore and analyze the Mode Network blockchain.",
    icon: <Network className="w-6 h-6 text-white" />,
    status: "coming_soon",
  },
  {
    name: "AI Research Hub",
    description: "Access cutting-edge AI research and market insights.",
    icon: <Search className="w-6 h-6 text-white" />,
    status: "in_development",
  },
];