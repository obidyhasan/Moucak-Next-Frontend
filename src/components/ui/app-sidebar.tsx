/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

import logo from "@/assets/icons/logo-icon.svg";
import Link from "next/link";
import Image from "next/image";

const data = {
  navMain: [
    {
      title: "Dashboard",
      items: [
        {
          title: "Analytics",
          url: "/admin/analytics",
        },
        {
          title: "Users",
          url: "/admin/users",
        },
        {
          title: "Products",
          url: "/admin/products",
        },
        {
          title: "Orders",
          url: "/admin/orders",
        },
        {
          title: "Gallery",
          url: "/admin/gallery",
        },
        {
          title: "FAQ",
          url: "/admin/faq",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href={"/"} className="mx-auto p-1">
          <Image
            src={logo}
            className="w-24"
            alt="logo"
            width={96}
            height={96}
          />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item: any) => (
                  <SidebarMenuItem
                    className="bg-muted rounded-md p-1 font-medium border my-1"
                    key={item.title}
                  >
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
