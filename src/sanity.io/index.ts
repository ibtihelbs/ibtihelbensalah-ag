import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Initialize Sanity client
// Access environment variables
const SANITY_PROJECT_ID = import.meta.env.VITE_SANITY_PROJECT_ID;
const SANITY_DATASET = import.meta.env.VITE_SANITY_DATASET;
const SANITY_API_VERSION = import.meta.env.VITE_SANITY_API_VERSION;

export const client = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

// Type definitions based on your schemas
export interface SiteSettings {
  title: string;
  description: string;
  logo: any;
  heroHeadline: string;
  heroSubheadline: string;
  heroImage: any;
  email: string;
  phone: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
  };
  specialOffer: {
    enabled: boolean;
    text: string;
    expiryDate: string;
  };
}

export interface Service {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  iconLight: any;
  iconDark: any;
  iconDescription: string;
  description: string;
  features: string[];
  order: number;
}

export interface Project {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  description: string;
  thumbnail: any;
  images: any[];
  technologies: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  order: number;
  completedDate: string;
}

export interface PricingPlan {
  _id: string;
  name: string;
  price: number;
  currency: string;
  features: string[];
  deliveryTime: string;
  highlighted: boolean;
  order: number;
}

// Sanity queries matching your schema fields
export const queries = {
  siteSettings: `*[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    heroHeadline,
    heroSubheadline,
    heroImage,
    email,
    phone,
    socialLinks,
    specialOffer
  }`,

  services: `*[_type == "service"] | order(order asc){
    _id,
    title,
    slug,
    iconLight,
    iconDark,
    iconDescription,
    description,
    features,
    order
  }`,

  projects: `*[_type == "project"] | order(order asc){
    _id,
    title,
    slug,
    description,
    thumbnail,
    images,
    technologies,
    category,
    liveUrl,
    githubUrl,
    featured,
    order,
    completedDate
  }`,

  pricingPlans: `*[_type == "pricingPlan"] | order(order asc){
    _id,
    name,
    price,
    currency,
    features,
    deliveryTime,
    highlighted,
    order
  }`,
};

// Fetch functions
export async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    return await client.fetch(queries.siteSettings);
  } catch (error) {
    console.error("Error fetching site settings:", error);
    return null;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    return await client.fetch(queries.services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

export async function getProjects(): Promise<Project[]> {
  try {
    return await client.fetch(queries.projects);
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getPricingPlans(): Promise<PricingPlan[]> {
  try {
    return await client.fetch(queries.pricingPlans);
  } catch (error) {
    console.error("Error fetching pricing plans:", error);
    return [];
  }
}

// Additional utility functions
export async function getFeaturedProjects(): Promise<Project[]> {
  try {
    const query = `*[_type == "project" && featured == true] | order(order asc){
      _id,
      title,
      slug,
      description,
      thumbnail,
      technologies,
      category,
      liveUrl,
      githubUrl,
      featured,
      order
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching featured projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const query = `*[_type == "project" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      description,
      thumbnail,
      images,
      technologies,
      category,
      liveUrl,
      githubUrl,
      featured,
      order,
      completedDate
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching project by slug:", error);
    return null;
  }
}

export async function getHighlightedPricingPlans(): Promise<PricingPlan[]> {
  try {
    const query = `*[_type == "pricingPlan" && highlighted == true] | order(order asc){
      _id,
      name,
      price,
      currency,
      features,
      deliveryTime,
      highlighted,
      order
    }`;
    return await client.fetch(query);
  } catch (error) {
    console.error("Error fetching highlighted pricing plans:", error);
    return [];
  }
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const query = `*[_type == "service" && slug.current == $slug][0]{
      _id,
      title,
      slug,
      iconLight,
      iconDark,
      iconDescription,
      description,
      features,
      order
    }`;
    return await client.fetch(query, { slug });
  } catch (error) {
    console.error("Error fetching service by slug:", error);
    return null;
  }
}
