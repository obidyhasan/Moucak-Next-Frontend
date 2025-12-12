import Image from "next/image";
import logo from "@/assets/icons/logo-icon.svg";

const loading = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Image
        src={logo}
        alt="Logo"
        width={320}
        height={200}
        className="w-40 md:w-80"
      />
    </div>
  );
};

export default loading;
