import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  devIndicators: false,
  turbopack: {
    root: path.join(__dirname),
  },
  async redirects() {
    return [
      { source: "/plinto-ai-invoicing", destination: "/plinto", permanent: true },
      { source: "/powermatch-invoice-reconciliation", destination: "/powermatch", permanent: true },
      { source: "/coco-care-app", destination: "/cococare", permanent: true },
      { source: "/rokoko-brand-identity", destination: "/rokokobrand", permanent: true },
      { source: "/rokoko-website-revamp", destination: "/rokokoweb", permanent: true },
      { source: "/weld-digital-presence", destination: "/weld", permanent: true },
      { source: "/eat-grim-brand-identity", destination: "/eatgrim", permanent: true },
    ];
  },
};

export default nextConfig;
