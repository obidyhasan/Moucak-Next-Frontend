import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Link from "next/link";

const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  const number = "8801000000000";

  return (
    <div className="min-h-screen flex flex-col">
      <Link
        href={`https://wa.me/${number}?text=Hello%20I%20am%20interested
`}
        target="_blank"
        className=" px-4 py-2 w-full bg-primary flex items-center justify-center"
      >
        <p className="text-center text-xs sm:text-sm">
          <span className="space-x-2">
            <span>
              {" "}
              {`  আমাদের যে কোন পণ্য অর্ডার করতে কল বা WhatsApp করুন:`}
            </span>
            <span className="underline font-medium">01XXX-XXXXXX</span>{" "}
          </span>
        </p>
      </Link>
      <Navbar />
      <div className="grow">{children}</div>
      <Footer />
    </div>
  );
};

export default PublicLayout;
