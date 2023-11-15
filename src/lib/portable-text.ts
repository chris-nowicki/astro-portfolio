import { toHTML } from "@portabletext/to-html";
import { type PortableTextComponents } from "@portabletext/to-html";

const homePortableText: PortableTextComponents = {
  marks: {
    strong: ({ children }) =>
      `<strong class="dark:text-purple-dark">${children}</strong>`,
  },
  block: {
    normal: ({ children }) =>
      `<p class="mt-4 text-center md:mr-4 md:text-left">${children}</p>`,
    h1: ({ children }) =>
      `<h1 class="text-2xl text-purple-light dark:text-purple-dark md:mt-0 md:text-4xl">${children}</h1>`,
  },
};

export function sanityPortableText(portabletext: any) {
  return toHTML(portabletext, { components: homePortableText });
}
