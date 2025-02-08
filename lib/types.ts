import { Menu } from "./shopify/types";

export type Path = {
    title: string,
    path: string
  }

export type MenuX = Menu & { children?: MenuX[] };