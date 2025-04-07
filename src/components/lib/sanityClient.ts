import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "82nddwvz",
  dataset: "production",
  apiVersion: "v2025-03-24",
  useCdn: true,
});
