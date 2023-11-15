import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: "2023-02-04", // use current UTC date - see "specifying API version"!
  useCdn: false, // `false` if you want to ensure fresh data
});

export async function sanityFetch(query: string) {
  const data = await client.fetch(query);
  return data;
}

// Image Builder Function
const builder = imageUrlBuilder(client);

export function urlFor(source: string) {
  return builder.image(source);
}
