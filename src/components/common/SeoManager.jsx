import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { seoPages } from "../../seo/seoPages";

const SITE_NAME = "ReactAllFeatures";
const DEFAULT_DESCRIPTION =
  "Learn React and MERN patterns through practical, interactive feature demos and copy-ready code examples.";

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
};

const upsertCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }
  element.href = href;
};

const SeoManager = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    const page = seoPages[path] ?? {
      title: "Page Not Found",
      description: DEFAULT_DESCRIPTION,
      noIndex: true,
    };
    const title = `${page.title} | ${SITE_NAME}`;
    const description = page.description ?? DEFAULT_DESCRIPTION;
    const siteOrigin = import.meta.env.VITE_SITE_URL || window.location.origin;
    const canonicalUrl = new URL(page.canonicalPath ?? path, siteOrigin).toString();
    const imageUrl = new URL("/favicon-512.png", siteOrigin).toString();
    const robots = page.noIndex
      ? "noindex, nofollow"
      : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:image", imageUrl);
    upsertMeta("property", "og:image:alt", `${SITE_NAME} logo`);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", imageUrl);
    upsertCanonical(canonicalUrl);

    let structuredData = document.getElementById("seo-structured-data");
    if (page.noIndex) {
      structuredData?.remove();
      return;
    }

    const siteUrl = new URL("/", siteOrigin).toString();
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${siteUrl}#website`,
          name: SITE_NAME,
          url: siteUrl,
          description: DEFAULT_DESCRIPTION,
          inLanguage: "en",
        },
        {
          "@type": "WebPage",
          name: page.title,
          description,
          url: canonicalUrl,
          isPartOf: { "@id": `${siteUrl}#website` },
          inLanguage: "en",
        },
      ],
    };

    if (!structuredData) {
      structuredData = document.createElement("script");
      structuredData.id = "seo-structured-data";
      structuredData.type = "application/ld+json";
      document.head.appendChild(structuredData);
    }
    structuredData.textContent = JSON.stringify(jsonLd);
  }, [location.pathname]);

  return null;
};

export default SeoManager;