const sitemap = require("sitemap");
const hostname = "https://www.example.com";

const urls = [
  { url: "/", changefreq: "daily", priority: 1 },
  { url: "/about", changefreq: "daily", priority: 0.8 },
  { url: "/contactUs", changefreq: "daily", priority: 0.8 },
  // Add additional pages here
];

const sitemapInstance = sitemap.createSitemap({
  hostname,
  urls,
});
