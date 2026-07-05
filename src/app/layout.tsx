import localFont from "next/font/local";
import TanstackProvider from "../shared/providers/TanstackProvider";
import Header from "@/shared/components/Header";
import "@/shared/styles/globals.css";
import ClarityInit from "@/shared/utils/clarityInit";
import AuthInit from "@/shared/providers/AuthInit";
import FeedModalRoot from "@/domain/modal/ModalRoot";
import { Suspense } from "react";
import { Metadata } from "next";

const pretendard = localFont({
	src: "../../public/fonts/PretendardVariable.woff2",
	display: "swap", // 폰트로드방식(시스템폰트로 표시 후 폰트 로드 시 교체)
	weight: "45 920",
	variable: "--font-pretendard",
});

export const metadata: Metadata = {
	title: {
		default: "따숲",
		template: "%s | 따숲",
	},
	description: "함께 만들어가는 선순환 커뮤니티 : 일상 속의 긍정적인 활동을 기록하고 공유하며 사용자 간 긍정적인 상호작용을 이어가며, 이러한 기록이 모여 선순환 문화를 만들어 가는 공간입니다.",
	keywords: ["Next.js", "React", "따숲"],
	metadataBase: new URL("https://www.ddasoop.xyz"),

	openGraph: {
		title: "따숲",
		description: "함께 만들어가는 선순환 커뮤니티 : 일상 속의 긍정적인 활동을 기록하고 공유하며 사용자 간 긍정적인 상호작용을 이어가며, 이러한 기록이 모여 선순환 문화를 만들어 가는 공간입니다.",
		url: "https://www.ddasoop.xyz",
		siteName: "따숲",
		locale: "ko_KR",
		type: "website",
		images: [
			{
				url: "/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "따숲",
			},
		],
	},

	twitter: {
		card: "summary_large_image",
		title: "따숲",
		description: "함께 만들어가는 선순환 커뮤니티 : 일상 속의 긍정적인 활동을 기록하고 공유하며 사용자 간 긍정적인 상호작용을 이어가며, 이러한 기록이 모여 선순환 문화를 만들어 가는 공간입니다.",
		images: ["/opengraph-image.png"],
	},

	robots: {
		index: true,
		follow: true,
	},

	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ko" className={pretendard.variable} suppressHydrationWarning>
			<body>
				<AuthInit />
				<TanstackProvider>
					<Header />
					<ClarityInit />
					{children}
					<Suspense fallback={<div className="loader"></div>}>
						<FeedModalRoot />
					</Suspense>
				</TanstackProvider>
			</body>
		</html>
	);
}
