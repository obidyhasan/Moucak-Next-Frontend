"use server";

import { deleteCookie } from "./tokenHandlers";

export const logoutUser = async () => {
  await deleteCookie("accessToken");
  await deleteCookie("refreshToken");
};
