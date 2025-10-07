import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "cw4sy9ik",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // Enable CDN to avoid CORS issues
  // Add token for authentication if available
  token: process.env.SANITY_TOKEN,
  // Add request tag for better error handling
  requestTagPrefix: 'sip-in-cafe',
  // Add CORS configuration
  withCredentials: false,
  // Add timeout to prevent hanging requests
  timeout: 10000,
});