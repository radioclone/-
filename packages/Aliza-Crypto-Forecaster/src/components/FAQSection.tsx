import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { GoatService } from "@/services/goat/GoatService";
import { Loader } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const [faqItems, setFaqItems] = useState<FAQItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const goatService = GoatService.getInstance();

  useEffect(() => {
    const generateFAQs = async () => {
      setIsLoading(true);
      try {
        // Generate new FAQs using GoatService
        const questions = [
          "What are the latest developments in blockchain technology?",
          "How do cryptocurrency market cycles work?",
          "What is the impact of DeFi on traditional finance?"
        ];

        const newFAQs = await Promise.all(
          questions.map(async (question) => {
            const answer = await goatService.processUserRequest(question);
            return { question, answer };
          })
        );

        setFaqItems(newFAQs);
      } catch (error) {
        console.error("Error generating FAQs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    generateFAQs();
    // Refresh FAQs every hour
    const interval = setInterval(generateFAQs, 3600000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <Card className="p-6 neo-blur flex items-center justify-center">
        <Loader className="h-6 w-6 animate-spin" />
      </Card>
    );
  }

  return (
    <Card className="p-6 neo-blur">
      <h2 className="text-2xl font-semibold mb-6 text-gradient">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="space-y-4">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
            <AccordionTrigger className="text-white hover:text-white/80">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-white/70">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Card>
  );
};