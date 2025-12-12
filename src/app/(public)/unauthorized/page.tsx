import { Button } from "@/components/ui/button";
import Link from "next/link";

const Unauthorized = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-center flex-col gap-3 min-h-screen">
      <h2 className="text-4xl font-semibold">401</h2>
      <h1 className="font-semibold text-xl">You are not Authorized</h1>
      <Button>
        <Link href="/" replace>
          Go To Home
        </Link>
      </Button>
    </div>
  );
};

export default Unauthorized;
