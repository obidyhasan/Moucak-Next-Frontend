/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { LuUserRound } from "react-icons/lu";
import UserMenu from "../ui/user-menu";
import { CartSidebar } from "../modules/Cart/CartSidebar";

const NavbarRightSide = ({ userInfo }: { userInfo: any }) => {
  const router = useRouter();

  const goToLoginPage = () => {
    router.push("/login");
  };

  return (
    <div>
      {/* Right side */}
      <div className="flex flex-1 items-center justify-end gap-4">
        <CartSidebar />

        {userInfo ? (
          <UserMenu userInfo={userInfo} />
        ) : (
          <div
            onClick={goToLoginPage}
            className="p-2 border hover:text-primary cursor-pointer rounded-full transition-colors duration-200"
          >
            <LuUserRound className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarRightSide;
