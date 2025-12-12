import { getImages } from "@/services/gallery/gallery";
import GallerySlider from "../Gallery/GallerySlider";

const GallerySection = async () => {
  const galleries = (await getImages()) || [];

  return (
    <div>
      <GallerySlider data={galleries} />
    </div>
  );
};

export default GallerySection;
