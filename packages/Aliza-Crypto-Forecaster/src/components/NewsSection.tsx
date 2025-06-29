import { Card } from "@/components/ui/card";
import { ExternalLink, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { GoatService } from "@/services/goat/GoatService";

interface NewsItem {
  title: string;
  description: string;
  date: string;
  link: string;
}

export const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const goatService = GoatService.getInstance();

  useEffect(() => {
    const generateNews = async () => {
      setIsLoading(true);
      try {
        // Generate news summaries using GoatService
        const topics = [
          "Latest cryptocurrency market trends",
          "Recent blockchain technology developments",
          "DeFi ecosystem updates"
        ];

        const currentDate = new Date().toISOString().split('T')[0];
        const newItems = await Promise.all(
          topics.map(async (topic) => {
            const description = await goatService.processUserRequest(`Summarize the latest news about ${topic}`);
            return {
              title: topic,
              description,
              date: currentDate,
              link: "#"
            };
          })
        );

        setNewsItems(newItems);
      } catch (error) {
        console.error("Error generating news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    generateNews();
    // Refresh news every 3 hours
    const interval = setInterval(generateNews, 10800000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {newsItems.map((item, index) => (
        <Card key={index} className="p-4 neo-blur hover:bg-white/5 transition-all">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-white/60 text-sm mb-2">{item.description}</p>
              <span className="text-xs text-white/40">{item.date}</span>
            </div>
            <a href={item.link} className="text-white/60 hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
        </Card>
      ))}
    </div>
  );
};