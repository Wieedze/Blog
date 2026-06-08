/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export: emits a fully static site to ./out, served by GitHub Pages.
  // (Was "standalone" for Docker/Coolify — keep the Dockerfile around if you
  // ever want to switch back to a server deploy.)
  output: "export",
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // No image optimization server on a static host.
  images: { unoptimized: true },
  // Custom domain (wieedze.com) is served at the root, so no basePath.
  // For a project page (wieedze.github.io/blogperso) instead, set:
  //   basePath: "/blogperso", assetPrefix: "/blogperso",
  trailingSlash: true,
};

export default nextConfig;
