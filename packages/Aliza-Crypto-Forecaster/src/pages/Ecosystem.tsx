import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { EcosystemGrid } from "@/components/ecosystem/EcosystemGrid";
import { ecosystemApps } from "@/config/ecosystem";
import { BackgroundProvider } from "@/components/backgrounds/BackgroundProvider";

const Ecosystem = () => {
  return (
    <BackgroundProvider type="space">
      <div className="min-h-screen font-sans">
        <main className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Markets
              </Button>
            </Link>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gradient mb-2">Ecosystem</h1>
              <p className="text-white/70">
                Discover our suite of applications and tools built for the Mode Network.
              </p>
            </div>

            <EcosystemGrid apps={ecosystemApps} />
          </div>
        </main>
      </div>
    </BackgroundProvider>
  );
};

export default Ecosystem;