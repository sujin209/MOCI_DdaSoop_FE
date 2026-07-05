import { getFeedById } from "@/domain/feed/api/getFeedById";
import FeedModal from "@/domain/feed/components/FeedModal";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const feed = await getFeedById(id);
  const title = feed.content?.slice(0, 30) + "..." || "피드";
  return {
    title,
    description: feed?.content?.slice(0, 160) || "피드 상세 페이지입니다.",
    openGraph: {
      images: feed?.images?.[0]?.imageUrl,
      type: "website",
    },
	twitter: {
			card: "summary_large_image",
			title,
				description: feed?.content?.slice(0, 160) || "피드 상세 페이지입니다.",
			images: feed?.images?.[0]?.imageUrl || "/opengraph-image.png",
		},
  };
}
export default async function FeedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const feed = await getFeedById(id);
  return (
    <main>
      <FeedModal feedId={id} initialData={feed} />
    </main>
  );
}
