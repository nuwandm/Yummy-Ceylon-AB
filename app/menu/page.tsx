import type { Metadata } from "next";
import { MenuView } from "@/components/MenuView";

export const metadata: Metadata = {
  title: "Menu · Yummy Ceylon",
  description: "Kottu, fried rice, kids' menu and the weekday lunch buffet at Yummy Ceylon in Göteborg.",
};

export default function MenuPage() {
  return <MenuView />;
}
