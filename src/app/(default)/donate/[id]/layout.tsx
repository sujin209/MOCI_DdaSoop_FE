import { getInitDonationDetail } from "@/domain/donate/api/getInitDonationDetail";
import DonateDetailInfo from "@/domain/donate/components/DonateDetailInfo";
import Loading from "@/domain/participation/components/DetailLoadingSkeleton";
import ImageSwiper from "@/shared/components/ImageSwiper";
import TabBar from "@/shared/components/TabBar";
import { queryKeys } from "@/shared/config/queryKeys";
import { donateTabContents } from "@/shared/utils/navigation";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const data = await getInitDonationDetail(id);
  const detail = data.data;

  return {
    title: `따숲 후원하기 | ${detail.title}`,
    description: detail.description ?? "따숲 후원하기 상세 페이지",
    keywords: ["후원", "후원하기", "목표달성", "커뮤니티"],
    alternates: {
      canonical: `https://www.ddasoop.xyz/donate/${id}`,
    },
    openGraph: {
      title: `따숲 후원하기 | ${detail.title}`,
      description: detail.description,
      url: `https://www.ddasoop.xyz/donate/${id}`,
      siteName: "따숲",
      images: detail.imageUrls?.[0] ?? "",
      locale: "ko_KR",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: detail.title,
      description: detail.description ?? "",
      images: [detail.imageUrls?.[0] ?? ""],
    },
  };
}

async function page({
  params,
  children,
}: {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}) {
    const { id } = await params;
  const queryClient = new QueryClient();

  const detailInfo = await queryClient.fetchQuery({
    queryKey: queryKeys.donate.id(id),
    queryFn: () => getInitDonationDetail(id),
  });

  const dehydratedState = dehydrate(queryClient);

  
    return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<Loading />}>
        <div className="flex justify-between pt-4">
          <section className="w-[calc(100%-280px)]">
            <div className="w-full aspect-10/7">
              <ImageSwiper
                slideList={
                  detailInfo.data.imageUrls?.map((img) => ({
                    imageUrl: img,
                  })) ?? []
                }
              />
            </div>
            <nav>
              <TabBar type="donate" tabContents={donateTabContents(id)} />
            </nav>
            <main className="py-4">{children}</main>
          </section>
          <DonateDetailInfo id={id} />
        </div>
      </Suspense>
    </HydrationBoundary>
  );
}

export default page;
