import { sanityClient } from "sanity:client";
import groq from "groq";

const visualEditingEnabled =
  import.meta.env.PUBLIC_SANITY_VISUAL_EDITING_ENABLED === "true";
const token = import.meta.env.SANITY_API_READ_TOKEN;

async function loadQuery<T>(
  query: string,
  params: Record<string, any> = {},
): Promise<T> {
  return sanityClient.fetch<T>(query, params, {
    perspective: visualEditingEnabled ? "drafts" : "published",
    useCdn: !visualEditingEnabled,
    ...(visualEditingEnabled && token ? { token, stega: true } : {}),
  });
}

const imageProjection = `{
  ...,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
}`;

// ---- Queries ----

export async function getSettings() {
  return loadQuery(
    groq`*[_type == "settings" && _id == "siteSettings"][0] {
      churchName,
      tagline,
      verseOfTheYear,
      logo ${imageProjection},
      address,
      phone,
      email,
      primaryColor,
      secondaryColor,
      buttonRadius,
      siteTitle,
      siteDescription,
      ogImage ${imageProjection},
    }`,
  );
}

export async function getHome() {
  return loadQuery(
    groq`*[_type == "home" && _id == "homePage"][0] {
      hero {
        backgroundImage ${imageProjection},
        overlayOpacity,
        headline,
        subheadline,
        ctaText,
        backgroundColor,
        textColor,
      },
      whoWeAre {
        title,
        body,
        image ${imageProjection},
        backgroundColor,
        textColor,
      },
      feature {
        image ${imageProjection},
        label,
        reference,
        backgroundColor,
        textColor,
      },
      serviceTimes {
        backgroundColor,
        textColor,
      },
      cta {
        headline,
        ctaText,
        backgroundColor,
        textColor,
      },
    }`,
  );
}

export async function getHeader() {
  return loadQuery(
    groq`*[_type == "header" && _id == "siteHeader"][0] {
      backgroundColor,
      navLinkColor,
      navLinkHoverColor,
      mobileMenuBackgroundColor,
      mobileMenuTextColor,
      navLinkSize,
      logoSize,
      headerBehavior,
    }`,
  );
}

export async function getFooter() {
  return loadQuery(
    groq`*[_type == "footer" && _id == "siteFooter"][0] {
      backgroundColor,
      textColor,
      crossColor,
      featuredLink {
        label,
        url,
        image ${imageProjection},
        linkText,
      },
    }`,
  );
}

export async function getAbout() {
  return loadQuery(
    groq`*[_type == "about" && _id == "aboutPage"][0] {
      aboutUs {
        title,
        body,
        image ${imageProjection},
        imageCaption,
        backgroundColor,
        textColor,
      },
      history {
        title,
        body,
        image ${imageProjection},
        imageCaption,
        foundersTitle,
        founders,
        backgroundColor,
        textColor,
      },
      team {
        title,
        backgroundColor,
        textColor,
      },
    }`,
  );
}

export async function getTeamMembers() {
  return loadQuery<TeamMember[]>(
    groq`*[_type == "teamMember"] | order(order asc) {
      _id,
      name,
      "slug": slug.current,
      role,
      image ${imageProjection},
      order,
    }`,
  );
}

export async function getTeamMember(slug: string) {
  return loadQuery<TeamMember>(
    groq`*[_type == "teamMember" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      role,
      image ${imageProjection},
      bio,
      order,
    }`,
    { slug },
  );
}

export async function getContact() {
  return loadQuery(
    groq`*[_type == "contact" && _id == "contactPage"][0] {
      backgroundColor,
      textColor,
      heading,
      image ${imageProjection},
      closingMessage,
      closingBackgroundColor,
      closingTextColor,
    }`,
  );
}

// ---- Types ----

export interface SanityImage {
  _type: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  width: number;
  height: number;
  lqip?: string;
}

export interface SanityColor {
  hex: string;
  rgb: { r: number; g: number; b: number; a: number };
}

export interface Settings {
  churchName?: string;
  tagline?: string;
  verseOfTheYear?: { text?: string; reference?: string };
  logo?: SanityImage;
  address?: string;
  phone?: string;
  email?: string;
  primaryColor?: SanityColor;
  secondaryColor?: SanityColor;
  buttonRadius?: number;
  siteTitle?: string;
  siteDescription?: string;
  ogImage?: SanityImage;
}

export interface Home {
  hero?: {
    backgroundImage?: SanityImage;
    overlayOpacity?: number;
    headline?: string;
    subheadline?: string;
    ctaText?: string;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
  whoWeAre?: {
    title?: string;
    body?: any[];
    image?: SanityImage;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
  feature?: {
    image?: SanityImage;
    label?: string;
    reference?: string;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
  serviceTimes?: {
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
  cta?: {
    headline?: string;
    ctaText?: string;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
}

export interface Header {
  backgroundColor?: SanityColor;
  navLinkColor?: SanityColor;
  navLinkHoverColor?: SanityColor;
  mobileMenuBackgroundColor?: SanityColor;
  mobileMenuTextColor?: SanityColor;
  navLinkSize?: number;
  logoSize?: number;
  headerBehavior?: "fixed" | "smart";
}

export interface Footer {
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  crossColor?: SanityColor;
  featuredLink?: {
    label?: string;
    url?: string;
    image?: SanityImage;
    linkText?: string;
  };
}

export interface About {
  aboutUs?: {
    title?: string;
    body?: any[];
    image?: SanityImage;
    imageCaption?: string;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
  history?: {
    title?: string;
    body?: any[];
    image?: SanityImage;
    imageCaption?: string;
    foundersTitle?: string;
    founders?: string[];
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
  team?: {
    title?: string;
    backgroundColor?: SanityColor;
    textColor?: SanityColor;
  };
}

export interface TeamMember {
  _id: string;
  name: string;
  slug: string;
  role: string;
  image?: SanityImage;
  bio?: any[];
  order: number;
}

export interface Contact {
  backgroundColor?: SanityColor;
  textColor?: SanityColor;
  heading?: string;
  image?: SanityImage;
  closingMessage?: string;
  closingBackgroundColor?: SanityColor;
  closingTextColor?: SanityColor;
}