import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "cw4sy9ik",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});