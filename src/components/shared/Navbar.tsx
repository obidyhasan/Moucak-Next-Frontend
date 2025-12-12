import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/icons/logo-icon.svg";

import NavbarRightSide from "./NavbarRightSide";
import { getUserInfo } from "@/services/auth/getUserInfo";
import NavbarLeftSide from "./NavbarLeftSide";
import { getUser } from "@/services/user/user";

export default async function Navbar() {
  const user = (await getUser()) || (await getUserInfo()) || null;

  return (
    <header className="border-b z-50 bg-background sticky top-0">
      <div className="max-w-7xl mx-auto w-full px-4 flex h-[65px] items-center justify-between gap-4">
        {/* Left side */}
        <NavbarLeftSide />

        {/* Middle: Logo */}
        <div className="flex items-center">
          <Link href="/" className="text-primary hover:text-primary/90">
            <Image src={logo} alt="logo" className="w-28 sm:w-32" />
          </Link>
        </div>

        {/* Right side */}
        <NavbarRightSide userInfo={user?.data} />
      </div>
    </header>
  );
}
