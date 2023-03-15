/* eslint-disable @typescript-eslint/no-explicit-any */
import Head from "next/head";
import { useRouter } from "next/router";

const SITE_URL = "http://localhost:3000";
export type OpenGraphType = {
  siteName: string;
  description: string;
  projectTitle?: string;
  logo?: string;
};

export interface SchemaOrgJLD {
  "@context": string;
  "@type": string;
  url?: string;
  name?: string;
  alternateName?: string;
  headline?: string;
  itemListElement?: any;
  description?: string;
  image?: {
    "@type": "ImageObject";
    url: string;
  };
}

const defaultMeta = {
  title: "WYRE",
  siteName: "The open-source payroll Infrastructure for African businesses.",
  description:
    "Get paid in mulitiple currencies across the world including cryptocurrency.",
  url: `${SITE_URL}`,
  image: `https://bbnpolls.xyz/images/Webclip.png`,
  type: "website",
  robots: "follow, index",
};

type SeoProps = {
  date?: string;
  projectTitle?: string;
  isCredentialPage?: boolean;
} & Partial<typeof defaultMeta>;

export default function Seo(props: SeoProps) {
  const router = useRouter();
  const meta = {
    ...defaultMeta,
    ...props,
  };
  meta["title"] = props.projectTitle
    ? `${props.projectTitle} | ${meta.siteName}`
    : meta.title;

  // Use siteName if there is projectTitle
  // but show full title if there is none
  // meta.image =

  // openGraph({
  //   description: meta.description,
  //   siteName: props.projectTitle ? meta.siteName : meta.title,
  //   projectTitle: props.projectTitle,
  // });

  /* JSON Schema Specs */
  const schemaOrgJSONLD: SchemaOrgJLD[] = [
    {
      "@context": "http://schema.org",
      "@type": "WebSite",
      url: `${SITE_URL}`,
      name: "WYRE",
      alternateName: props.projectTitle ? props.title : "",
    },
  ];
  if (props.isCredentialPage) {
    schemaOrgJSONLD.push(
      {
        "@context": "http://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": `${SITE_URL}`,
              name: "BBN Polls",
              image: props.image,
            },
          },
        ],
      },
      {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        url: props.url,
        name: props.title,
        alternateName: props.title ? props.projectTitle : "",
        headline: props.title,
        image: {
          "@type": "ImageObject",
          url: props.image as string,
        },
        description: props.description,
      }
    );
  }

  return (
    <Head>
      <title>{`${meta.title} - ${meta.siteName}`}</title>
      <meta name="robots" content={meta.robots} />
      <meta content={meta.description} name="description" />
      <meta property="og:url" content={`${meta.url}${router.asPath}`} />
      <link rel="canonical" href={`${meta.url}${router.asPath}`} />

      <meta name="author" content="Daccred" />

      {/* PWA Config */}
      <meta name="theme-color" content="#011627" />
      <meta name="apple-mobile-web-app-status-bar-style" content="#011627" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="application-name" content={meta.title} />
      <meta name="apple-mobile-web-app-title" content={meta.title} />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-config" content="/icons/browserconfig.xml" />
      <meta name="msapplication-TileColor" content="#011627" />
      <meta name="msapplication-tap-highlight" content="no" />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* Open Graph */}
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta name="image" property="og:image" content={meta.image} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@koolamusic" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:image" content={meta.image} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image:summary_photo_image:src" content={meta.image} />
      <meta
        name="twitter:image:photo_image_full_size:src"
        content={meta.image}
      />
      <meta name="twitter:image:thumbnail_image:src" content={meta.image} />
      {meta.date && (
        <>
          <meta property="article:published_time" content={meta.date} />
          <meta
            name="publish_date"
            property="og:publish_date"
            content={meta.date}
          />
          <meta
            name="author"
            property="article:author"
            content="Theodorus Clarence"
          />
        </>
      )}

      {/* Favicons */}
      {favicons.map((linkProps) => (
        <link key={linkProps.href} {...linkProps} />
      ))}
      <meta name="msapplication-TileColor" content="#ffffff" />
      <meta
        name="msapplication-TileImage"
        content="/favicon/ms-icon-144x144.png"
      />
      <meta name="theme-color" content="#ffffff" />
    </Head>
  );
}

type Favicons = {
  rel: string;
  href: string;
  sizes?: string;
  type?: string;
};

// generate your own from https://www.favicon-generator.org/
// then replace the whole /public/favicon folder
const favicons: Array<Favicons> = [
  {
    rel: "apple-touch-icon",
    sizes: "57x57",
    href: "/favicon/apple-icon-57x57.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "60x60",
    href: "/favicon/apple-icon-60x60.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "72x72",
    href: "/favicon/apple-icon-72x72.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "76x76",
    href: "/favicon/apple-icon-76x76.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "114x114",
    href: "/favicon/apple-icon-114x114.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "120x120",
    href: "/favicon/apple-icon-120x120.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "144x144",
    href: "/favicon/apple-icon-144x144.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "152x152",
    href: "/favicon/apple-icon-152x152.png",
  },
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicon/apple-icon-180x180.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "192x192",
    href: "/favicon/android-icon-192x192.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicon/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "96x96",
    href: "/favicon/favicon-96x96.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicon/favicon-16x16.png",
  },
  {
    rel: "manifest",
    href: "/favicon/manifest.json",
  },
];
