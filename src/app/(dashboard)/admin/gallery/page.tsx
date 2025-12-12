/* eslint-disable @typescript-eslint/no-explicit-any */
import AddImageDialog from "@/components/modules/Gallery/addImageDialog";
import ImageCard from "@/components/modules/Gallery/ImageCard";
import { Button } from "@/components/ui/button";
import { getImages } from "@/services/gallery/gallery";

export const dynamic = "force-dynamic";

const page = async () => {
  const data = (await getImages()) || [];

  return (
    <div>
      <div className="w-full flex justify-between items-center gap-2">
        <h1 className="text-xl font-semibold">Gallery</h1>
        <AddImageDialog>
          <Button>Add Picture</Button>
        </AddImageDialog>
      </div>
      <div className="my-10">
        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.map((gallery: any) => (
            <ImageCard gallery={gallery} key={gallery?._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
