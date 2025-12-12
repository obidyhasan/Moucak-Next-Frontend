import SectionHeader from "@/components/shared/SectionHeader";

import GallerySection from "@/components/modules/Home/GallerySection";
import FAQSection from "@/components/modules/Home/FAQSection";
import ProductSection from "@/components/modules/Home/ProductSection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      {/* Product Section */}
      <section className="my-12 max-w-7xl mx-auto px-4 w-full">
        <SectionHeader
          title="Our Products"
          subTitle="Explore our range of pure honey fresh from the hive and packed with natural goodness."
        />
        <ProductSection />
      </section>

      {/* FAQ Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 w-full">
          <SectionHeader
            title="Frequently Asked Questions"
            subTitle="Find quick answers to the most common questions about our honey, sourcing, and delivery."
          />
        </div>
        <FAQSection />
      </section>
      {/* Gallery Section */}
      <section>
        <div className="max-w-7xl mx-auto px-4 w-full">
          {" "}
          <SectionHeader
            title="From Hive to Home"
            subTitle="Take a peek into our honey-making journey, from buzzing hives to the jars on your table."
          />
        </div>

        <GallerySection />
      </section>
    </>
  );
}
