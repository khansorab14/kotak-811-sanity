import imageUrlBuilder from "@sanity/image-url";
import { client } from "../lib/sanityClient";

const builder = imageUrlBuilder(client);

export function getSanityImageUrl(source) {
  return source ? builder.image(source).url() : "";
}
