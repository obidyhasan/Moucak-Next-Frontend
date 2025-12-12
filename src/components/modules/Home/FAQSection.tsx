/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getFaqs } from "@/services/faq/faqs";

const FAQSection = async () => {
  const faqs = (await getFaqs()) || [];

  return (
    <div className="space-y-4 max-w-7xl mx-auto px-4 mb-12">
      <Accordion type="single" collapsible className="w-full " defaultValue="3">
        {faqs.map((item: any) => (
          <AccordionItem value={item?._id} key={item?._id} className="py-2 ">
            <AccordionTrigger className="py-2 text-[15px] cursor-pointer leading-6 hover:no-underline">
              <span className="text-base sm:text-lg font-medium">
                {item?.title}
              </span>
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground pb-2">
              <span className="text-base">{item?.description}</span>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FAQSection;
