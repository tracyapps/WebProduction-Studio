import type { AnchorHTMLAttributes, ReactNode } from 'react';

type InternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

export function InternalLink({ href, children, ...props }: InternalLinkProps) {
  return <a href={href} {...props}>{children}</a>;
}
