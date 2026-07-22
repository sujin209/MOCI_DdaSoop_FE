import type { NextConfig } from "next";

// TODO : 개발환경에서만 테스트 용도로 사용하고 수정할 것
const nextConfig: NextConfig = {
  images: {
    // unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // 구글 프로필 사진
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com", // 구글 클라우드 스토리지
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.ddasoop.xyz", // 사용자 업로드
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "file.ddassop.xyz", // 사용자 업로드 - 현재오류url
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ssl.pstatic.net", // 프로필 없는 사용자 기본이미지
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "k.kakaocdn.net", // 카카오
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "img1.kakaocdn.net", // 카카오
        port: "",
        pathname: "/**",
      },
    ],
  },

  //webpack 설정
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },

  turbopack: {
    root: __dirname,
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
  async rewrites() {
    return [
      {
        source: "/proxy-api/:path*",
        destination: "https://api.ddasoop.xyz/:path*",
      },
    ];
  },
};
export default nextConfig;
