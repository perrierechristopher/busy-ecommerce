import { Menu, Product } from "./shopify/types";

export type Path = {
    title: string,
    path: string
  }

export type MenuX = Menu & { children?: MenuX[]|[] };

export type ProductCustom = {
  collection: string,
  products: Product[]
}