import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlbumView } from "@/components/AlbumView";
import { getAlbum, getAlbums } from "@/lib/albums";
import { asset } from "@/lib/asset";

// Static export: every album page is generated at build time; unknown slugs 404.
export const dynamicParams = false;

export async function generateStaticParams() {
  return (await getAlbums()).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const album = await getAlbum((await params).slug);
  if (!album) return {};
  return {
    title: `${album.title_en} · Yummy Ceylon`,
    description: album.description_en || album.description_sv,
    openGraph: album.cover ? { images: [asset(album.cover)] } : undefined,
  };
}

export default async function AlbumPage({ params }: { params: Promise<{ slug: string }> }) {
  const album = await getAlbum((await params).slug);
  if (!album) notFound();
  return <AlbumView album={album} />;
}
