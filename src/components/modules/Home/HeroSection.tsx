import Image from "next/image";
import bannerImage from "@/assets/images/banner-4.jpg";

const HeroSection = () => {
  return (
    <div>
      <header>
        <Image
          src={bannerImage}
          alt="Banner Image"
          className="w-full h-full object-cover "
        />
      </header>
    </div>
  );
};

export default HeroSection;
