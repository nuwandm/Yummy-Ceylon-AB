import { HomePage } from "@/components/HomePage";
import { getAlbums } from "@/lib/albums";

// Server component: loads content at build time, the interactive page renders on the client.
export default async function Page() {
  return <HomePage albums={await getAlbums()} />;
}
