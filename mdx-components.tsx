import type { MDXComponents } from "mdx/types";

import { guideMdxComponents } from "@/components/guide-mdx";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...guideMdxComponents,
    ...components,
  };
}
