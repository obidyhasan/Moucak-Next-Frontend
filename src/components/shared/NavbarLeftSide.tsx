"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import Link from "next/link";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
];

const NavbarLeftSide = () => {
  const pathname = usePathname();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-1 items-center gap-2">
        <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
          <PopoverTrigger asChild>
            <Button
              className="group size-8 md:hidden"
              variant="ghost"
              size="icon"
            >
              <svg
                className="pointer-events-none"
                width={16}
                height={16}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M4 12L20 12"
                  className="origin-center -translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                />
                <path
                  d="M4 12H20"
                  className="origin-center transition-all duration-300 group-aria-expanded:rotate-45"
                />
                <path
                  d="M4 12H20"
                  className="origin-center translate-y-[7px] transition-all duration-300 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-135"
                />
              </svg>
            </Button>
          </PopoverTrigger>

          <PopoverContent align="start" className="w-36 p-1 md:hidden">
            <NavigationMenu className="max-w-none *:w-full">
              <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                {navigationLinks.map((link, index) => {
                  const isActive = pathname === link.href;

                  return (
                    <NavigationMenuItem key={index} className="w-full">
                      <NavigationMenuLink
                        asChild
                        className="flex-row items-center gap-2 py-1.5"
                        active={isActive}
                      >
                        <Link
                          href={link.href}
                          className="flex items-center w-full gap-2 font-semibold"
                          onClick={() => setIsPopoverOpen(false)}
                        >
                          {link.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </PopoverContent>
        </Popover>

        {/* Desktop menu */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList className="gap-2">
            {navigationLinks.map((link, index) => {
              const isActive = pathname === link.href;

              return (
                <NavigationMenuItem key={index} className="w-full">
                  <NavigationMenuLink
                    asChild
                    className="flex-row items-center gap-2 py-1.5"
                    active={isActive}
                  >
                    <Link href={link.href} className="flex items-center gap-2">
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};

export default NavbarLeftSide;
