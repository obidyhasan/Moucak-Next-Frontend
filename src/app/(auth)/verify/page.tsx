import VerifySection from "@/components/modules/Auth/VerifySection";
import { Suspense } from "react";

const page = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifySection />
      </Suspense>
    </>
  );
};

export default page;
